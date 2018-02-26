'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var attach = (
  function (callback, el) {
    var observer = new MutationObserver(callback);
    observer.observe(el, { childList: true });
  }
);

var component = ReasonReact.reducerComponent("MutationObserver");

function make(onChange, render) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (self) {
      Rebase.Option[/* forEach */8]((function (r) {
              return Curry._2(attach, onChange, r);
            }), self[/* state */2][/* rref */0][0]);
      return /* NoUpdate */0;
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

exports.attach = attach;
exports.component = component;
exports.make = make;
/* attach Not a pure module */
