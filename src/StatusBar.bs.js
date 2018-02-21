'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Button = require("./common/Button.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var SelectButton = require("./common/SelectButton.bs.js");
var MaterialUIIcons = require("bs-material-ui-icons/src/MaterialUIIcons.js");

var PaneSelectButton = SelectButton.Make(/* module */[]);

var component = ReasonReact.statelessComponent("Toolbar");

function make(onReset, selectedPane, onSelectPane, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: "c-statusbar"
                }, ReasonReact.element(/* None */0, /* None */0, Button.make("Reset", /* Some */[ReasonReact.element(/* None */0, /* None */0, MaterialUIIcons.Delete[/* make */0](/* array */[]))], /* None */0, /* None */0, /* None */0, onReset, /* array */[])), React.createElement("div", {
                      className: "separator"
                    }), ReasonReact.element(/* None */0, /* None */0, Curry._7(PaneSelectButton[/* make */1], /* :: */[
                          /* record */[
                            /* label */"JavaScript",
                            /* value : Js */16617
                          ],
                          /* :: */[
                            /* record */[
                              /* label */"Output",
                              /* value : Output */-1055554783
                            ],
                            /* [] */0
                          ]
                        ], selectedPane, /* None */0, /* None */0, /* None */0, onSelectPane, /* array */[])));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles = Styles;
exports.PaneSelectButton = PaneSelectButton;
exports.component = component;
exports.make = make;
/* PaneSelectButton Not a pure module */
