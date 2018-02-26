open! Vrroom;

module TemplateSelectButton = SelectButton.Make({
  type value = string
});

let component = ReasonReact.statelessComponent("Toolbar");
let make = (
    ~projectPath,
    ~templates,
    ~consoleUpdated,
    ~domUpdated,
    ~terminalUpdated,
    ~onSelectTemplate,
    ~selectedPane,
    ~onSelectPane,
    _:childless) => {
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

      <Button
          label="JavaScript"
          className=ClassName.(join([
            "s-selected" |> if_(selectedPane == `Js),
          ]))
          onClick=(_e => onSelectPane(`Js))
        />

      <Button
          label="Console"
          className=ClassName.(join([
            "s-selected" |> if_(selectedPane == `Console),
            "s-updated" |> if_(consoleUpdated),
          ]))
          onClick=(_e => onSelectPane(`Console))
        />

      <Button
          label="Dom"
          className=ClassName.(join([
            "s-selected" |> if_(selectedPane == `Dom),
            "s-updated" |> if_(domUpdated),
          ]))
          onClick=(_e => onSelectPane(`Dom))
        />

      <Button
          label="Terminal"
          className=ClassName.(join([
            "s-selected" |> if_(selectedPane == `Terminal),
            "s-updated" |> if_(terminalUpdated),
          ]))
          onClick=(_e => onSelectPane(`Terminal))
        />

    </div>
};