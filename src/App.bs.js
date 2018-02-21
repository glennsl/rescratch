'use strict';

var Fs = require("fs");
var VM2 = require("./bindings/VM2.bs.js");
var Path = require("path");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("./Utils.bs.js");
var React = require("react");
var Editor = require("./Editor.bs.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var Toolbar = require("./Toolbar.bs.js");
var Process = require("process");
var Electron = require("./bindings/Electron.bs.js");
var FsExtra = require("fs-extra");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Child_process = require("child_process");

var appRoot = Process.cwd();

var projectPath = Path.join(Curry._1(Electron.Remote[/* App */0][/* getPath */0], /* UserData */-556117451), "current");

var sourceFilename = Path.join(projectPath, "src", "main.re");

var jsFilename = Path.join(projectPath, "lib", "js", "src", "main.js");

function resetProject() {
  FsExtra.removeSync(projectPath);
  FsExtra.copySync(Path.join(appRoot, "templates", "json"), projectPath);
  Child_process.execSync("npm install", {
        cwd: projectPath
      });
  Child_process.execSync("npm link bs-platform", {
        cwd: projectPath
      });
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

function compile($$return) {
  try {
    Child_process.execSync("bsb", {
          cwd: projectPath
        });
    return Curry._1($$return, Fs.readFileSync(jsFilename, "utf8"));
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Js_exn.$$Error) {
      return Curry._1($$return, Js_option.getExn(Js_primitive.undefined_to_opt(exn[1].message)));
    } else {
      throw exn;
    }
  }
}

var persistAndCompile = Utils.debounce((function (param) {
        persist(param[0]);
        return compile(param[1]);
      }), 600);

var component = ReasonReact.reducerComponent("App");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
      return React.createElement("div", {
                  className: "app"
                }, ReasonReact.element(/* None */0, /* None */0, Toolbar.make(resetProject, (function () {
                            return /* () */0;
                          }), /* array */[])), React.createElement("div", {
                      className: "editors"
                    }, ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* code */0], /* RE */18355, /* None */0, /* None */0, /* Some */[(function (code) {
                                  return Curry._1(send, /* CodeChanged */Block.__(0, [code]));
                                })], /* array */[])), ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* jsCode */1], /* JS */16585, /* None */0, /* None */0, /* None */0, /* array */[]))), React.createElement("div", {
                      className: "output"
                    }, Vrroom.text(state[/* output */2])));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* code */getCode(/* () */0),
              /* jsCode */"",
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
                        /* jsCode */state[/* jsCode */1],
                        /* output */state[/* output */2]
                      ],
                      (function (param) {
                          var send = param[/* send */4];
                          return persistAndCompile(/* tuple */[
                                      code,
                                      (function (result) {
                                          return Curry._1(send, /* CompileCompleted */Block.__(2, [result]));
                                        })
                                    ]);
                        })
                    ]);
        case 1 : 
            return /* Update */Block.__(0, [/* record */[
                        /* code */state[/* code */0],
                        /* jsCode */state[/* jsCode */1],
                        /* output */action[0]
                      ]]);
        case 2 : 
            var jsCode = action[0];
            return /* UpdateWithSideEffects */Block.__(3, [
                      /* record */[
                        /* code */state[/* code */0],
                        /* jsCode */jsCode,
                        /* output */state[/* output */2]
                      ],
                      (function () {
                          try {
                            var vm = VM2.makeVM(/* Some */[/* Allow */885068905], { });
                            vm.run(jsCode, jsFilename);
                            return /* () */0;
                          }
                          catch (raw_e){
                            var e = Js_exn.internalToOCamlException(raw_e);
                            console.log("error", e);
                            return /* () */0;
                          }
                        })
                    ]);
        
      }
    });
  return newrecord;
}

exports.appRoot = appRoot;
exports.projectPath = projectPath;
exports.sourceFilename = sourceFilename;
exports.jsFilename = jsFilename;
exports.resetProject = resetProject;
exports.getCode = getCode;
exports.persist = persist;
exports.compile = compile;
exports.persistAndCompile = persistAndCompile;
exports.component = component;
exports.make = make;
/* appRoot Not a pure module */
