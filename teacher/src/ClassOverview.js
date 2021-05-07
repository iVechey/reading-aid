import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class ClassOverview extends React.Component {
    constructor(props) {
        super(props);
        this.renderRows = this.renderRows.bind(this);
        this.getClassrooms = this.getClassrooms.bind(this);
        this.state = {
            classrooms: [],
            user: firebase.auth().currentUser,
        }
        this.getClassrooms(this.state.user.uid);
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
                        <tr data-index={index} key={"classroom-"+index}>
                            <td><button className="link-button" onClick={() => {this.props.showClassroom(classroom.code)}}>{classroom.classroom_name}</button></td>
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
                <h2 id="welcome-banner" className="text-center"><strong>Welcome {this.state.user.displayName}!</strong></h2>
                <div id="dashboard-buttons">
                    <button className="btn btn-lg btn-secondary" onClick={this.props.createClassroom} uid={this.state.user.uid}>Create Classroom</button>
                    <button className="btn btn-lg btn-secondary" onClick={this.props.logout}>Logout</button>
                </div>
                <div className="clear-fix"></div>
                { this.state.classrooms.length > 0 &&
                    <div id="classrooms-table-container">
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
                }
            </div>
        );
    }
}

export default ClassOverview;