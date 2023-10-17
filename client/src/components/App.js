import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProviderPage from "./ProviderPage";

function App() {
  return (
    <div>
      <h1>Project Client</h1>
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ProviderPage} />
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
