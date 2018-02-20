'use strict';

var Electron = require("electron");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");

function getPath(name) {
  return Electron.app.getPath(name >= 462303765 ? (
                name >= 803993151 ? (
                    name >= 928065752 ? (
                        name >= 936570676 ? "temp" : "documents"
                      ) : (
                        name >= 848350095 ? "logs" : "home"
                      )
                  ) : (
                    name !== 497716171 ? (
                        name >= 596131973 ? "music" : "pictures"
                      ) : "downloads"
                  )
              ) : (
                name >= 3458162 ? (
                    name >= 364488080 ? (
                        name >= 438979512 ? "videos" : "pepperFlashSystemPlugin"
                      ) : (
                        name >= 17369931 ? "appData" : "exe"
                      )
                  ) : (
                    name !== -337252932 ? (
                        name >= -177755956 ? "module" : "userData"
                      ) : "desktop"
                  )
              ));
}

var App = /* module */[/* getPath */getPath];

function getPath$1(name) {
  return Electron.remote.app.getPath(name >= 462303765 ? (
                name >= 803993151 ? (
                    name >= 928065752 ? (
                        name >= 936570676 ? "temp" : "documents"
                      ) : (
                        name >= 848350095 ? "logs" : "home"
                      )
                  ) : (
                    name !== 497716171 ? (
                        name >= 596131973 ? "music" : "pictures"
                      ) : "downloads"
                  )
              ) : (
                name >= 3458162 ? (
                    name >= 364488080 ? (
                        name >= 438979512 ? "videos" : "pepperFlashSystemPlugin"
                      ) : (
                        name >= 17369931 ? "appData" : "exe"
                      )
                  ) : (
                    name !== -337252932 ? (
                        name >= -177755956 ? "module" : "userData"
                      ) : "desktop"
                  )
              ));
}

var App$1 = /* module */[/* getPath */getPath$1];

var Remote = /* module */[/* App */App$1];

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
exports.Remote = Remote;
exports.BrowserWindow = BrowserWindow;
/* electron Not a pure module */
