'use strict';

var Electron = require("electron");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");

var App = /* module */[];

function make(width, height, $staropt$star, _) {
  var pos = $staropt$star ? $staropt$star[0] : /* Default */-384499551;
  return new Electron.BrowserWindow({
              width: Js_null_undefined.from_opt(width),
              height: Js_null_undefined.from_opt(height),
              x: typeof pos === "number" || pos[0] !== 4003188 ? undefined : pos[1][0],
              y: typeof pos === "number" || pos[0] !== 4003188 ? undefined : pos[1][1],
              center: pos !== 980392437 ? undefined : true
            });
}

var BrowserWindow = /* module */[/* make */make];

exports.App = App;
exports.BrowserWindow = BrowserWindow;
/* electron Not a pure module */
