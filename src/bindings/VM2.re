type vm;

[@bs.new] [@bs.module "vm2"]
external makeVM : Js.t({..}) => vm = "NodeVM";
let makeVM = (
    ~console: [`Inherit | `Redirect | `Deny] = `Inherit,
    ~requireExternal: [`Allow | `Deny | `Whitelist(list(string))] = `Deny,
    ~sandbox: Js.t({..})
  ) =>
  makeVM({
    "console": console |> fun | `Inherit  => "inherit"
                              | `Redirect => "redirect"
                              | `Deny     => "off",
    "sandbox",
    "require": {
      "external": requireExternal |> fun | `Allow => true
                                         | `Deny  => false
                                         | `Whitelist(modules) => modules |> Array.of_list |> Obj.magic
    }
  });

[@bs.send.pipe: vm]
external run : (~code: string, ~filename: string) => unit = "";

[@bs.send.pipe: vm]
external onConsoleLog : ([@bs.as "console.log"] _, (string => unit)) => unit = "on";