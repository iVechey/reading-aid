import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "./Login.css";
import { Link } from "react-router-dom";
import Home from "./Home.js";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
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
        var db = firebase.database();
        // check if a user with this name exists
        db.ref('users').child(this.state.username).get().then((snapshot) => {
            if(snapshot.exists()) {
                // if so, check if the password is correct
                if(snapshot.val().password === this.state.password) {
                    console.log("Passwords match");
                    this.setState({redirect: true});
                } else {
                    alert("Password is incorrect, please try again.");
                }
            } else {
                alert("There is no user '" + this.state.username + "'. Please try again or create a new account.");
            }
        }).catch((error) => {
            console.error(error);
        });

        event.preventDefault();
    }

    render() {
        if(this.state.redirect) {
            return <Home name={this.state.username} />
        } else {
            return (
                <div>
                    <h2>
                        <strong>ReadingAid</strong>
                    </h2>
                    <form id="login-form" className="text-center">
                        <legend><h3>Sign In</h3></legend>
                        <div className="form-group">
                            <input name="username" type="username" className="form-control form-control-lg" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input name="password" type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>
                        <small id="create-account-link" className="form-text text-muted"><Link to="/signup">Don't have an account? Create one here.</Link></small>
                        <div className="form-group">
                            <input id="login-submit" type="submit" className="btn btn-lg btn-secondary" value="SUBMIT" onClick={this.handleSubmit} />
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default Login;