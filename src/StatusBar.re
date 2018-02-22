open! Vrroom;
module Styles = ToolbarStyles;

module PaneSelectButton = SelectButton.Make({
  type value = [
    | `Js
    | `Console
    | `Dom
  ]
});

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onReset, ~selectedPane, ~onSelectPane, _:childless) => {
  ...component,
  render: _self =>
    <div className="c-statusbar">

      <Button icon    = <MaterialUIIcons.Delete />
              label   = "Reset"
              onClick = onReset />

      <div className="separator" />

      <PaneSelectButton
          items = [{
              label: "JavaScript",
              value: `Js
            }, {
              label: "Console",
              value: `Console
            }, {
              label: "DOM",
              value: `Dom
            }]
          selected = selectedPane
          onSelect = onSelectPane
        />

    </div>
};