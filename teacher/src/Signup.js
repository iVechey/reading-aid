import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import './Signup.css'
import { Link, Redirect } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
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
        var db = firebase.database();
        // check if this username is already in use
        db.ref('teachers').child(this.state.username).get().then((snapshot) => {
            if(snapshot.exists()) {
                alert("User '" + snapshot.val().username + "' already exists, please pick a new username.");
            } else {
                alert("New user '" + this.state.username + "' created!");
                // if not, create a new user
                db.ref('teachers/' + this.state.username).set({
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                });
                <Redirect to="/login" />
            }
        }).catch((error) => {
            console.error(error);
        });
        
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>
                    <strong>ReadingAid</strong>
                </h2>
                <form id="signup-form" className="text-center">
                    <legend><h3>Create an Account</h3></legend>
                    <div className="form-group">
                        <input name="first_name" type="text" className="form-control form-control-lg" placeholder="First Name" value={this.state.first_name} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input name="last_name" type="text" className="form-control form-control-lg" placeholder="Last Name" value={this.state.last_name} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input name="email" type="email" className="form-control form-control-lg" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input name="username" type="username" className="form-control form-control-lg" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input name="password" type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <small id="login-link" className="form-text text-muted"><Link to="/login">Already have an account? Log in here</Link></small>
                    <div className="form-group">
                        <input id="signup-submit" type="submit" className="btn btn-lg btn-secondary" value="CREATE" onClick={this.handleSubmit} />
                    </div>
                </form>
            </div>
        );
    }
}
    
export default Signup;