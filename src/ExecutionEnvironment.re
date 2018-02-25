open! Rebase;
open ReasonReact;
open! Vrroom;

let au = AnsiUp.make();
AnsiUp.use_classes(au, Js.true_);

type state = {
  output: string
};

type action =
  | ExecuteCommand(string, int => unit)
  | StdOut(string)
  | StdErr(string);

let execute(send, cwd, command, callback) {
  open NodeChildProcess;

  let process = spawn(command, ~args=[||], ~options=options(~cwd, ~shell=Js.true_, ()));
  process |> stdout |> ReadableStream.onData(data => send(StdOut(data)));
  process |> stderr |> ReadableStream.onData(data => send(StdErr(data)));

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
        { output: state.output ++ "\n> " ++ command ++ "\n" },
        self => execute(self.send, dir, command, callback)
      )
    | StdOut(output)   => Update({ output: state.output ++ "<div class=\"stdout\">" ++ AnsiUp.ansi_to_html(output, au) ++ "</div>" })
    | StdErr(output)   => Update({ output: state.output ++ "<div class=\"stderr\">" ++ AnsiUp.ansi_to_html(output, au) ++ "</div>" })
    },

  render: ({ state, send }) =>
    render(~execute=((command, callback) => send(ExecuteCommand(command, callback))), ~output=state.output)
}