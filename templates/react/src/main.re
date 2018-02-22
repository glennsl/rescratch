open ReasonReact;

module Counter = {
  let component = reducerComponent("Counter");
  let make = _children => {
    ...component,
    
    initialState: () => 0,
    reducer: (`Increment, count) => Update(count + 1),
    
    render: self =>
      <button onClick=(_e => self.send(`Increment))>
        {self.state |> string_of_int |> stringToElement}
      </button>
  };
};
  
ReactDOMRe.renderToElementWithId(<Counter />, "dom-root");