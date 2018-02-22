'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Editor = require("./Editor.bs.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Child_process = require("child_process");

function handleKeyDown(send, e) {
  if (e.keyCode === 13) {
    return Curry._1(send, /* ExecuteCommand */0);
  } else {
    return 0;
  }
}

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

function make(dir, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
      return React.createElement("div", {
                  className: "c-terminal"
                }, ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* output */0], /* None */0, /* None */0, /* Some */[/* false */0], /* Some */[/* true */1], /* None */0, /* array */[])), React.createElement("input", {
                      type: "text",
                      value: state[/* command */1],
                      onKeyDown: (function (e) {
                          return handleKeyDown(send, e);
                        }),
                      onChange: (function (e) {
                          return Curry._1(send, /* CommandChanged */Block.__(0, [e.target.value]));
                        })
                    }));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* output */"",
              /* command */""
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (typeof action === "number") {
        return /* UpdateWithSideEffects */Block.__(3, [
                  /* record */[
                    /* output */state[/* output */0] + ("\n\n> " + state[/* command */1]),
                    /* command */""
                  ],
                  (function (self) {
                      return execute(self[/* send */4], dir, state[/* command */1]);
                    })
                ]);
      } else if (action.tag) {
        return /* Update */Block.__(0, [/* record */[
                    /* output */state[/* output */0] + ("\n" + action[0]),
                    /* command */state[/* command */1]
                  ]]);
      } else {
        return /* Update */Block.__(0, [/* record */[
                    /* output */state[/* output */0],
                    /* command */action[0]
                  ]]);
      }
    });
  return newrecord;
}

exports.handleKeyDown = handleKeyDown;
exports.execute = execute;
exports.component = component;
exports.make = make;
/* component Not a pure module */
