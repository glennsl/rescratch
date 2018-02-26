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
var Console = require("./Console.bs.js");
var Process = require("process");
var Terminal = require("./Terminal.bs.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var StatusBar = require("./StatusBar.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var DomContainer = require("./DomContainer.bs.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

var appRoot = Process.cwd();

var component = ReasonReact.reducerComponent("App");

function make(projectPath, execute, output, _) {
  var sourceFilename = Path.join(projectPath, "src", "main.re");
  var jsFilename = Path.join(projectPath, "lib", "js", "src", "main.js");
  var loadTemplate = function (template, callback) {
    var templatePath = Path.join(appRoot, "templates", template);
    return Curry._2(execute, "rm -rf \"" + (String(projectPath) + "/*\""), (function () {
                  return Curry._2(execute, "cp -R \"" + (String(templatePath) + ("/.\" \"" + (String(projectPath) + "\""))), (function () {
                                return Curry._2(execute, "npm install", (function () {
                                              return Curry._2(execute, "npm link bs-platform", (function () {
                                                            return Curry._1(callback, /* () */0);
                                                          }));
                                            }));
                              }));
                }));
  };
  var getCode = function ($$return) {
    var exit = 0;
    var code;
    try {
      code = Fs.readFileSync(sourceFilename, "utf8");
      exit = 1;
    }
    catch (exn){
      return loadTemplate("default", (function () {
                    var exit = 0;
                    var code;
                    try {
                      code = Fs.readFileSync(sourceFilename, "utf8");
                      exit = 1;
                    }
                    catch (exn){
                      return Curry._1($$return, "Fatal error occurred reading curent project");
                    }
                    if (exit === 1) {
                      return Curry._1($$return, code);
                    }
                    
                  }));
    }
    if (exit === 1) {
      return Curry._1($$return, code);
    }
    
  };
  var persist = function (code) {
    Fs.writeFileSync(sourceFilename, code, "utf8");
    return /* () */0;
  };
  var compile = function ($$return) {
    try {
      return Curry._2(execute, "bsb -make-world", (function () {
                    return Curry._1($$return, Fs.readFileSync(jsFilename, "utf8"));
                  }));
    }
    catch (raw_exn){
      var exn = Js_exn.internalToOCamlException(raw_exn);
      if (exn[0] === Js_exn.$$Error) {
        return Curry._1($$return, Js_option.getExn(Js_primitive.undefined_to_opt(exn[1].message)));
      } else {
        throw exn;
      }
    }
  };
  var persistAndCompile = Utils.debounce((function (param) {
          persist(param[0]);
          return compile(param[1]);
        }), 400);
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (self) {
      getCode((function (code) {
              return Curry._1(self[/* send */4], /* CodeChanged */Block.__(0, [code]));
            }));
      return /* NoUpdate */0;
    });
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
      var match = state[/* activePane */3];
      return React.createElement("div", {
                  className: "app"
                }, React.createElement("div", {
                      className: "main"
                    }, ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* code */0], /* Some */[/* RE */18355], /* None */0, /* None */0, /* None */0, /* Some */[(function (code) {
                                  return Curry._1(send, /* CodeChanged */Block.__(0, [code]));
                                })], /* array */[])), match !== -433646793 ? (
                        match !== 16617 ? Vrroom.nothing : ReasonReact.element(/* None */0, /* None */0, Editor.make(state[/* jsCode */1], /* Some */[/* JS */16585], /* None */0, /* Some */[/* false */0], /* None */0, /* None */0, /* array */[]))
                      ) : ReasonReact.element(/* None */0, /* None */0, Console.make(state[/* console */2], /* array */[])), React.createElement("div", {
                          className: Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                                "dom",
                                /* :: */[
                                  Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], +(state[/* activePane */3] === /* Dom */3406434), "s-selected"),
                                  /* [] */0
                                ]
                              ])
                        }, ReasonReact.element(/* None */0, /* None */0, DomContainer.make((function () {
                                    return Curry._1(send, /* PaneUpdated */Block.__(6, [/* Dom */3406434]));
                                  }), /* array */[]))), React.createElement("div", {
                          className: Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                                "terminal",
                                /* :: */[
                                  Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], +(state[/* activePane */3] === /* Terminal */-912466532), "s-selected"),
                                  /* [] */0
                                ]
                              ])
                        }, ReasonReact.element(/* None */0, /* None */0, Terminal.make(execute, output, /* array */[])))), ReasonReact.element(/* None */0, /* None */0, StatusBar.make(projectPath, /* :: */[
                          "default",
                          /* :: */[
                            "json",
                            /* :: */[
                              "react",
                              /* [] */0
                            ]
                          ]
                        ], state[/* consoleUpdated */4], state[/* domUpdated */5], state[/* terminalUpdated */6], (function (template) {
                            return Curry._1(send, /* TemplateSelected */Block.__(3, [template]));
                          }), state[/* activePane */3], (function (pane) {
                            return Curry._1(send, /* PaneSelected */Block.__(5, [pane]));
                          }), /* array */[])));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* code */"",
              /* jsCode */"",
              /* console */"",
              /* activePane : Console */-433646793,
              /* consoleUpdated : false */0,
              /* domUpdated : false */0,
              /* terminalUpdated : false */0
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      switch (action.tag | 0) {
        case 0 : 
            var code = action[0];
            var newrecord = state.slice();
            return /* UpdateWithSideEffects */Block.__(3, [
                      (newrecord[/* code */0] = code, newrecord),
                      (function (param) {
                          var send = param[/* send */4];
                          return Curry._1(persistAndCompile, /* tuple */[
                                      code,
                                      (function (result) {
                                          return Curry._1(send, /* CompileCompleted */Block.__(2, [result]));
                                        })
                                    ]);
                        })
                    ]);
        case 1 : 
            var newrecord$1 = state.slice();
            return /* UpdateWithSideEffects */Block.__(3, [
                      (newrecord$1[/* console */2] = state[/* console */2] + ("\n" + action[0]), newrecord$1),
                      (function (self) {
                          return Curry._1(self[/* send */4], /* PaneUpdated */Block.__(6, [/* Console */-433646793]));
                        })
                    ]);
        case 2 : 
            var jsCode = action[0];
            return /* UpdateWithSideEffects */Block.__(3, [
                      /* record */[
                        /* code */state[/* code */0],
                        /* jsCode */jsCode,
                        /* console */"",
                        /* activePane */state[/* activePane */3],
                        /* consoleUpdated */state[/* consoleUpdated */4],
                        /* domUpdated */state[/* domUpdated */5],
                        /* terminalUpdated */state[/* terminalUpdated */6]
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
            var template = action[0];
            var newrecord$2 = state.slice();
            return /* UpdateWithSideEffects */Block.__(3, [
                      (newrecord$2[/* activePane */3] = /* Terminal */-912466532, newrecord$2),
                      (function (self) {
                          return loadTemplate(template, (function () {
                                        return getCode((function (code) {
                                                      return Curry._1(self[/* send */4], /* TemplateLoaded */Block.__(4, [code]));
                                                    }));
                                      }));
                        })
                    ]);
        case 4 : 
            var newrecord$3 = state.slice();
            return /* UpdateWithSideEffects */Block.__(3, [
                      (newrecord$3[/* code */0] = action[0], newrecord$3),
                      (function (param) {
                          var send = param[/* send */4];
                          return compile((function (result) {
                                        return Curry._1(send, /* CompileCompleted */Block.__(2, [result]));
                                      }));
                        })
                    ]);
        case 5 : 
            var pane = action[0];
            if (pane >= 16617) {
              if (pane >= 3406434) {
                return /* Update */Block.__(0, [/* record */[
                            /* code */state[/* code */0],
                            /* jsCode */state[/* jsCode */1],
                            /* console */state[/* console */2],
                            /* activePane */pane,
                            /* consoleUpdated */state[/* consoleUpdated */4],
                            /* domUpdated : false */0,
                            /* terminalUpdated */state[/* terminalUpdated */6]
                          ]]);
              } else {
                var newrecord$4 = state.slice();
                return /* Update */Block.__(0, [(newrecord$4[/* activePane */3] = pane, newrecord$4)]);
              }
            } else if (pane >= -433646793) {
              return /* Update */Block.__(0, [/* record */[
                          /* code */state[/* code */0],
                          /* jsCode */state[/* jsCode */1],
                          /* console */state[/* console */2],
                          /* activePane */pane,
                          /* consoleUpdated : false */0,
                          /* domUpdated */state[/* domUpdated */5],
                          /* terminalUpdated */state[/* terminalUpdated */6]
                        ]]);
            } else {
              return /* Update */Block.__(0, [/* record */[
                          /* code */state[/* code */0],
                          /* jsCode */state[/* jsCode */1],
                          /* console */state[/* console */2],
                          /* activePane */pane,
                          /* consoleUpdated */state[/* consoleUpdated */4],
                          /* domUpdated */state[/* domUpdated */5],
                          /* terminalUpdated : false */0
                        ]]);
            }
            break;
        case 6 : 
            var pane$1 = action[0];
            if (pane$1 === state[/* activePane */3]) {
              return /* NoUpdate */0;
            } else if (pane$1 >= 16617) {
              if (pane$1 >= 3406434) {
                var newrecord$5 = state.slice();
                return /* Update */Block.__(0, [(newrecord$5[/* domUpdated */5] = /* true */1, newrecord$5)]);
              } else {
                return /* NoUpdate */0;
              }
            } else if (pane$1 >= -433646793) {
              var newrecord$6 = state.slice();
              return /* Update */Block.__(0, [(newrecord$6[/* consoleUpdated */4] = /* true */1, newrecord$6)]);
            } else {
              var newrecord$7 = state.slice();
              return /* Update */Block.__(0, [(newrecord$7[/* terminalUpdated */6] = /* true */1, newrecord$7)]);
            }
            break;
        
      }
    });
  return newrecord;
}

exports.appRoot = appRoot;
exports.component = component;
exports.make = make;
/* appRoot Not a pure module */
