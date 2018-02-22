open Rebase;
open ReasonReact;
open Vrroom;

type state = {
  output: string
};

type action =
  | ExecuteCommand(string, int => unit)
  | OutputChanged(string);

let execute(send, cwd, command, callback) {
  open NodeChildProcess;

  let process = spawn(command, ~args=[||], ~options=options(~cwd, ~shell=Js.true_, ()));
  process |> stdout |> ReadableStream.onData(data => send(OutputChanged(data)));
  process |> stderr |> ReadableStream.onData(data => send(OutputChanged(data)));

  process |> onExit((~code, ~signal) => callback(code))
};

let component = reducerComponent("Terminal");
let make = (~dir, render) => {
  ...component,

  initialState: () => {
    output: ""
  },
  reducer: (action, state) =>
    switch action {
    | ExecuteCommand(command, callback) => UpdateWithSideEffects(
        { output: state.output ++ "\n\n> " ++ command },
        self => execute(self.send, dir, command, callback)
      )
    | OutputChanged(output)   => Update({ ...state, output: state.output ++ "\n" ++ output})
    },

  render: ({ state, send }) =>
    render(~execute=((command, callback) => send(ExecuteCommand(command, callback))), ~output=state.output)
}