import React from 'react';
import './App.css';
import Home from './Home.js';
import Welcome from './Welcome.js';
import firebase from "firebase/app";
import "firebase/auth";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.state = { 
			user: firebase.auth().currentUser,
		 };
	}

	/* Sets the currently logged in user and redirects to their homepage */
	login() {
		this.setState({ user: firebase.auth().currentUser});
	}

	/* Logs out the current user and redirects to login/create account page */
	logout() {
		firebase.auth().signOut().then(() => {
			this.setState({ user: null, });
		}).catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			alert(errorMessage);
		});
	}

	/* If a user is logged in, shows user's hompage, else shows login/create account pages */
	render() {
		return this.state.user ? <Home logout={this.logout} /> : <Welcome login={this.login} />;
	}
}

export default App;
