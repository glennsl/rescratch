open! Rebase;
open! Vrroom;

let component = ReasonReact.statelessComponent("App");

let make = _children => {
  ...component,

  render: _self =>
    <div> 
      {"Hello World" |> text}
    </div>
};