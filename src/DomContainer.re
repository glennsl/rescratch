open ReasonReact;
open Vrroom;

let component = statelessComponent("DomContainer");
let make = (~onUpdate, _:childless) => {
  ...component,
  render: _self =>
    <MutationObserver onChange=onUpdate>
      ...((~observeRef) =>
        <div id="dom-root" ref=observeRef />
      )
    </MutationObserver>
};