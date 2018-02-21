open! Vrroom;
module Styles = ToolbarStyles;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onReset, ~onHelp, _:childless) => {
  ...component,
  render: _self =>
    <div className="c-toolbar">

      <Button icon    = <MaterialUIIcons.Delete />
              label   = "Reset"
              onClick = onReset />

      <div className="separator" />

      <Button icon    = <MaterialUIIcons.HelpOutline />
              label   = "Help"
              onClick = onHelp />

    </div>
};