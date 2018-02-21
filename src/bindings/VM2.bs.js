'use strict';

var Vm2 = require("vm2");
var $$Array = require("bs-platform/lib/js/array.js");

function makeVM($staropt$star, $staropt$star$1, sandbox) {
  var $$console = $staropt$star ? $staropt$star[0] : /* Inherit */-72987685;
  var requireExternal = $staropt$star$1 ? $staropt$star$1[0] : /* Deny */759137836;
  return new Vm2.NodeVM({
              console: $$console !== -72987685 ? (
                  $$console >= 759137836 ? "off" : "redirect"
                ) : "inherit",
              sandbox: sandbox,
              require: {
                external: typeof requireExternal === "number" ? (
                    requireExternal >= 885068905 ? /* true */1 : /* false */0
                  ) : $$Array.of_list(requireExternal[1])
              }
            });
}

exports.makeVM = makeVM;
/* vm2 Not a pure module */
