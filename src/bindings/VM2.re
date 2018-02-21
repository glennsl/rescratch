type vm;

[@bs.new] [@bs.module "vm2"]
external makeVM : Js.t({..}) => vm = "NodeVM";
let makeVM = (
    ~requireExternal: [`Allow | `Deny | `Whitelist(list(string))] =`Deny,
    ~sandbox: Js.t({..})
  ) =>
  makeVM({
    "sandbox",
    "require": {
      "external": requireExternal |> fun | `Allow => true
                                         | `Deny  => false
                                         | `Whitelist(modules) => modules |> Array.of_list |> Obj.magic
    }
  });

[@bs.send.pipe: vm]
external run : (~code: string, ~filename: string) => unit = "";
