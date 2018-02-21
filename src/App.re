open! Rebase;
open ReasonReact;
open! Vrroom;

let appRoot = Node.Process.cwd(); /* TODO: Use getAppPath() in prod */

let projectPath = Node.Path.join2(Electron.Remote.App.getPath(`UserData), "current");
let sourceFilename = Node.Path.join([| projectPath, "src", "main.re" |]);
let jsFilename = Node.Path.join([| projectPath, "lib", "js", "src", "main.js" |]);

let resetProject = () => {
  FsExtra.removeSync(projectPath);
  FsExtra.copySync(
    ~src=Node.Path.join([| appRoot, "templates", "json" |]),
    ~dest=projectPath
  );
  Node.Child_process.execSync("npm install", Node.Child_process.option(~cwd=projectPath, ())) |> ignore;
  Node.Child_process.execSync("npm link bs-platform", Node.Child_process.option(~cwd=projectPath, ())) |> ignore;
};

let getCode = () =>
  try (Node.Fs.readFileSync(sourceFilename, `utf8)) {
  | _ => {
      resetProject();
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
    Node.Child_process.execSync("bsb", Node.Child_process.option(~cwd=projectPath, ())) |> ignore;
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
  output: string,
  activePane: [`Js | `Output]
};

type action =
  | CodeChanged(string)
  | OutputChanged(string)
  | CompileCompleted(string)
  | PaneSelected([`Js | `Output]);

let component = reducerComponent("App");
let make = _children => {
  ...component,

  initialState: () => {
    code: getCode(),
    jsCode: "",
    output: "",
    activePane: `Output
  },
  reducer: (action, state) =>
    switch action {
    | CodeChanged(code) => UpdateWithSideEffects(
        { ...state, code },
        ({ send }) => persistAndCompile((code, result => send(CompileCompleted(result))))
      )

    | OutputChanged(value) =>
      Update({ ...state, output: state.output ++ "\n" ++ value })

    | CompileCompleted(jsCode) =>
      UpdateWithSideEffects(
        { ...state, jsCode },
        ({ state, send }) => {
        try {
          let vm = VM2.makeVM(~console=`Redirect, ~requireExternal=`Allow, ~sandbox=Js.Obj.empty());
          vm |> VM2.onConsoleLog(value => send(OutputChanged(value)));
          vm |> VM2.run(~code=jsCode, ~filename=jsFilename);
        } {
        | e => Js.log2("error", e)
        }
      })

    | PaneSelected(pane) =>
      Update({ ...state, activePane: pane })
    },

  render: ({ state, send }) =>
    <div className="app">
      <div className="editors">
        <Editor value=state.code onChange=(code => send(CodeChanged(code))) lang=`RE />
        {switch (state.activePane) {
        | `Js     => <Editor value=state.jsCode lang=`JS lineNumbers=false />
        | `Output => <Editor value=state.output lineNumbers=false />
        }}
      </div>
      <StatusBar
          onReset       = resetProject
          selectedPane  = state.activePane
          onSelectPane  = (pane => send(PaneSelected(pane)))/>
    </div>
};