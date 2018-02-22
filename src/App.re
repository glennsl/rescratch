open! Rebase;
open ReasonReact;
open! Vrroom;

let appRoot = Node.Process.cwd(); /* TODO: Use getAppPath() in prod */

let projectPath = Node.Path.join2(Electron.Remote.App.getPath(`UserData), "current");
let sourceFilename = Node.Path.join([| projectPath, "src", "main.re" |]);
let jsFilename = Node.Path.join([| projectPath, "lib", "js", "src", "main.js" |]);

let resetProject = execute => () => {
  FsExtra.removeSync(projectPath);
  FsExtra.copySync(
    ~src=Node.Path.join([| appRoot, "templates", "react" |]),
    ~dest=projectPath
  );
  execute("npm install");
  execute("npm link bs-platform");
};

let getCode = () =>
  try (Node.Fs.readFileSync(sourceFilename, `utf8)) {
  | _ => {
      /*resetProject();*/ /* TODO: loading needs to be done asynchronously */
      try (Node.Fs.readFileSync(sourceFilename, `utf8)) {
      | _ => {
          "Fatal error occurred reading curent project"
        }
      }
    }
  };

let persist = code => {
  Node.Fs.writeFileSync(sourceFilename, code, `utf8);
};

let compile = (return) => {
  try {
    Node.Child_process.execSync("bsb -make-world", Node.Child_process.option(~cwd=projectPath, ())) |> ignore;
    let jsCode = Node.Fs.readFileSync(jsFilename, `utf8);
    return(jsCode);
  } {
  | Js.Exn.Error(e) => return(e |> Js.Exn.message |> Js.Option.getExn)
  }
};

let persistAndCompile = Utils.debounce(((code, return)) => {
  persist(code);
  compile(return);
}, 600);

type state = {
  code: string,
  jsCode: string,
  console: string,
  activePane: [`Js | `Console | `Dom | `Terminal]
};

type action =
  | CodeChanged(string)
  | ConsoleChanged(string)
  | CompileCompleted(string)
  | PaneSelected([`Js | `Console | `Dom | `Terminal]);

let component = reducerComponent("App");
let make = _children => {
  ...component,

  initialState: () => {
    code: getCode(),
    jsCode: "",
    console: "",
    activePane: `Terminal
  },
  reducer: (action, state) =>
    switch action {
    | CodeChanged(code) => UpdateWithSideEffects(
        { ...state, code },
        ({ send }) => persistAndCompile((code, result => send(CompileCompleted(result))))
      )

    | ConsoleChanged(value) =>
      Update({ ...state, console: state.console ++ "\n" ++ value })

    | CompileCompleted(jsCode) =>
      UpdateWithSideEffects(
        { ...state, jsCode },
        ({ state, send }) => {
        try {
          let vm = VM2.makeVM(~console=`Redirect, ~requireExternal=`Allow, ~sandbox=Js.Obj.empty());
          vm |> VM2.onConsoleLog(value => send(ConsoleChanged(value)));
          vm |> VM2.run(~code=jsCode, ~filename=jsFilename);
        } {
        | e => Js.log2("error", e)
        }
      })

    | PaneSelected(pane) =>
      Update({ ...state, activePane: pane })
    },

  render: ({ state, send }) =>
    <ExecutionEnvironment dir=projectPath>
      ...((~execute, ~output) =>
        <div className="app">
          <div className="main">
            <Editor value=state.code onChange=(code => send(CodeChanged(code))) lang=`RE />
            {switch (state.activePane) {
            | `Js       => <Editor value=state.jsCode lang=`JS lineNumbers=false />
            | `Console  => <Editor value=state.console lineNumbers=false />
            | _         => nothing
            }}
            <div className=ClassName.(join(["dom", "s-selected" |> if_(state.activePane == `Dom)]))>
              <div id="dom-root" />
            </div>
            <div className=ClassName.(join(["terminal", "s-selected" |> if_(state.activePane == `Dom)]))>
              <Terminal onExecute=execute output=output />
            </div>
          </div>
          <StatusBar
              onReset       = resetProject(execute)
              selectedPane  = state.activePane
              onSelectPane  = (pane => send(PaneSelected(pane))) />
        </div>
      )
    </ExecutionEnvironment>

};