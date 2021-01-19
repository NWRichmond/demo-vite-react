import React from "react";
import Canvas from "~/components/Canvas";
import logo from "~/assets/logo.svg";
import "./App.css";
import { useAllCollections } from "~/hooks";

export default function App() {
  const {
    data: { collectionProducts },
    loadingState,
  } = useAllCollections();
  return (
    <div className="App">
      <pre>
        {JSON.stringify(
          loadingState === "done" ? collectionProducts : loadingState,
          null,
          2
        )}
      </pre>
      <Canvas />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
      </header>
    </div>
  );
}
