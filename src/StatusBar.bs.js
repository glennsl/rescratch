'use strict';

var React = require("react");
var Button = require("./common/Button.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUIIcons = require("bs-material-ui-icons/src/MaterialUIIcons.js");

var component = ReasonReact.statelessComponent("Toolbar");

function make(onReset, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: "c-statusbar"
                }, ReasonReact.element(/* None */0, /* None */0, Button.make("Reset", /* Some */[ReasonReact.element(/* None */0, /* None */0, MaterialUIIcons.Delete[/* make */0](/* array */[]))], /* None */0, /* None */0, /* None */0, onReset, /* array */[])), React.createElement("div", {
                      className: "separator"
                    }), ReasonReact.element(/* None */0, /* None */0, Button.make("Output", /* None */0, /* None */0, /* None */0, /* None */0, (function () {
                            return /* () */0;
                          }), /* array */[])));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles = Styles;
exports.component = component;
exports.make = make;
/* component Not a pure module */
