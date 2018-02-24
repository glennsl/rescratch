'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

function scrollToBottom(rref) {
  var el = Js_option.getExn(rref);
  return el.scrollTop = el.scrollHeight - el.clientHeight | 0;
}

var component = ReasonReact.reducerComponent("ScrollToBottom");

function make(render) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (self) {
      scrollToBottom(self[/* state */2][/* rref */0][0]);
      return /* NoUpdate */0;
    });
  newrecord[/* didUpdate */5] = (function (param) {
      return scrollToBottom(param[/* newSelf */1][/* state */2][/* rref */0][0]);
    });
  newrecord[/* render */9] = (function (self) {
      return Curry._1(render, Curry._1(self[/* handle */0], (function (r, param) {
                        param[/* state */2][/* rref */0][0] = (r == null) ? /* None */0 : [r];
                        return /* () */0;
                      })));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* rref */[/* None */0]];
    });
  newrecord[/* reducer */12] = (function (_, _$1) {
      return /* NoUpdate */0;
    });
  return newrecord;
}

exports.scrollToBottom = scrollToBottom;
exports.component = component;
exports.make = make;
/* component Not a pure module */
