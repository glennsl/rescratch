type line = {
  start: point,
  end_: point,
  thickness: option(int),
}
and point = {
  x: float,
  y: float,
};

module Decode = {
  let point = json => {
    open! Json.Decode;
    {
      x: json |> field("x", float),
      y: json |> field("y", float)
    };
  };
  let line = json =>
    Json.Decode.{
      start:      json |> field("start", point),
      end_:       json |> field("end", point),
      thickness:  json |> optional(field("thickness", int)),
    };
};

let data = {| {
  "start": { "x": 1.1, "y": -0.4 },
  "end":   { "x": 5.3, "y": 3.8 }
} |};

data |> Json.parseOrRaise
     |> Decode.line
     |> Js.log;