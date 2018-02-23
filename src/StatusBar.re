open! Vrroom;

module TemplateSelectButton = SelectButton.Make({
  type value = string
});

module PaneSelectButton = SelectButton.Make({
  type value = [
    | `Js
    | `Console
    | `Dom
    | `Terminal
  ]
});

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~projectPath, ~templates, ~onSelectTemplate, ~selectedPane, ~onSelectPane, _:childless) => {
  ...component,
  render: _self =>
    <div className="c-statusbar">

      <TemplateSelectButton
          items             = (templates |> List.map(value => TemplateSelectButton.{ label: value, value }))
          selected          = "default"
          renderButtonLabel = (_item => "Load" |> text)
          onSelect          = onSelectTemplate
        />

      <DependencyList projectPath />

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
            }, {
              label: "Terminal",
              value: `Terminal
            }]
          selected = selectedPane
          onSelect = onSelectPane
          align    = `Right
        />

    </div>
};