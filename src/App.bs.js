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
var Process = require("process");
var Electron = require("./bindings/Electron.bs.js");
var Terminal = require("./Terminal.bs.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var StatusBar = require("./StatusBar.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Child_process = require("child_process");
var ExecutionEnvironment = require("./ExecutionEnvironment.bs.js");

var appRoot = Process.cwd();

var projectPath = Path.join(Curry._1(Electron.Remote[/* App */0][/* getPath */0], /* UserData */-556117451), "current");

var sourceFilename = Path.join(projectPath, "src", "main.re");

var jsFilename = Path.join(projectPath, "lib", "js", "src", "main.js");

function resetProject(execute, callback, _) {
  var templatePath = Path.join(appRoot, "templates", "react");
  return Curry._2(execute, "rm -rf *", (function () {
                return Curry._2(execute, "cp -R \"" + (String(templatePath) + ("/.\" \"" + (String(projectPath) + "\""))), (function () {
                              return Curry._2(execute, "npm install", (function () {
                                            return Curry._2(execute, "npm link bs-platform", (function () {
                                                          return Curry._1(callback, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
}

function getCode() {
  try {
    return Fs.readFileSync(sourceFilename, "utf8");
  }
  catch (exn){
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
    Child_process.execSync("bsb -make-world", {
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
      return ReasonReact.element(/* None */0, /* None */0, ExecutionEnvironment.make(projectPath, (function (execute, output) {
                        var match = state[/* activePane */3];
                        return React.createElement("div", {
                                    className: "app"
                                  }, React.createElement("div", {
                                        className: "main"
                                      }, ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* code */0], /* Some */[/* RE */18355], /* None */0, /* None */0, /* None */0, /* Some */[(function (code) {
                                                    return Curry._1(send, /* CodeChanged */Block.__(0, [code]));
                                                  })], /* array */[])), match !== -433646793 ? (
                                          match !== 16617 ? Vrroom.nothing : ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* jsCode */1], /* Some */[/* JS */16585], /* None */0, /* Some */[/* false */0], /* None */0, /* None */0, /* array */[]))
                                        ) : ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* console */2], /* None */0, /* None */0, /* Some */[/* false */0], /* None */0, /* None */0, /* array */[])), React.createElement("div", {
                                            className: Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                                                  "dom",
                                                  /* :: */[
                                                    Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], +(state[/* activePane */3] === /* Dom */3406434), "s-selected"),
                                                    /* [] */0
                                                  ]
                                                ])
                                          }, React.createElement("div", {
                                                id: "dom-root"
                                              })), React.createElement("div", {
                                            className: Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                                                  "terminal",
                                                  /* :: */[
                                                    Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], +(state[/* activePane */3] === /* Dom */3406434), "s-selected"),
                                                    /* [] */0
                                                  ]
                                                ])
                                          }, ReasonReact.element(/* None */0, /* None */0, Terminal.make(execute, output, /* array */[])))), ReasonReact.element(/* None */0, /* None */0, StatusBar.make((function (param) {
                                              return resetProject(execute, (function () {
                                                            return Curry._1(send, /* CodeChanged */Block.__(0, [getCode(/* () */0)]));
                                                          }), param);
                                            }), state[/* activePane */3], (function (pane) {
                                              return Curry._1(send, /* PaneSelected */Block.__(3, [pane]));
                                            }), /* array */[])));
                      })));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* code */getCode(/* () */0),
              /* jsCode */"",
              /* console */"",
              /* activePane : Terminal */-912466532
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
                        /* console */state[/* console */2],
                        /* activePane */state[/* activePane */3]
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
                        /* console */state[/* console */2] + ("\n" + action[0]),
                        /* activePane */state[/* activePane */3]
                      ]]);
        case 2 : 
            var jsCode = action[0];
            return /* UpdateWithSideEffects */Block.__(3, [
                      /* record */[
                        /* code */state[/* code */0],
                        /* jsCode */jsCode,
                        /* console */state[/* console */2],
                        /* activePane */state[/* activePane */3]
                      ],
                      (function (param) {
                          var send = param[/* send */4];
                          try {
                            var vm = VM2.makeVM(/* Some */[/* Redirect */-158682308], /* Some */[/* Allow */885068905], { });
                            vm.on("console.log", (function (value) {
                                    return Curry._1(send, /* ConsoleChanged */Block.__(1, [value]));
                                  }));
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
        case 3 : 
            return /* Update */Block.__(0, [/* record */[
                        /* code */state[/* code */0],
                        /* jsCode */state[/* jsCode */1],
                        /* console */state[/* console */2],
                        /* activePane */action[0]
                      ]]);
        
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
