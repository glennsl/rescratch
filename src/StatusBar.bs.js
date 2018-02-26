'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Button = require("./common/Button.bs.js");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var SelectButton = require("./common/SelectButton.bs.js");
var DependencyList = require("./DependencyList.bs.js");

var TemplateSelectButton = SelectButton.Make(/* module */[]);

var component = ReasonReact.statelessComponent("Toolbar");

function make(projectPath, templates, consoleUpdated, domUpdated, terminalUpdated, onSelectTemplate, selectedPane, onSelectPane, _) {
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
                            })], /* None */0, /* None */0, onSelectTemplate, /* array */[])), ReasonReact.element(/* None */0, /* None */0, DependencyList.make(projectPath, /* array */[])), React.createElement("div", {
                      className: "separator"
                    }), ReasonReact.element(/* None */0, /* None */0, Button.make("JavaScript", /* None */0, /* None */0, /* None */0, /* Some */[Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                                Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], +(selectedPane === /* Js */16617), "s-selected"),
                                /* [] */0
                              ])], (function () {
                            return Curry._1(onSelectPane, /* Js */16617);
                          }), /* array */[])), ReasonReact.element(/* None */0, /* None */0, Button.make("Console", /* None */0, /* None */0, /* None */0, /* Some */[Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                                Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], +(selectedPane === /* Console */-433646793), "s-selected"),
                                /* :: */[
                                  Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], consoleUpdated, "s-updated"),
                                  /* [] */0
                                ]
                              ])], (function () {
                            return Curry._1(onSelectPane, /* Console */-433646793);
                          }), /* array */[])), ReasonReact.element(/* None */0, /* None */0, Button.make("Dom", /* None */0, /* None */0, /* None */0, /* Some */[Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                                Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], +(selectedPane === /* Dom */3406434), "s-selected"),
                                /* :: */[
                                  Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], domUpdated, "s-updated"),
                                  /* [] */0
                                ]
                              ])], (function () {
                            return Curry._1(onSelectPane, /* Dom */3406434);
                          }), /* array */[])), ReasonReact.element(/* None */0, /* None */0, Button.make("Terminal", /* None */0, /* None */0, /* None */0, /* Some */[Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                                Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], +(selectedPane === /* Terminal */-912466532), "s-selected"),
                                /* :: */[
                                  Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], terminalUpdated, "s-updated"),
                                  /* [] */0
                                ]
                              ])], (function () {
                            return Curry._1(onSelectPane, /* Terminal */-912466532);
                          }), /* array */[])));
    });
  return newrecord;
}

exports.TemplateSelectButton = TemplateSelectButton;
exports.component = component;
exports.make = make;
/* TemplateSelectButton Not a pure module */
