import React from 'react';
import firebase from "firebase/app";
import "firebase/database";

class ClassOverview extends React.Component {
    constructor(props) {
        super(props);
        this.renderRows = this.renderRows.bind(this);
        this.getClassrooms = this.getClassrooms.bind(this);
        this.state = {
            classrooms: [],
        }
        this.getClassrooms(this.props.user);
    }

    getClassrooms(user) {
        firebase.database().ref('teachers').child(user).child('classrooms').on('value', (snapshot) => {
            if(snapshot.exists()) {
                snapshot.forEach((child) => {
                    this.state.classrooms.push(child.val());
                });
            }
        });
    }

    renderRows() {
        const classrooms = this.state.classrooms;
        if(classrooms.length > 0) {
            return classrooms.map((classroom, index) => {
                    return (
                        // TODO want to make this so you can click on the classroom's row to go to that specific classroom's page. 
                        // right now it either makes the table rows not appear or it gives a "maximum update depth error" for some reason.
                        <tr data-index={index} key={"classroom-"+index}>
                            <td>{classroom.name}</td>
                            <td>{classroom.code}</td>
                            <td>{classroom.num_students}</td>
                        </tr>
                    );
                });
        } else {
            return null;
        }
    }

    render() {
        return (
            <div id="homepage-container" className="container-fluid">
                <h2 id="welcome-banner" className="text-center"><strong>Welcome {this.props.user}!</strong></h2>
                <div id="dashboard-buttons">
                    <button className="btn btn-lg btn-secondary" onClick={this.props.createClassroom}>Create Classroom</button>
                    <button className="btn btn-lg btn-secondary" onClick={this.props.handleLogout}>Logout</button>
                </div>
                <h1>Your Classrooms</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Number of Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ClassOverview;