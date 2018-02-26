'use strict';

var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MutationObserver = require("./common/MutationObserver.bs.js");

var component = ReasonReact.statelessComponent("DomContainer");

function make(onUpdate, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, MutationObserver.make(onUpdate, (function (observeRef) {
                        return React.createElement("div", {
                                    ref: observeRef,
                                    id: "dom-root"
                                  });
                      })));
    });
  return newrecord;
}

exports.component = component;
exports.make = make;
/* component Not a pure module */
