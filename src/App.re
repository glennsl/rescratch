open! Rebase;
open ReasonReact;
open! Vrroom;

let appRoot = Node.Process.cwd(); /* TODO: Use getAppPath() in prod */

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
  | TemplateSelected(string)
  | PaneSelected([`Js | `Console | `Dom | `Terminal]);

let component = reducerComponent("App");
let make = (~projectPath, ~execute, ~output, _:childless) => {
    
  let sourceFilename = Node.Path.join([| projectPath, "src", "main.re" |]);
  let jsFilename = Node.Path.join([| projectPath, "lib", "js", "src", "main.js" |]);

  let loadTemplate = (template, callback) => {
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

  let getCode = return =>
    switch (Node.Fs.readFileSync(sourceFilename, `utf8)) {
    | code        => return(code)
    | exception _ =>
      loadTemplate("default", () =>
        switch (Node.Fs.readFileSync(sourceFilename, `utf8)) {
        | code        => return(code)
        | exception _ => return("Fatal error occurred reading curent project")
        }
      )
    };

  let persist = code => {
    Node.Fs.writeFileSync(sourceFilename, code, `utf8);
  };

  let compile = (return) => {
    try {
      execute("bsb -make-world", _code => { 
        let jsCode = Node.Fs.readFileSync(jsFilename, `utf8);
        return(jsCode)
      });
    } {
    | Js.Exn.Error(e) => return(e |> Js.Exn.message |> Js.Option.getExn)
    }
  };

  let persistAndCompile = Utils.debounce(((code, return)) => {
    persist(code);
    compile(return);
  }, 600);

  {
    ...component,

    initialState: () => {
      code: "",
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

      | TemplateSelected(template) =>
        UpdateWithSideEffects(
          { ...state, activePane: `Terminal },
          self => loadTemplate(template, () => getCode(code => self.send(CodeChanged(code))))
        )
        

      | PaneSelected(pane) =>
        Update({ ...state, activePane: pane })
      },

    didMount: self => {
      getCode(code => self.send(CodeChanged(code)));
      NoUpdate
    },

    render: ({ state, send }) =>
      <div className="app">
        <div className="main">
          <Editor value=state.code onChange=(code => send(CodeChanged(code))) lang=`RE />
          {switch (state.activePane) {
          | `Js       => <Editor value=state.jsCode lang=`JS lineNumbers=false />
          | `Console  => <Console contents=state.console />
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
            projectPath
            templates         = ["default", "json", "react"]
            onSelectTemplate  = (template => send(TemplateSelected(template)))
            selectedPane      = state.activePane
            onSelectPane      = (pane => send(PaneSelected(pane))) />
      </div>
  }
};