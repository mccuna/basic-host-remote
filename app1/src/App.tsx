import React from "react";

const RemoteButton2 = React.lazy(() => import("app2/Button"));
const RemoteButton3 = React.lazy(() => import("app3/Button"));

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>App 1</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton2 />
      <RemoteButton3 />
    </React.Suspense>
  </div>
);

export default App;
