open Rebase;
open ReasonReact;
open Vrroom;

type item = {
  label: string,
  installed: bool
};

type loadState =
  | NotLoaded
  | Loading
  | Loaded(list(item))
  | Error(string);

type state = {
  isMenuOpen: bool,
  items: loadState
};

type action =
  | ButtonClicked
  | OutsideClicked
  | ItemsLoaded(result(list(item), string))
;

let component = reducerComponent("DependencyList");
let make = (~projectPath, _:childless) => {

  let loadItems = return => {
    try {
      let json =
        Node.Path.join2(projectPath, "bsconfig.json")
        |> Node.Fs.readFileAsUtf8Sync
        |> Json.parseOrRaise;

      let dependencies =
        json |> Json.Decode.(optional(field("bs-dependencies", list(string))))
             |> Option.getOr([])
             |> List.map(name => {
                  label: name,
                  installed: true /* TODO */
                });

      return(Ok(dependencies));
    } {
    | Js.Exn.Error(e) => return(Error(e |> Js.Exn.message |> Option.getOrRaise))
    | e => return(Error("Error: " ++ Js.String.make(e)))
    }
  };

  {
    ...component,

    initialState: () => {
      isMenuOpen: false,
      items: NotLoaded
    },
    reducer: (action, state) =>
      switch action {
      | OutsideClicked
      | ButtonClicked when state.isMenuOpen =>
        Update({ ...state, isMenuOpen: false })
      | ButtonClicked when !state.isMenuOpen =>
        UpdateWithSideEffects(
          { isMenuOpen: true, items: Loading },
          self => loadItems(items => self.send(ItemsLoaded(items)))
        )

      | ItemsLoaded(items) =>
        Update({ 
          ...state, 
          items:
            switch items {
            | Ok(items)       => Loaded(items)
            | Error(message)  => Error(message)
            }
        })
        
      },

    render: ({ send, state }) =>
      <div className=ClassName.(join(["c-dependency-list", "s-open" |> if_(state.isMenuOpen)]))>
        <OnClickOutside onClick={() =>send(OutsideClicked)}>
            
          <button onClick={_e => send(ButtonClicked)}>
            {"Dependencies" |> text}
          </button>

          <ul>
            {switch state.items {
            | NotLoaded       => nothing
            | Loading         => "Loading..." |> text
            | Error(message)  => message |> text
            | Loaded(items)   =>
              <Control.MapList items>
                ...(item =>
                  <li key=item.label>
                    {item.label |> text}
                  </li>
                )
              </Control.MapList>
            }}
          </ul>

        </OnClickOutside>
      </div>
  }
};