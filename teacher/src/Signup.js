import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import './Form.css'

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
        event.preventDefault();
        // get info from form
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;
        const email = this.state.email;
        const username = this.state.username;
        const password = this.state.password;

        var ref = firebase.database().ref('teachers');
        var success = true;
        
        // check that the username isn't being used
        ref.child(username).get().then((snapshot) => {
            if(snapshot.exists()) {
                alert("User '" + username + "' already exists, please pick a new username.");
                success = false;
            }
        });
        
        // check that the email isn't being used
        var query = ref.orderByChild('email').equalTo(email);
        query.once('value', function(snapshot) {
            if(snapshot.exists()) {
                alert("That email is already in use.");
                success = false;
            }
        });
        
        // if neither are in use, create a new user
        if(success) {
            ref.child(username).set({
                first_name: first_name,
                last_name: last_name, 
                email: email,
                username: username,
                password: password,
            });
            alert("New user '" + username + "' created!");
            // take them to login page
            this.props.switchView();
        }
    }

    render() {
        return (
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
                <button id="login-link" type="button" className="form-text text-muted link-button" onClick={this.props.switchView}>Already have an account? Log in here</button>
                <div className="form-group">
                    <input id="signup-submit" type="submit" className="btn btn-lg btn-secondary" value="CREATE" onClick={this.handleSubmit} />
                </div>
            </form>
        );
    }
}
    
export default Signup;