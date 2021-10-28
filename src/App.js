import "./styles/App.scss";
import { createContext, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { me } from "./service/user.service";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Feed from "./pages/Feed/Feed";
import Navigation from "./Navigation/Navigation";
import CreatePost from "./pages/CreatePost/CreatePost";

export const UserContext = createContext();

function App() {
  // const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("loggedIn"));

  const history = useHistory();
  const [user, setUser] = useState({});

  // * const currentURL = window.location.href; // returns the absolute URL of a page
  const location = history.location; //returns the current url minus the domain name

  useEffect(() => {
    me()
      .then((loggedUser) => {
        if (!isLoggedIn(loggedUser) && location === "/") {
          history.push("/login");
          return;
        }

        setUser(loggedUser);
      })
      .catch((err) => console.log(err));
  }, [history, location]);

  function isLoggedIn(user) {
    return user.hasOwnProperty("_id");
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        {isLoggedIn(user) && <Navigation className="navbar" />}
        <Switch>
          <Route
            className="app-form"
            exact
            path="/register"
            component={Register}
          />
          <Route className="app-form" exact path="/login" component={Login} />
          <Route
            className="create-post"
            exact
            path="/post/create"
            component={CreatePost}
          ></Route>
          <Route exact path="/" component={Feed} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
