open! Rebase;
open ReasonReact;
open! Vrroom;

let appRoot = Node.Process.cwd(); /* TODO: Use getAppPath() in prod */

let projectPath = Node.Path.join2(Electron.Remote.App.getPath(`UserData), "current");
let sourceFilename = Node.Path.join([| projectPath, "src", "main.re" |]);
let jsFilename = Node.Path.join([| projectPath, "lib", "js", "src", "main.js" |]);

let loadProject = (execute, callback, template) => {
  /* TODO: Might want to use this instead for cross-platform support...
  FsExtra.removeSync(projectPath);
  FsExtra.copySync(
    ~src=Node.Path.join([| appRoot, "templates", "react" |]),
    ~dest=projectPath
  );
  */

  let templatePath = Node.Path.join([| appRoot, "templates", template |]);
  execute("rm -rf *", _code => 
  execute({j|cp -R "$templatePath/." "$projectPath"|j}, _code => 
  execute("npm install", _code => 
  execute("npm link bs-platform", _code => callback()))));
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
  | TemplateSelected((string, int => unit) => unit, string)
  | PaneSelected([`Js | `Console | `Dom | `Terminal]);

let component = reducerComponent("App");
let make = _children => {
  ...component,

  initialState: () => {
    code: getCode(),
    jsCode: "",
    console: "",
    activePane: `Console
  },
  reducer: (action, state) =>
    switch action {
    | CodeChanged(code) =>
      UpdateWithSideEffects(
        { ...state, code },
        ({ send }) => persistAndCompile((code, result => send(CompileCompleted(result))))
      )

    | ConsoleChanged(value) =>
      Update({ ...state, activePane: `Console, console: state.console ++ "\n" ++ value })

    | CompileCompleted(jsCode) =>
      UpdateWithSideEffects(
        { ...state, jsCode, activePane: `Dom, console: "" },
        ({ state, send }) => {
          try {
            let vm = VM2.makeVM(~console=`Redirect, ~requireExternal=`Allow, ~sandbox=Js.Obj.empty());
            vm |> VM2.onConsoleLog(value => send(ConsoleChanged(value)));
            vm |> VM2.run(~code=jsCode, ~filename=jsFilename);
          } {
          | e => Js.log2("error", e)
          }
        })

    | TemplateSelected(execute, template) =>
      UpdateWithSideEffects(
        { ...state, activePane: `Terminal },
        self => loadProject(execute, () => self.send(CodeChanged(getCode())), template)
      )
      

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
            <div className=ClassName.(join(["terminal", "s-selected" |> if_(state.activePane == `Terminal)]))>
              <Terminal onExecute=execute output=output />
            </div>
          </div>
          <StatusBar
              templates         = ["default", "json", "react"]
              onSelectTemplate  = (template => send(TemplateSelected(execute, template)))
              selectedPane      = state.activePane
              onSelectPane      = (pane => send(PaneSelected(pane))) />
        </div>
      )
    </ExecutionEnvironment>

};