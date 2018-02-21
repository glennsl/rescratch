'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("Button");

function make(label, $staropt$star, _, $staropt$star$1, $staropt$star$2, onClick, _$1) {
  var icon = $staropt$star ? $staropt$star[0] : Vrroom.nothing;
  var alignIcon = $staropt$star$1 ? $staropt$star$1[0] : /* Left */847852583;
  var className = $staropt$star$2 ? $staropt$star$2[0] : "";
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      var match = +(alignIcon === /* Left */847852583);
      var match$1 = +(alignIcon === /* Right */-57574468);
      return React.createElement("button", {
                  className: Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                        "c-button",
                        /* :: */[
                          className,
                          /* [] */0
                        ]
                      ]),
                  onClick: (function () {
                      return Curry._1(onClick, /* () */0);
                    })
                }, match !== 0 ? icon : Vrroom.nothing, React.createElement("span", {
                      className: "label"
                    }, Vrroom.text(label)), match$1 !== 0 ? icon : Vrroom.nothing);
    });
  return newrecord;
}

var Styles = 0;

exports.Styles = Styles;
exports.component = component;
exports.make = make;
/* component Not a pure module */
