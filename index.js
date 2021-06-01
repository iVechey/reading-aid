import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Recognition from "./Recognition";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Recognition />
  </StrictMode>,
  rootElement
);
