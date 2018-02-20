
module App = {
  [@bs.module "electron"] [@bs.scope "app"]
  external onReady : ([@bs.as "ready"] _, unit => unit) => unit = "on";

  [@bs.module "electron"] [@bs.scope "app"]
  external onActivate : ([@bs.as "activate"] _, unit => unit) => unit = "on";

  [@bs.module "electron"] [@bs.scope "app"]
  external onWindowAllClosed : ([@bs.as "window-all-closed"] _, unit => unit) => unit = "on";

  [@bs.module "electron"] [@bs.scope "app"]
  external quit : unit => unit = "";
};

module BrowserWindow = {
  type t;

  [@bs.module "electron"] [@bs.new]
  external make : Js.t({..}) => t = "BrowserWindow";
  let make = (
        ~width=?,
        ~height=?,
        ~pos=`Default,
        ()
      ) =>
    make({
      "width":  width |> Js.Nullable.from_opt,
      "height": height |> Js.Nullable.from_opt,
      "x": pos |> fun | `Pos(x, _) => x |> Js.Nullable.return
                      | _          => Js.Nullable.undefined,
      "y": pos |> fun | `Pos(_, y) => y |> Js.Nullable.return
                      | _          => Js.Nullable.undefined,
      "center": pos |> fun | `Center => Js.true_ |> Js.Nullable.return
                           | _       => Js.Nullable.undefined
    });
  
  [@bs.send.pipe: t]
  external loadURL : string => unit = "";

  [@bs.send.pipe: t]
  external onClosed : ([@bs.as "closed"] _, unit => unit) => unit = "on";
}
