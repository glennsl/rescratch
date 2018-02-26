open! Rebase;
open ReasonReact;
open! Vrroom;

type state = {
  rref: ref(option(Dom.element))
};

let attach : (unit => unit, Dom.element) => unit = [%raw {|
  function (callback, el) {
    var observer = new MutationObserver(callback);
    observer.observe(el, { childList: true });
  }
|}];

let component = reducerComponent("MutationObserver");
let make = (~onChange, render) => {
  ...component,

  initialState: () => {
    rref: ref(None)
  },
  reducer: ((), _) => NoUpdate,

  didMount: self => {
    self.state.rref^ |> Option.forEach(r => attach(onChange, r));
    NoUpdate
  },

  render: self =>
    render(~observeRef=(self.handle((r, { state }) => state.rref := Js.toOption(r))))

}