import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Root from "./Root";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Root} />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
