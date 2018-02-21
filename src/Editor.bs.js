'use strict';

var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var CodeMirror = require("./bindings/CodeMirror.bs.js");
var Js_boolean = require("bs-platform/lib/js/js_boolean.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_undefined = require("bs-platform/lib/js/js_undefined.js");

((require('codemirror/mode/javascript/javascript')));

((require('codemirror/mode/rust/rust')));

((require('codemirror/mode/mllike/mllike')));

((require('codemirror/addon/scroll/simplescrollbars.js')));

function _langToMode(param) {
  if (param !== 17247) {
    if (param >= 18355) {
      return "rust";
    } else {
      return "javascript";
    }
  } else {
    return "mllike";
  }
}

var component = ReasonReact.statelessComponent("Editor");

function make(value, lang, defaultValue, $staropt$star, $staropt$star$1, onChange, _) {
  var lineNumbers = $staropt$star ? $staropt$star[0] : /* true */1;
  var readOnly = $staropt$star$1 ? $staropt$star$1[0] : /* false */0;
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, CodeMirror.make(/* None */0, /* Some */[value], defaultValue, /* None */0, onChange, /* Some */[{
                        mode: Js_undefined.fromOption(Rebase.Option[/* map */0](_langToMode, lang)),
                        theme: "material",
                        lineNumbers: lineNumbers,
                        readOnly: Js_boolean.to_js_boolean(readOnly),
                        scrollbarStyle: "simple"
                      }], /* array */[]));
    });
  return newrecord;
}

exports._langToMode = _langToMode;
exports.component = component;
exports.make = make;
/*  Not a pure module */
