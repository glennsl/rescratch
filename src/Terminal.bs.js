'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var ScrollToBottom = require("./common/ScrollToBottom.bs.js");

function handleKeyDown(send, e) {
  if (e.keyCode === 13) {
    return Curry._1(send, /* ExecuteCurrentCommand */0);
  } else {
    return 0;
  }
}

var component = ReasonReact.reducerComponent("Terminal");

function make(onExecute, output, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      return React.createElement("div", {
                  className: "c-terminal"
                }, ReasonReact.element(/* None */0, /* None */0, ScrollToBottom.make((function (scrollRef) {
                            return React.createElement("pre", {
                                        ref: scrollRef
                                      }, Vrroom.text(output));
                          }))), React.createElement("div", {
                      className: "command-line"
                    }, React.createElement("span", {
                          className: "prompt"
                        }, Vrroom.text(">")), React.createElement("input", {
                          type: "text",
                          value: param[/* state */2][/* command */0],
                          onKeyDown: (function (e) {
                              return handleKeyDown(send, e);
                            }),
                          onChange: (function (e) {
                              return Curry._1(send, /* CommandChanged */[e.target.value]);
                            })
                        })));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* command */""];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (action) {
        return /* Update */Block.__(0, [/* record */[/* command */action[0]]]);
      } else {
        return /* UpdateWithSideEffects */Block.__(3, [
                  /* record */[/* command */""],
                  (function () {
                      return Curry._2(onExecute, state[/* command */0], (function () {
                                    return /* () */0;
                                  }));
                    })
                ]);
      }
    });
  return newrecord;
}

exports.handleKeyDown = handleKeyDown;
exports.component = component;
exports.make = make;
/* component Not a pure module */
