type t = {.
  "x":      int, /* TODO: can be undefined? */
  "y":      int, /* TODO: can be undefined? */
  "width":  int,
  "height": int
};

[@bs.module]
external get : {. "defaultWidth": int, "defaultHeight": int } => t = "electron-window-state";

[@bs.send.pipe: t]
external manage : Electron.BrowserWindow.t => unit = "";