open Rebase;
open ReasonReact;
open Vrroom;

type state = {
  output: string
};

type action =
  | ExecuteCommand(string)
  | OutputChanged(string);

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
let make = (~dir, render) => {
  ...component,

  initialState: () => {
    output: ""
  },
  reducer: (action, state) =>
    switch action {
    | ExecuteCommand(command) => UpdateWithSideEffects(
        { output: state.output ++ "\n\n> " ++ command },
        self => execute(self.send, dir, command)
      )
    | OutputChanged(output)   => Update({ ...state, output: state.output ++ "\n" ++ output})
    },

  render: ({ state, send }) =>
    render(~execute=(command => send(ExecuteCommand(command))), ~output=state.output)
}