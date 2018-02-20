open! Rebase;
open ReasonReact;
open! Vrroom;

let appRoot = Node.Process.cwd(); /* TODO: Use getAppPath() in prod */

let projectPath = Node.Path.join2(Electron.Remote.App.getPath(`UserData), "current");
let sourceFilename = Node.Path.join([| projectPath, "src", "main.re" |]);

let resetProject = () => {
  FsExtra.removeSync(projectPath);
  FsExtra.copySync(
    ~src=Node.Path.join([| appRoot, "templates", "default" |]),
    ~dest=projectPath
  );
  Node.Child_process.execSync("npm link bs-platform", Node.Child_process.option(~cwd=projectPath, ()));
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

let compile = (code, return) => {
  return("")
};

type state = {
  code: string,
  output: string
};

type action =
  | CodeChanged(string)
  | OutputChanged(string)
  | CompileCompleted(string);

let component = reducerComponent("App");
let make = _children => {
  ...component,

  initialState: () => {
    code: getCode(),
    output: "No output yet"
  },
  reducer: (action, state) =>
    switch action {
    | CodeChanged(code) => UpdateWithSideEffects(
        { ...state, code },
        ({ send }) => {
          persist(code);
          compile(code, result => send(CompileCompleted(result)))
        }
      )
    | OutputChanged(output) => Update({ ...state, output })
    | CompileCompleted(_) => NoUpdate
    },

  render: ({ state, send }) =>
    <div className="app">
      <Editor value=state.code onChange=(code => send(CodeChanged(code))) lang=`RE />
      <div className="output">
        {state.output |> text}
      </div>
    </div>
};