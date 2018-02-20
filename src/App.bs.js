'use strict';

var Fs = require("fs");
var Path = require("path");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Editor = require("./Editor.bs.js");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var Process = require("process");
var Electron = require("./bindings/Electron.bs.js");
var FsExtra = require("fs-extra");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var appRoot = Process.cwd();

var projectPath = Path.join(Curry._1(Electron.Remote[/* App */0][/* getPath */0], /* UserData */-556117451), "current");

var sourceFilename = Path.join(projectPath, "src", "main.re");

function resetProject() {
  FsExtra.removeSync(projectPath);
  FsExtra.copySync(Path.join(appRoot, "templates", "default"), projectPath);
  return /* () */0;
}

function getCode() {
  try {
    return Fs.readFileSync(sourceFilename, "utf8");
  }
  catch (exn){
    resetProject(/* () */0);
    try {
      return Fs.readFileSync(sourceFilename, "utf8");
    }
    catch (exn$1){
      return "Fatal error occurred reading curent project";
    }
  }
}

function persist(code) {
  Fs.writeFileSync(sourceFilename, code, "utf8");
  return /* () */0;
}

function compile(_, $$return) {
  return Curry._1($$return, "");
}

var component = ReasonReact.reducerComponent("App");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
      return React.createElement("div", {
                  className: "app"
                }, ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* code */0], /* RE */18355, /* None */0, /* None */0, /* Some */[(function (code) {
                              return Curry._1(send, /* CodeChanged */Block.__(0, [code]));
                            })], /* array */[])), React.createElement("div", {
                      className: "output"
                    }, Vrroom.text(state[/* output */1])));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* code */getCode(/* () */0),
              /* output */"No output yet"
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      switch (action.tag | 0) {
        case 0 : 
            var code = action[0];
            return /* UpdateWithSideEffects */Block.__(3, [
                      /* record */[
                        /* code */code,
                        /* output */state[/* output */1]
                      ],
                      (function (param) {
                          persist(code);
                          return Curry._1(param[/* send */4], /* CompileCompleted */Block.__(2, [""]));
                        })
                    ]);
        case 1 : 
            return /* Update */Block.__(0, [/* record */[
                        /* code */state[/* code */0],
                        /* output */action[0]
                      ]]);
        case 2 : 
            return /* NoUpdate */0;
        
      }
    });
  return newrecord;
}

exports.appRoot = appRoot;
exports.projectPath = projectPath;
exports.sourceFilename = sourceFilename;
exports.resetProject = resetProject;
exports.getCode = getCode;
exports.persist = persist;
exports.compile = compile;
exports.component = component;
exports.make = make;
/* appRoot Not a pure module */
