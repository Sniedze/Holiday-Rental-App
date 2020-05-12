import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={props => <Home />}></Route>
          <Route path="/signup" component={props => <Signup />}></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
