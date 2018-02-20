open Vrroom;

[%bs.raw {|require('codemirror/mode/javascript/javascript')|}];
[%bs.raw {|require('codemirror/mode/rust/rust')|}];
[%bs.raw {|require('codemirror/mode/mllike/mllike')|}];
[%bs.raw {|require('codemirror/addon/scroll/simplescrollbars.js')|}];

let _langToMode =
  fun | `ML => "mllike"
      | `RE => "rust" 
      | `JS => "javascript";

let component = ReasonReact.statelessComponent("Editor");
let make = (~value, ~lang, ~defaultValue=?, ~readOnly=false, ~onChange=?, _:childless) => {
  ...component,

  render: (_self) =>
    <CodeMirror
      value
      ?defaultValue
      ?onChange
      options={
        "mode":           _langToMode(lang),
        "theme":          "material",
        "lineNumbers":    true,
        "readOnly":       Js.Boolean.to_js_boolean(readOnly),
        "scrollbarStyle": "simple"
      }
    />

};