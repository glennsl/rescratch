'use strict';

var App = require("./App.bs.js");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

ReactDOMRe.renderToElementWithId(ReasonReact.element(/* None */0, /* None */0, App.make(/* array */[])), "root");

/*  Not a pure module */
