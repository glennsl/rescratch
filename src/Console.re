open ReasonReact;
open Vrroom;

let component = statelessComponent("Console");
let make = (~contents, _:childless) => {
  ...component,
  render: self =>
    <ScrollToBottom>
      ...((~scrollRef) =>
        <pre className="c-console" ref=scrollRef>
          {contents |> text}
        </pre>
      )
    </ScrollToBottom>
};