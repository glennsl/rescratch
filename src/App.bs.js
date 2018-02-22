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
var Terminal = require("./Terminal.bs.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var StatusBar = require("./StatusBar.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

var appRoot = Process.cwd();

var component = ReasonReact.reducerComponent("App");

function make(projectPath, execute, output, _) {
  var sourceFilename = Path.join(projectPath, "src", "main.re");
  var jsFilename = Path.join(projectPath, "lib", "js", "src", "main.js");
  var loadTemplate = function (template, callback) {
    var templatePath = Path.join(appRoot, "templates", template);
    return Curry._2(execute, "rm -rf *", (function () {
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
  var persistAndCompile = Utils.debounce((function (param) {
          persist(param[0]);
          var $$return = param[1];
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
        }), 600);
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
                                  Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], +(state[/* activePane */3] === /* Terminal */-912466532), "s-selected"),
                                  /* [] */0
                                ]
                              ])
                        }, ReasonReact.element(/* None */0, /* None */0, Terminal.make(execute, output, /* array */[])))), ReasonReact.element(/* None */0, /* None */0, StatusBar.make(/* :: */[
                          "default",
                          /* :: */[
                            "json",
                            /* :: */[
                              "react",
                              /* [] */0
                            ]
                          ]
                        ], (function (template) {
                            return Curry._1(send, /* TemplateSelected */Block.__(3, [template]));
                          }), state[/* activePane */3], (function (pane) {
                            return Curry._1(send, /* PaneSelected */Block.__(4, [pane]));
                          }), /* array */[])));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* code */"",
              /* jsCode */"",
              /* console */"",
              /* activePane : Console */-433646793
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
                          return Curry._1(persistAndCompile, /* tuple */[
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
                        /* activePane : Console */-433646793
                      ]]);
        case 2 : 
            var jsCode = action[0];
            return /* UpdateWithSideEffects */Block.__(3, [
                      /* record */[
                        /* code */state[/* code */0],
                        /* jsCode */jsCode,
                        /* console */"",
                        /* activePane : Dom */3406434
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
            return /* UpdateWithSideEffects */Block.__(3, [
                      /* record */[
                        /* code */state[/* code */0],
                        /* jsCode */state[/* jsCode */1],
                        /* console */state[/* console */2],
                        /* activePane : Terminal */-912466532
                      ],
                      (function (self) {
                          return loadTemplate(template, (function () {
                                        return getCode((function (code) {
                                                      return Curry._1(self[/* send */4], /* CodeChanged */Block.__(0, [code]));
                                                    }));
                                      }));
                        })
                    ]);
        case 4 : 
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
exports.component = component;
exports.make = make;
/* appRoot Not a pure module */
