open Electron;

let window = ref(None);

let createWindow = () => {
  let win = BrowserWindow.make(~width=800, ~height=600, ~pos=`Center, ());

  win |> BrowserWindow.loadURL("file://" ++ Node.Path.join2([%node __dirname] |> Js.Option.getExn, "index.html"));

  window := Some(win);

  win |> BrowserWindow.onClosed(() => window := None);
};

App.onReady(createWindow);
App.onActivate(() => {
  if (window == ref(None)) {
    createWindow();
  }
});