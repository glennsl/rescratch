type t;

type options;
[@bs.obj]
external options : (
  ~cwd: string=?,
  ~encoding: string=?,
  ~shell: Js.boolean=?,
  unit)
  => options = "";


[@bs.module "child_process"]
external spawn : (string, ~args:array(string), ~options:options) => t = "";

[@bs.send.pipe: t]
external onClose : ([@bs.as "close"] _, (~code: int, ~signal: string) => unit) => unit = "on";

[@bs.send.pipe: t]
external onDisconnect : ([@bs.as "disconnect"] _, unit => unit) => unit = "on";

[@bs.send.pipe: t]
external onError : ([@bs.as "error"] _, Js.Exn.t => unit) => unit = "on";

[@bs.send.pipe: t]
external onExit : ([@bs.as "exit"] _, (~code: int, ~signal: string) => unit) => unit = "on";

/*
[@bs.send.pipe: t]
external onMessage : ([@bs.as "message"] _, (~message: Js.Json.t, ~sendHandle: handle) => unit) => unit = "on";
*/

module ReadableStream = {
  type t;

  [@bs.send.pipe: t]
  external onClose : ([@bs.as "close"] _, unit => unit) => unit = "on";

  [@bs.send.pipe: t]
  external onData : ([@bs.as "data"] _, string => unit) => unit = "on"; /* assume it's string, but could be anything */

  [@bs.send.pipe: t]
  external onEnd : ([@bs.as "close"] _, unit => unit) => unit = "on";

  [@bs.send.pipe: t]
  external onError : ([@bs.as "error"] _, Js.Exn.t => unit) => unit = "on";

  [@bs.send.pipe: t]
  external onReadable : ([@bs.as "readable"] _, unit => unit) => unit = "on";
};

[@bs.get]
external stderr : t => ReadableStream.t = "";

[@bs.get]
external stdout : t => ReadableStream.t = "";