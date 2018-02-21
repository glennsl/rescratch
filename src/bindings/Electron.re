
module App = {
  [@bs.module "electron"] [@bs.scope "app"]
  external onReady : ([@bs.as "ready"] _, unit => unit) => unit = "on";

  [@bs.module "electron"] [@bs.scope "app"]
  external onActivate : ([@bs.as "activate"] _, unit => unit) => unit = "on";

  [@bs.module "electron"] [@bs.scope "app"]
  external onWindowAllClosed : ([@bs.as "window-all-closed"] _, unit => unit) => unit = "on";

  [@bs.module "electron"] [@bs.scope "app"]
  external quit : unit => unit = "";

  [@bs.module "electron"] [@bs.scope "app"]
  external getAppPath : unit => string = "";

  [@bs.module "electron"] [@bs.scope "app"]
  external getPath : string => string = "";
  let getPath = name =>
    getPath(
      switch name {
      | `Home       => "home"
      | `AppData    => "appData"
      | `UserData   => "userData"
      | `Temp       => "temp"
      | `Exe        => "exe"
      | `Module     => "module"
      | `Desktop    => "desktop"
      | `Documents  => "documents"
      | `Downloads  => "downloads"
      | `Music      => "music"
      | `Pictures   => "pictures"
      | `Videos     => "videos"
      | `Logs       => "logs"
      | `Flash      => "pepperFlashSystemPlugin" 
      }
    )
};
module Remote = {
  module App = {
    [@bs.module "electron"] [@bs.scope ("remote", "app")]
    external getAppPath : unit => string = "";

    [@bs.module "electron"] [@bs.scope ("remote", "app")]
    external getPath : string => string = "";
    let getPath = name =>
      getPath(
        switch name {
        | `Home       => "home"
        | `AppData    => "appData"
        | `UserData   => "userData"
        | `Temp       => "temp"
        | `Exe        => "exe"
        | `Module     => "module"
        | `Desktop    => "desktop"
        | `Documents  => "documents"
        | `Downloads  => "downloads"
        | `Music      => "music"
        | `Pictures   => "pictures"
        | `Videos     => "videos"
        | `Logs       => "logs"
        | `Flash      => "pepperFlashSystemPlugin" 
        }
      )
  };
};

module BrowserWindow = {
  type t;

  [@bs.module "electron"] [@bs.new]
  external make : Js.t({..}) => t = "BrowserWindow";
  let make = (
        ~width=?,
        ~height=?,
        ~pos=`Default,
        ~autoHideMenuBar=false,
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
                           | _       => Js.Nullable.undefined,
      "autoHideMenuBar": Js.Boolean.to_js_boolean(autoHideMenuBar)
    });
  
  [@bs.send.pipe: t]
  external loadURL : string => unit = "";

  [@bs.send.pipe: t]
  external onClosed : ([@bs.as "closed"] _, unit => unit) => unit = "on";
}
