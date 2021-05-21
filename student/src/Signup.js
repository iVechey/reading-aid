import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";
import './Form.css'
import Cleave from 'cleave.js/react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class_code: '',
            first_name: '',
            last_name: '',
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
        const class_code = this.state.class_code;
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;
        const email = this.state.email;
        const password = this.state.password;
        var user;
        // check classroom exists
        var ref = firebase.database().ref('classrooms').child(class_code);
        ref.get().then(snapshot => {
            if(snapshot.exists()) {
                // if it does, create a new user
                firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredential => {
                    user = userCredential.user;
                    return user.updateProfile({
                        displayName: first_name + " " + last_name,
                    }).then(() => {
                        // create a student entry in database
                        firebase.database().ref('students').child(user.uid).set({
                            username: user.displayName,
                            email: user.email,
                            classroom_code: class_code,
                        });
                        // add the student to this classroom
                        ref.child('owner').get().then(snapshot => {
                            if(snapshot.exists()) {
                                const teacher_uid = snapshot.val();
                                firebase.database().ref("teachers/" + teacher_uid + "/classrooms/" + class_code + "/students/" + user.uid).set({
                                    name: user.displayName,
                                    uid: user.uid,
                                })
                            }
                        });
                        // redirect to login page
                        this.props.login();
                    });
                }).catch(error => console.log(error));
            } else {
                alert("There is no classroom with that code.")
            }
        });
    }

    render() {
        return (
            <form id="signup-form" className="text-center">
                <legend><h3>Create an Account</h3></legend>
                <div className="form-group">
                    <Cleave name="class_code" options={{blocks: [4, 4, 4], delimiter: '-', uppercase: true}} className="form-control form-control-lg" maxLength="14" placeholder="Class Code" value={this.state.class_code} onChange={this.handleInputChange} />
                </div>
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
                    <input name="password" type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                </div>
                <button id="login-link" type="button" className="form-text text-muted link-button" onClick={this.props.switchView}>Already have an account? Log in here</button>
                <div className="form-group">
                    <input id="signup-submit" type="submit" className="btn btn-lg light-btn" value="CREATE" onClick={this.handleSubmit} />
                </div>
            </form>
        );
    }
}
    
export default Signup;