import React from "react";

const Button = React.lazy(() => import("app2/Button"));

const App = () => {
  return (
    <div>
      <h2>App 1</h2>
      <React.Suspense fallback="Loading Button...">
        <Button />
      </React.Suspense>
    </div>
  );
};

export default App;
