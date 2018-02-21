open Rebase;
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
let make = (~value, ~lang=?, ~defaultValue=?, ~lineNumbers=true, ~readOnly=false, ~onChange=?, _:childless) => {
  ...component,

  render: (_self) =>
    <CodeMirror
      value
      ?defaultValue
      ?onChange
      options={
        "mode":           lang |> Option.map(_langToMode) |> Js.Undefined.fromOption,
        "theme":          "material",
        "lineNumbers":    lineNumbers,
        "readOnly":       Js.Boolean.to_js_boolean(readOnly),
        "scrollbarStyle": "simple"
      }
    />

};