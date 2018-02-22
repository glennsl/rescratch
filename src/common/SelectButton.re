open Rebase;
open Vrroom;

module type Config = {
  type value;
};

module Make(Config: Config) = {
  type item = {
    label: string,
    value: Config.value,
  };

  type state = {
    isMenuOpen: bool
  };

  type action =
    | ButtonClicked
    | OutsideClicked
    | ItemSelected(item)
  ;

  let component = ReasonReact.reducerComponent("SelectButton");
  let make = (~items,
              ~selected,
              ~className          = "",
              ~renderButtonLabel  = item => item.label |> text,
              ~renderItem         = item => item.label |> text,
              ~align              = `Left,
              ~onSelect,
              _:childless) => {
    ...component,

    initialState: () => {
      isMenuOpen: false
    },
    reducer: (action, state) =>
      switch action {
      | ButtonClicked =>
        ReasonReact.Update({ isMenuOpen: !state.isMenuOpen })

      | OutsideClicked =>
        ReasonReact.Update({ isMenuOpen: false })

      | ItemSelected(item) =>
        ReasonReact.UpdateWithSideEffects(
          { isMenuOpen: false },
          _self => onSelect(item.value)
        )
      },

    render: ({ send, state }) =>
      <div className=ClassName.(join(["c-select-button", "s-open" |> if_(state.isMenuOpen), "m-align-right" |> if_(align === `Right)]))>
        <OnClickOutside onClick={() =>send(OutsideClicked)}>
           
          <button className onClick={_e => send(ButtonClicked)}>
            (
              items |> List.find(item => item.value === selected)
                    |> Option.getOrRaise
                    |> renderButtonLabel
            )
          </button>

          <menu>
            <ul>
              <Control.MapList items>
                ...(item =>
                  <li key     = item.label
                      onClick = {_e => send(ItemSelected(item))} >
                    (renderItem(item))
                  </li>
                )
              </Control.MapList>
            </ul>
          </menu>

        </OnClickOutside>
      </div>
  };
};