'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Child_process = require("child_process");

function execute(send, cwd, command) {
  try {
    var $$process = Child_process.spawn(command, /* array */[], {
          cwd: cwd,
          shell: true
        });
    var stdout = $$process.stdout;
    var stderr = $$process.stderr;
    stdout.on("data", (function (data) {
            return Curry._1(send, /* OutputChanged */Block.__(1, [data]));
          }));
    stderr.on("data", (function (data) {
            return Curry._1(send, /* OutputChanged */Block.__(1, [data]));
          }));
    return /* () */0;
  }
  catch (raw_e){
    var e = Js_exn.internalToOCamlException(raw_e);
    if (e[0] === Js_exn.$$Error) {
      return Curry._1(send, /* OutputChanged */Block.__(1, [Js_option.getExn(Js_primitive.undefined_to_opt(e[1].message))]));
    } else {
      return Curry._1(send, /* OutputChanged */Block.__(1, ["Error:\n" + String(e)]));
    }
  }
}

var component = ReasonReact.reducerComponent("Terminal");

function make(dir, render) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      return Curry._2(render, (function (command) {
                    return Curry._1(send, /* ExecuteCommand */Block.__(0, [command]));
                  }), param[/* state */2][/* output */0]);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* output */""];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (action.tag) {
        return /* Update */Block.__(0, [/* record */[/* output */state[/* output */0] + ("\n" + action[0])]]);
      } else {
        var command = action[0];
        return /* UpdateWithSideEffects */Block.__(3, [
                  /* record */[/* output */state[/* output */0] + ("\n\n> " + command)],
                  (function (self) {
                      return execute(self[/* send */4], dir, command);
                    })
                ]);
      }
    });
  return newrecord;
}

exports.execute = execute;
exports.component = component;
exports.make = make;
/* component Not a pure module */
