open! Rebase;
open ReasonReact;
open! Vrroom;


let default = {|
/* Based on https://rosettacode.org/wiki/FizzBuzz#OCaml */
let fizzbuzz = (i) =>
  switch (i mod 3, i mod 5) {
  | (0, 0) => "FizzBuzz"
  | (0, _) => "Fizz"
  | (_, 0) => "Buzz"
  | _ => string_of_int(i)
  };

for (i in 1 to 100) {
  Js.log(fizzbuzz(i))
};
|};

type state = {
  code: string,
  output: string
};

type action =
  | CodeChanged(string)
  | OutputChanged(string);

let component = reducerComponent("App");
let make = _children => {
  ...component,

  initialState: () => {
    code: default,
    output: "No output yet"
  },
  reducer: (action, state) =>
    switch action {
    | CodeChanged(code) => Update({ ...state, code })
    | OutputChanged(output) => Update({ ...state, output })
    },

  render: ({ state, send }) =>
    <div className="app">
      <Editor value=state.code onChange=(code => send(CodeChanged(code))) lang=`RE />
      <div className="output">
        {state.output |> text}
      </div>
    </div>
};