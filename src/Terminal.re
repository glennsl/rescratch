open Rebase;
open ReasonReact;
open Vrroom;

type state = {
  command: string
};

type action =
  | CommandChanged(string)
  | ExecuteCurrentCommand;

let handleKeyDown(send, e) {
  if (e |> ReactEventRe.Keyboard.keyCode === 13) {
    send(ExecuteCurrentCommand)
  }
};

let component = reducerComponent("Terminal");
let make = (~onExecute, ~output, _:childless) => {
  ...component,

  initialState: () => {
    command: ""
  },
  reducer: (action, state) =>
    switch action {
    | CommandChanged(command) => Update({ command: command })
    | ExecuteCurrentCommand => UpdateWithSideEffects(
        { command: "" },
        _self => onExecute(state.command, _code => ())
      )
    },

  render: ({ state, send}) =>
    <div className="c-terminal">

      <Editor value       = output
              readOnly    = true
              lineNumbers = false />

      <input  _type     = "text"
              value     = state.command
              onKeyDown = (e => handleKeyDown(send, e))
              onChange  = (e => send(CommandChanged((e |> ReactEventRe.Form.target |> ReactDOMRe.domElementToObj)##value))) />

    </div>
}