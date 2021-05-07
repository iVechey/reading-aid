import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "./Form.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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
		const email = this.state.email;
		const password = this.state.password;
        // authenticate
		firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            // user has signed in
            this.props.login();
        }).catch((error) => {
            alert(error.message);
        });
    }

    render() {
        return (
            <form id="login-form" className="text-center">
                <legend><h3>Sign In</h3></legend>
                <div className="form-group">
                    <input name="email" type="email" className="form-control form-control-lg" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <input name="password" type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                </div>
                <button id="create-account-link" type="button" className="form-text text-muted link-button" onClick={this.props.switchView}>Don't have an account? Create one here.</button>
                <div className="form-group">
                    <input id="login-submit" type="submit" className="btn btn-lg readingaid-btn" value="SUBMIT" onClick={this.handleSubmit} />
                </div>
            </form>
        );
    }
}

export default Login;