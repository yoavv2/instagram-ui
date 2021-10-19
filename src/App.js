import "./styles/App.scss";
import {createContext, useEffect, useState} from 'react'
import {Route, Switch, useHistory} from 'react-router-dom';



import { me } from './service/user.service';

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Feed from "./pages/Feed/Feed";
import Navigation from "./Navigation/Navigation"




export const UserContext = createContext();

function App() {
 
  // const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("loggedIn"));


  const history = useHistory();
  const [user, setUser] = useState({});

   useEffect(() => {
      me()
          .then(loggedUser => {
              if (!isLoggedIn(loggedUser)) {
                  history.push('/login');
                  return;
              }
              setUser(loggedUser);
          })
          .catch(err => console.log(err));
  }, [history]);

  function isLoggedIn(user) {
      return user.hasOwnProperty('_id');
  }

  return (
     <UserContext.Provider value={{user, setUser}}>
      <div className="App">
          { isLoggedIn(user) && <Navigation /> }
        <Switch>
              <Route className="app-form" path="/register">
                  <Register />
              </Route>
              <Route className="app-form"  path="/login">
                  <Login />
              </Route>
              <Route path="/">
                  <Feed />
              </Route>
          </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
