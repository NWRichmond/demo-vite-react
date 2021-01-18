import React from "react";
import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element is null.");
}

export function renderPage(Tree: React.ElementType) {
  ReactDOM.render(
    <React.StrictMode>
      <Tree />
    </React.StrictMode>,
    rootElement
  );
}
