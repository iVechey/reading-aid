import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "./Form.css";

class CreateClassroom extends React.Component {
    constructor(props) {
        super(props);
        this.getExistingClassrooms = this.getExistingClassrooms.bind(this);
        this.generateCode = this.generateCode.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            classroom_name: '',
            existing_classrooms: [],
        };
        this.getExistingClassrooms();
    }

    getExistingClassrooms() {
        firebase.database().ref('classrooms').on('value', (snapshot) => {
            if(snapshot.exists()) {
                snapshot.forEach((child) => {
                    this.state.existing_classrooms.push(child.val());
                });
            }
        });
    }

    /* Generates a code of uppercase letters and numbers in the format XXXX-XXXX-XXXX */
    generateCode() {
        return (Math.random().toString(16).substr(2, 4) + "-" 
        + Math.random().toString(16).substr(2, 4) + "-" 
        + Math.random().toString(16).substr(2, 4)).toUpperCase();
    }

    /* Event handler for when the user starts typing in the classroom name in the form */
    handleInputChange(event) {
        this.setState({ classroom_name: event.target.value });
    }

    /* Creates a classroom in the database and generates a code for it, then redirects to classrooms overview page */
    handleSubmit(event) {
        event.preventDefault();
        // get info from form
        const classroom_name = this.state.classroom_name;
        var code;
        do {
            code = this.generateCode();
        } while(this.state.existing_classrooms.includes(code));
        // create their classroom
        var ref = firebase.database().ref('teachers').child(this.props.uid);
        ref.child('classrooms').child(code).set({
            name: classroom_name,
            code: code,
            num_students: 0,
        });
        ref = firebase.database().ref('classrooms').child(code).set({
            name: classroom_name,
            code: code,
            owner: this.props.uid,
        });
        alert("New classroom '" + classroom_name + "' created! Your code is: " + code);
        // take them back to overview page
        this.props.returnToDashboard();
    }

    /* Renders a form to input a classroom name, a submit button, and a back button */
    render() {
        return (
            <form id="create-classroom-form" className="text-center">
                <legend><h3>Create a Classroom</h3></legend>
                <div className="form-group">
                    <input name="classroom_name" type="text" className="form-control form-control-lg" placeholder="Classroom Name" value={this.state.classroom_name} onChange={this.handleInputChange} />
                </div>
                <div id="create-classroom-btns" className="form-group">
                    <button type="submit" className="btn btn-lg dark-btn" onClick={this.handleSubmit}>Create</button>
                    <button className="btn btn-lg dark-btn" onClick={this.props.returnToDashboard}>Back</button>
                </div>
            </form>
        );
    }
}

export default CreateClassroom;