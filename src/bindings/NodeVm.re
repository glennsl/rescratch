
type context;

[@bs.val] [@bs.module "vm"] external createContext : Js.t({..}) => context = "";
[@bs.val] [@bs.module "vm"] external runInContext : (string, context) => unit = "";