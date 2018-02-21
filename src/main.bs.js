'use strict';

var Path = require("path");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Electron = require("./bindings/Electron.bs.js");
var Electron$1 = require("electron");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var ElectronWindowState = require("electron-window-state");

var $$window = [/* None */0];

function createWindow() {
  var windowState = ElectronWindowState({
        defaultWidth: 800,
        defaultHeight: 600
      });
  var win = Electron.BrowserWindow[/* make */0](/* Some */[windowState.width], /* Some */[windowState.height], /* Some */[/* `Pos */[
          4003188,
          /* tuple */[
            windowState.x,
            windowState.y
          ]
        ]], /* Some */[/* true */1], /* () */0);
  win.loadURL("file://" + Path.join(Js_option.getExn(Js_primitive.undefined_to_opt(typeof (__dirname) === "undefined" ? undefined : (__dirname))), "index.html"));
  $$window[0] = /* Some */[win];
  win.on("closed", (function () {
          $$window[0] = /* None */0;
          return /* () */0;
        }));
  windowState.manage(win);
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
