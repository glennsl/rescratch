'use strict';

var Icon = require("./Icon.bs.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

function makeIcon(param) {
  if (param) {
    return ReasonReact.element(/* None */0, /* None */0, Icon.make(param[0], /* array */[]));
  } else {
    return Vrroom.nothing;
  }
}

var component = ReasonReact.statelessComponent("Button");

function make(label, icon, _, $staropt$star, $staropt$star$1, onClick, _$1) {
  var alignIcon = $staropt$star ? $staropt$star[0] : /* Left */847852583;
  var className = $staropt$star$1 ? $staropt$star$1[0] : "";
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
                }, match !== 0 ? makeIcon(icon) : Vrroom.nothing, Vrroom.text(label), match$1 !== 0 ? makeIcon(icon) : Vrroom.nothing);
    });
  return newrecord;
}

var Styles = 0;

exports.Styles = Styles;
exports.makeIcon = makeIcon;
exports.component = component;
exports.make = make;
/* component Not a pure module */
