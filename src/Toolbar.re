open! Vrroom;
module Styles = ToolbarStyles;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onReset, ~onHelp, _:childless) => {
  ...component,
  render: _self =>
    <div className="c-toolbar">

      <Button icon    = "chevron-right"
              label   = "Reset"
              onClick = onReset />

      <div className="separator" />

      <Button icon    = "help-circle-outline"
              label   = "Help"
              onClick = onHelp />

    </div>
};