'use strict';

var Fs = require("fs");
var Json = require("@glennsl/bs-json/src/Json.bs.js");
var Path = require("path");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var Vrroom = require("vrroom/src/Vrroom.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var OnClickOutside = require("./common/OnClickOutside.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var component = ReasonReact.reducerComponent("DependencyList");

function make(projectPath, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var send = param[/* send */4];
      var state = param[/* state */2];
      var match = state[/* items */1];
      var tmp;
      tmp = typeof match === "number" ? (
          match ? Vrroom.text("Loading...") : Vrroom.nothing
        ) : (
          match.tag ? Vrroom.text(match[0]) : ReasonReact.element(/* None */0, /* None */0, Curry._3(Vrroom.Control[/* MapList */1][/* make */1], match[0], /* None */0, (function (item) {
                        return React.createElement("li", {
                                    key: item[/* label */0]
                                  }, Vrroom.text(item[/* label */0]));
                      })))
        );
      return React.createElement("div", {
                  className: Curry._1(Vrroom.Helpers[/* ClassName */5][/* join */0], /* :: */[
                        "c-dependency-list",
                        /* :: */[
                          Curry._2(Vrroom.Helpers[/* ClassName */5][/* if_ */1], state[/* isMenuOpen */0], "s-open"),
                          /* [] */0
                        ]
                      ])
                }, ReasonReact.element(/* None */0, /* None */0, OnClickOutside.make((function () {
                            return Curry._1(send, /* OutsideClicked */1);
                          }), /* array */[
                          React.createElement("button", {
                                onClick: (function () {
                                    return Curry._1(send, /* ButtonClicked */0);
                                  })
                              }, Vrroom.text("Dependencies")),
                          React.createElement("ul", undefined, tmp)
                        ])));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* isMenuOpen : false */0,
              /* items : NotLoaded */0
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (typeof action === "number") {
        if (state[/* isMenuOpen */0]) {
          return /* Update */Block.__(0, [/* record */[
                      /* isMenuOpen : false */0,
                      /* items */state[/* items */1]
                    ]]);
        } else if (action !== 0) {
          throw [
                Caml_builtin_exceptions.match_failure,
                [
                  "DependencyList.re",
                  60,
                  6
                ]
              ];
        } else if (state[/* isMenuOpen */0]) {
          throw [
                Caml_builtin_exceptions.match_failure,
                [
                  "DependencyList.re",
                  60,
                  6
                ]
              ];
        } else {
          return /* UpdateWithSideEffects */Block.__(3, [
                    /* record */[
                      /* isMenuOpen : true */1,
                      /* items : Loading */1
                    ],
                    (function (self) {
                        var $$return = function (items) {
                          return Curry._1(self[/* send */4], /* ItemsLoaded */[items]);
                        };
                        try {
                          var json = Json.parseOrRaise(Fs.readFileSync(Path.join(projectPath, "bsconfig.json"), "utf8"));
                          var dependencies = Rebase.List[/* map */0]((function (name) {
                                  return /* record */[
                                          /* label */name,
                                          /* installed : true */1
                                        ];
                                }), Rebase.Option[/* getOr */16](/* [] */0, Json_decode.optional((function (param) {
                                          return Json_decode.field("bs-dependencies", (function (param) {
                                                        return Json_decode.list(Json_decode.string, param);
                                                      }), param);
                                        }), json)));
                          return Curry._1($$return, /* Ok */Block.__(0, [dependencies]));
                        }
                        catch (raw_e){
                          var e = Js_exn.internalToOCamlException(raw_e);
                          if (e[0] === Js_exn.$$Error) {
                            return Curry._1($$return, /* Error */Block.__(1, [Rebase.Option[/* getOrRaise */17](Js_primitive.undefined_to_opt(e[1].message))]));
                          } else {
                            return Curry._1($$return, /* Error */Block.__(1, ["Error: " + String(e)]));
                          }
                        }
                      })
                  ]);
        }
      } else {
        var items = action[0];
        var tmp;
        tmp = items.tag ? /* Error */Block.__(1, [items[0]]) : /* Loaded */Block.__(0, [items[0]]);
        return /* Update */Block.__(0, [/* record */[
                    /* isMenuOpen */state[/* isMenuOpen */0],
                    /* items */tmp
                  ]]);
      }
    });
  return newrecord;
}

exports.component = component;
exports.make = make;
/* component Not a pure module */
