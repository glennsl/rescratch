'use strict';

var Path = require("path");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Electron = require("./bindings/Electron.bs.js");
var Electron$1 = require("electron");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

var $$window = [/* None */0];

function createWindow() {
  var win = Electron.BrowserWindow[/* make */0](/* Some */[800], /* Some */[600], /* Some */[/* Center */980392437], /* () */0);
  win.loadURL("file://" + Path.join(Js_option.getExn(Js_primitive.undefined_to_opt(typeof (__dirname) === "undefined" ? undefined : (__dirname))), "index.html"));
  $$window[0] = /* Some */[win];
  win.on("closed", (function () {
          $$window[0] = /* None */0;
          return /* () */0;
        }));
  return /* () */0;
}

Electron$1.app.on("ready", createWindow);

Electron$1.app.on("activate", (function () {
        if (Caml_obj.caml_equal($$window, [/* None */0])) {
          return createWindow(/* () */0);
        } else {
          return 0;
        }
      }));

exports.$$window = $$window;
exports.createWindow = createWindow;
/*  Not a pure module */
