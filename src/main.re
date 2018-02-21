open Electron;

let window = ref(None);

let createWindow = () => {

  let windowState = WindowState.get({
    "defaultWidth": 800,
    "defaultHeight": 600
  });

  let win = BrowserWindow.make(
    ~width=windowState##width,
    ~height=windowState##height,
    ~pos=`Pos(windowState##x, windowState##y),
    ~autoHideMenuBar=true,
  ());

  win |> BrowserWindow.loadURL("file://" ++ Node.Path.join2([%node __dirname] |> Js.Option.getExn, "index.html"));

  window := Some(win);

  win |> BrowserWindow.onClosed(() => window := None);

  windowState |> WindowState.manage(win);
};

App.onReady(createWindow);
App.onActivate(() => {
  if (window == ref(None)) {
    createWindow();
  }
});