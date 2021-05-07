import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "./Form.css";

class CreateClassroom extends React.Component {
    constructor(props) {
        super(props);
        this.generateCode = this.generateCode.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            classroom_name: '',
        };
    }

    generateCode() {
        // TODO these codes will need to be completely unique
        var rand = Math.random().toString(16).substr(2, 12);
        return rand.substr(0, 4) + "-" + rand.substr(4, 4) + "-" + rand.substr(8, 4);
    }

    handleInputChange(event) {
        this.setState({ classroom_name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // get info from form
        const classroom_name = this.state.classroom_name;
        const code = this.generateCode();
        // create their classroom
        var ref = firebase.database().ref('teachers').child(this.props.uid);
        ref.child('classrooms').child(classroom_name).set({
            classroom_name: classroom_name,
            code: code,
            num_students: 0,
        });
        alert("New classroom '" + classroom_name + "' created! Your code is: " + code);
        // take them back to overview page
        this.props.returnToDashboard();
    }

    render() {
        return (
            <form id="create-classroom-form" className="text-center">
                <legend><h3>Create a Classroom</h3></legend>
                <div className="form-group">
                    <input name="classroom_name" type="text" className="form-control form-control-lg" placeholder="Classroom Name" value={this.state.classroom_name} onChange={this.handleInputChange} />
                </div>
                <div id="create-classroom-btns" className="form-group">
                    <button type="submit" className="btn btn-lg btn-secondary" onClick={this.handleSubmit}>Create</button>
                    <button className="btn btn-lg btn-secondary" onClick={this.props.returnToDashboard}>Back</button>
                </div>
            </form>
        );
    }
}

export default CreateClassroom;