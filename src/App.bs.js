'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Editor = require("./Editor.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var $$default = "\n/* Based on https://rosettacode.org/wiki/FizzBuzz#OCaml */\nlet fizzbuzz = (i) =>\n  switch (i mod 3, i mod 5) {\n  | (0, 0) => \"FizzBuzz\"\n  | (0, _) => \"Fizz\"\n  | (_, 0) => \"Buzz\"\n  | _ => string_of_int(i)\n  };\n\nfor (i in 1 to 100) {\n  Js.log(fizzbuzz(i))\n};\n";

var component = ReasonReact.reducerComponent("App");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      return ReasonReact.element(/* None */0, /* None */0, Editor.make(param[/* state */2][/* code */0], /* RE */18355, /* None */0, /* None */0, /* Some */[(function (code) {
                          return Curry._1(send, /* CodeUpdated */[code]);
                        })], /* array */[]));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* code */$$default];
    });
  newrecord[/* reducer */12] = (function (action, _) {
      return /* Update */Block.__(0, [/* record */[/* code */action[0]]]);
    });
  return newrecord;
}

exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
exports.component = component;
exports.make = make;
/* component Not a pure module */
