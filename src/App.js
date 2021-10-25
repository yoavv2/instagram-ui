import "./styles/App.scss";
import { createContext, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { me } from "./service/user.service";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Feed from "./pages/Feed/Feed";
import Navigation from "./Navigation/Navigation";

export const UserContext = createContext();

function App() {
  // const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("loggedIn"));

  const history = useHistory();
  const [user, setUser] = useState({});

  // * const currentURL = window.location.href; // returns the absolute URL of a page
  const pathname = window.location.pathname; //returns the current url minus the domain name

  useEffect(() => {
    me()
      .then((loggedUser) => {
        if (!isLoggedIn(loggedUser) && pathname === "/") {
          history.push("/login");
          return;
        }
        console.log(`Here`);
        setUser(loggedUser);
      })
      .catch((err) => console.log(err));
  }, [history, pathname]);

  function isLoggedIn(user) {
    return user.hasOwnProperty("_id");
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        {isLoggedIn(user) && <Navigation />}
        <Switch>
          <Route
            className="app-form"
            exact
            path="/register"
            component={Register}
          />
          <Route className="app-form" exact path="/login" component={Login} />
          <Route exact path="/" component={Feed} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
