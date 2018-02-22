open Rebase;
open ReasonReact;
open Vrroom;

type state = {
  output: string,
  command: string
};

type action =
  | CommandChanged(string)
  | ExecuteCommand
  | OutputChanged(string);

let handleKeyDown(send, e) {
  if (e |> ReactEventRe.Keyboard.keyCode === 13) {
    send(ExecuteCommand)
  }
};

let execute(send, cwd, command) {
  try {

    let process = NodeChildProcess.spawn(command, ~args=[||], ~options=NodeChildProcess.options(~cwd, ~shell=Js.true_, ()));
    let stdout = process |> NodeChildProcess.stdout;
    let stderr = process |> NodeChildProcess.stderr;
    stdout |> NodeChildProcess.ReadableStream.onData(data => send(OutputChanged(data)));
    stderr |> NodeChildProcess.ReadableStream.onData(data => send(OutputChanged(data)));
  } {
    | Js.Exn.Error(e) => send(OutputChanged(e |> Js.Exn.message |> Js.Option.getExn))
    | e => send(OutputChanged("Error:\n" ++ Js.String.make(e)))
  }
};

let component = reducerComponent("Terminal");
let make = (~dir, _:childless) => {
  ...component,

  initialState: () => {
    output: "",
    command: ""
  },
  reducer: (action, state) =>
    switch action {
    | CommandChanged(command) => Update({ ...state, command })
    | ExecuteCommand => UpdateWithSideEffects(
        { command: "", output: state.output ++ "\n\n> " ++ state.command },
        self => execute(self.send, dir, state.command)
      )
    | OutputChanged(output)   => Update({ ...state, output: state.output ++ "\n" ++ output})
    },

  render: ({ state, send}) =>
    <div className="c-terminal">
      <Editor value=state.output readOnly=true lineNumbers=false />
      <input  _type     = "text"
              value     = state.command
              onKeyDown = (e => handleKeyDown(send, e))
              onChange  = (e => send(CommandChanged((e |> ReactEventRe.Form.target |> ReactDOMRe.domElementToObj)##value))) />
    </div>
}