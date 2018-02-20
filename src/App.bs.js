'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Editor = require("./Editor.bs.js");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var $$default = "\n/* Based on https://rosettacode.org/wiki/FizzBuzz#OCaml */\nlet fizzbuzz = (i) =>\n  switch (i mod 3, i mod 5) {\n  | (0, 0) => \"FizzBuzz\"\n  | (0, _) => \"Fizz\"\n  | (_, 0) => \"Buzz\"\n  | _ => string_of_int(i)\n  };\n\nfor (i in 1 to 100) {\n  Js.log(fizzbuzz(i))\n};\n";

var component = ReasonReact.reducerComponent("App");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
      return React.createElement("div", {
                  className: "app"
                }, ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* code */0], /* RE */18355, /* None */0, /* None */0, /* Some */[(function (code) {
                              return Curry._1(send, /* CodeChanged */Block.__(0, [code]));
                            })], /* array */[])), React.createElement("div", {
                      className: "output"
                    }, Vrroom.text(state[/* output */1])));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* code */$$default,
              /* output */"No output yet"
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (action.tag) {
        return /* Update */Block.__(0, [/* record */[
                    /* code */state[/* code */0],
                    /* output */action[0]
                  ]]);
      } else {
        return /* Update */Block.__(0, [/* record */[
                    /* code */action[0],
                    /* output */state[/* output */1]
                  ]]);
      }
    });
  return newrecord;
}

exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
exports.component = component;
exports.make = make;
/* component Not a pure module */
