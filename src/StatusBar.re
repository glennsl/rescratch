open! Vrroom;
module Styles = ToolbarStyles;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onReset, _:childless) => {
  ...component,
  render: _self =>
    <div className="c-statusbar">

      <Button icon    = <MaterialUIIcons.Delete />
              label   = "Reset"
              onClick = onReset />

      <div className="separator" />

      <Button label   = "Output"
              onClick = (() => ()) />

    </div>
};