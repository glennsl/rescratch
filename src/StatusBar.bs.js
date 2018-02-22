'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var SelectButton = require("./common/SelectButton.bs.js");

var TemplateSelectButton = SelectButton.Make(/* module */[]);

var PaneSelectButton = SelectButton.Make(/* module */[]);

var component = ReasonReact.statelessComponent("Toolbar");

function make(templates, onSelectTemplate, selectedPane, onSelectPane, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: "c-statusbar"
                }, ReasonReact.element(/* None */0, /* None */0, Curry._8(TemplateSelectButton[/* make */1], List.map((function (value) {
                                return /* record */[
                                        /* label */value,
                                        /* value */value
                                      ];
                              }), templates), "default", /* None */0, /* Some */[(function () {
                              return Vrroom.text("Load");
                            })], /* None */0, /* None */0, onSelectTemplate, /* array */[])), React.createElement("div", {
                      className: "separator"
                    }), ReasonReact.element(/* None */0, /* None */0, Curry._8(PaneSelectButton[/* make */1], /* :: */[
                          /* record */[
                            /* label */"JavaScript",
                            /* value : Js */16617
                          ],
                          /* :: */[
                            /* record */[
                              /* label */"Console",
                              /* value : Console */-433646793
                            ],
                            /* :: */[
                              /* record */[
                                /* label */"DOM",
                                /* value : Dom */3406434
                              ],
                              /* :: */[
                                /* record */[
                                  /* label */"Terminal",
                                  /* value : Terminal */-912466532
                                ],
                                /* [] */0
                              ]
                            ]
                          ]
                        ], selectedPane, /* None */0, /* None */0, /* None */0, /* Some */[/* Right */-57574468], onSelectPane, /* array */[])));
    });
  return newrecord;
}

exports.TemplateSelectButton = TemplateSelectButton;
exports.PaneSelectButton = PaneSelectButton;
exports.component = component;
exports.make = make;
/* TemplateSelectButton Not a pure module */
