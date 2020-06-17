import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Property from "./pages/Property";
import Results from "./pages/Results";
import PrivateRoute from "./components/PrivateRoute";
import { authenticate } from "./functions/auth";
import AddProperty from "./pages/AddProperty";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    authenticate(setIsAuth); // calling the function and changing the state
  }, []); // [ ] = list of dependencies
  return (
    <Router>
      <div className="App">
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <Switch>
          <Route exact path="/" component={(props) => <Home />}></Route>
          <Route path="/signup" component={(props) => <Signup />}></Route>
          <Route path="/results" component={(props) => <Results />}></Route>
          <Route
            path="/login"
            component={(props) => <Login setIsAuth={setIsAuth} />}
          ></Route>
          <PrivateRoute
            path="/profile"
            isAuth={isAuth}
            component={(props) => <Profile />}
          ></PrivateRoute>
          <PrivateRoute
            path="/property/:id"
            component={(props) => <Property {...props} />}
          />
          <PrivateRoute
            path="/property/create"
            isAuth={isAuth}
            component={(props) => <AddProperty />}
          ></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
