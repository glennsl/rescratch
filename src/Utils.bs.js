'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

function debounce(f, wait) {
  var timeout = [/* None */0];
  return (function (x) {
      var match = timeout[0];
      if (match) {
        clearTimeout(match[0]);
        timeout[0] = /* None */0;
      }
      timeout[0] = /* Some */[setTimeout((function () {
                timeout[0] = /* None */0;
                return Curry._1(f, x);
              }), wait)];
      return /* () */0;
    });
}

exports.debounce = debounce;
/* No side effect */
