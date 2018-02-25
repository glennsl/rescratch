'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Ansi_up = require("ansi_up");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Child_process = require("child_process");

var au = new Ansi_up.default();

au.use_classes = true;

function execute(send, cwd, command, callback) {
  var $$process = Child_process.spawn(command, /* array */[], {
        cwd: cwd,
        shell: true
      });
  $$process.stdout.on("data", (function (data) {
          return Curry._1(send, /* StdOut */Block.__(1, [data]));
        }));
  $$process.stderr.on("data", (function (data) {
          return Curry._1(send, /* StdErr */Block.__(2, [data]));
        }));
  $$process.on("exit", (function (code, _) {
          return Curry._1(callback, code);
        }));
  return /* () */0;
}

var component = ReasonReact.reducerComponent("Terminal");

function make(dir, render) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      return Curry._2(render, (function (command, callback) {
                    return Curry._1(send, /* ExecuteCommand */Block.__(0, [
                                  command,
                                  callback
                                ]));
                  }), param[/* state */2][/* output */0]);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* output */""];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      switch (action.tag | 0) {
        case 0 : 
            var callback = action[1];
            var command = action[0];
            return /* UpdateWithSideEffects */Block.__(3, [
                      /* record */[/* output */state[/* output */0] + ("\n> " + (command + "\n"))],
                      (function (self) {
                          return execute(self[/* send */4], dir, command, callback);
                        })
                    ]);
        case 1 : 
            return /* Update */Block.__(0, [/* record */[/* output */state[/* output */0] + ("<div class=\"stdout\">" + (au.ansi_to_html(action[0]) + "</div>"))]]);
        case 2 : 
            return /* Update */Block.__(0, [/* record */[/* output */state[/* output */0] + ("<div class=\"stderr\">" + (au.ansi_to_html(action[0]) + "</div>"))]]);
        
      }
    });
  return newrecord;
}

exports.au = au;
exports.execute = execute;
exports.component = component;
exports.make = make;
/* au Not a pure module */
