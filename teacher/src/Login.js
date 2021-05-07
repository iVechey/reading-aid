import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "./Form.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        // get info from form
		const username = this.state.username;
		const password = this.state.password;
		// don't try to submit an empty form
        if(!(username === '' || password === '')) { 
            // check that user w/ that username/password exists
            const db = firebase.database();
            db.ref('teachers').child(username).get().then((snapshot) => {
                if(snapshot.exists() && snapshot.val().password === password) {
                    // log the user in
                    this.props.handleLogin(true, username);
                } else {
                    alert("Invalid username or password, please try again.");
                }
            });
        }
    }

    render() {
        return (
            <form id="login-form" className="text-center">
                <legend><h3>Sign In</h3></legend>
                <div className="form-group">
                    <input name="username" type="username" className="form-control form-control-lg" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <input name="password" type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                </div>
                <button id="create-account-link" type="button" className="form-text text-muted link-button" onClick={this.props.switchView}>Don't have an account? Create one here.</button>
                <div className="form-group">
                    <input id="login-submit" type="submit" className="btn btn-lg btn-secondary" value="SUBMIT" onClick={this.handleSubmit} />
                </div>
            </form>
        );
    }
}

export default Login;