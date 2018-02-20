'use strict';

var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("App");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", undefined, "Hello World");
    });
  return newrecord;
}

exports.component = component;
exports.make = make;
/* component Not a pure module */
