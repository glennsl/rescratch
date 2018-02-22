let projectPath = Node.Path.join2(Electron.Remote.App.getPath(`UserData), "current");

ReactDOMRe.renderToElementWithId(
  <ExecutionEnvironment dir=projectPath>
    ...((~execute, ~output) => <App projectPath execute output />)
  </ExecutionEnvironment>,
  "root");