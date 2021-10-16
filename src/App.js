import { createContext, useState } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import "./styles/App.scss";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

export const UserContext = createContext();

function App() {
  // const UserContext = createContext({ loggedIn: false });
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("loggedIn"));

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <div className="App">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
