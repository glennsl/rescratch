open ReasonReact;
open Vrroom;

type state = {
  rref: ref(option(Dom.element))
};

let scrollToBottom = rref => {
    let el = rref |> Js.Option.getExn |> ReactDOMRe.domElementToObj;
    el##scrollTop #= (el##scrollHeight - el##clientHeight);
};

let component = reducerComponent("Console");
let make = (~contents, _:childless) => {
  ...component,

  initialState: () => {
    rref: ref(None)
  },
  reducer: ((), _) => NoUpdate,

  didMount: self => {
    scrollToBottom(self.state.rref^);
    NoUpdate
  },
  didUpdate: ({ newSelf as self }) =>
    scrollToBottom(self.state.rref^),

  render: self =>
    <pre className="c-console" ref=(self.handle((r, { state }) => state.rref := Js.toOption(r)))>
      {contents |> text}
    </pre>
};