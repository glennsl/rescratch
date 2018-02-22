'use strict';

var App = require("./App.bs.js");
var Path = require("path");
var Curry = require("bs-platform/lib/js/curry.js");
var Electron = require("./bindings/Electron.bs.js");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var ExecutionEnvironment = require("./ExecutionEnvironment.bs.js");

var projectPath = Path.join(Curry._1(Electron.Remote[/* App */0][/* getPath */0], /* UserData */-556117451), "current");

ReactDOMRe.renderToElementWithId(ReasonReact.element(/* None */0, /* None */0, ExecutionEnvironment.make(projectPath, (function (execute, output) {
                return ReasonReact.element(/* None */0, /* None */0, App.make(projectPath, execute, output, /* array */[]));
              }))), "root");

exports.projectPath = projectPath;
/* projectPath Not a pure module */
