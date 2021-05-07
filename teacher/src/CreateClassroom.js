import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "./Form.css";

class CreateClassroom extends React.Component {
    constructor(props) {
        super(props);
        this.generateCode = this.generateCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
        }
    }

    generateCode() {
        // TODO this is where we'll generate a random classroom code
    }

    handleSubmit() {
        // get info from form
        const name = this.state.name;
        const code = this.generateCode();

        var ref = firebase.database().ref('teachers').child(this.props.username);
        ref.child('classrooms').child(name).set({
            name: name,
            code: code,
        });
        alert("New classroom '" + name + "' created!");
        // take them back to overview page
        this.props.returnToDashboard();
    }

    render() {
        return (
            <form id="create-classroom-form" className="text-center">
                <legend><h3>Create a Classroom</h3></legend>
                <div className="form-group">
                    <input name="name" type="text" className="form-control form-control-lg" placeholder="Classroom Name" value={this.state.username} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <input id="login-submit" type="submit" className="btn btn-lg btn-secondary" value="Create Classroom" onClick={this.handleSubmit} />
                </div>
            </form>
        );
    }
}

export default CreateClassroom;