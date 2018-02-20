
let debounce = (f, wait) => {
  let timeout = ref(None);

  x => {
    switch timeout^ {
    | Some(id) =>
        Js.Global.clearTimeout(id);
        timeout := None;
    | None => ()
    };

    timeout := Some(Js.Global.setTimeout(() => {
      timeout := None;
      f(x);
    }, wait));
  };
};