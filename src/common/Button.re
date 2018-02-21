open Vrroom;
module Styles = ButtonStyles;

let component = ReasonReact.statelessComponent("Button");
let make = (~label,
            ~icon=nothing,
            ~style=`Normal,
            ~alignIcon=`Left,
            ~className="",
            ~onClick,
            _:childless) => {
  ...component,

  render: _self =>
    <button className = ClassName.join(["c-button", className])
            onClick   = (_e => onClick()) >

      (alignIcon === `Left ? icon : nothing)
      <span className="label"> {label |> text} </span>
      (alignIcon === `Right ? icon : nothing)

    </button>
};