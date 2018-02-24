'use strict';

var React = require("react");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var ScrollToBottom = require("./common/ScrollToBottom.bs.js");

var component = ReasonReact.statelessComponent("Console");

function make(contents, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, ScrollToBottom.make((function (scrollRef) {
                        return React.createElement("pre", {
                                    ref: scrollRef,
                                    className: "c-console"
                                  }, Vrroom.text(contents));
                      })));
    });
  return newrecord;
}

exports.component = component;
exports.make = make;
/* component Not a pure module */
