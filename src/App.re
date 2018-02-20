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
  code: string
};

type action =
  | CodeUpdated(string);

let component = reducerComponent("App");
let make = _children => {
  ...component,

  initialState: () => {
    code: default
  },
  reducer: (action, _state) =>
    switch action {
    | CodeUpdated(code) => Update({ code: code })
    },

  render: ({ state, send }) =>
    <Editor value=state.code onChange=(code => send(CodeUpdated(code))) lang=`RE />
};