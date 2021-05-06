import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
import Login from './Login.js';
import Signup from './Signup.js';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { loggedIn: false };
	}
  render() {
    return (
      <BrowserRouter>
        <Switch>
        	<Route path="/login">
    			<Login />
        	</Route>
        	<Route path="/signup">
            	<Signup />
        	</Route>
    		<Route exact path="/">
	    { this.props.loggedIn ? <Home /> : <Login /> }
			</Route>
			<Route path="/home">
				<Redirect exact from="/home" to="/" />
			</Route>
			<Route path="*">
				<Redirect to="/" />
			</Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
