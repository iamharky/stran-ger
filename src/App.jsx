import React from "react";
import ContextProvider from "./Context";
import Home from "./pages/Home";
import Player from "./components/Player";

const App = () => {
  return (
    <ContextProvider>
      <Home />
      <Player />
      {process.env.REACT_APP_API_ACCESS_KEY}
    </ContextProvider>
  )
}

export default App;
