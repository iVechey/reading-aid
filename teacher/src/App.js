import React from 'react';
import './App.css';
import Home from './Home.js';
import Welcome from './Welcome.js';
import "firebase/database";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.state = { 
			isLoggedIn: false,
			username: '',
			password: '',
		 };
	}

	handleLogin(success, name) {
		this.setState({isLoggedIn: success, username: name });
	}

	handleLogout() {
		this.setState({isLoggedIn: false});
	}

  render() {
    return this.state.isLoggedIn ? <Home name={this.state.username} handleLogout={this.handleLogout} /> : <Welcome handleLogin={this.handleLogin} />;
  }
}

export default App;
