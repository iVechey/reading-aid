import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class ClassOverview extends React.Component {
    constructor(props) {
        super(props);
        this.renderRows = this.renderRows.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.getClassrooms = this.getClassrooms.bind(this);
        this.state = {
            classrooms: [],
            user: firebase.auth().currentUser,
            retrievedClassrooms: false,
        }
    }

    componentDidMount() {
        this.getClassrooms();
    }

    getClassrooms() {
        let ref = firebase.database().ref("teachers/" + this.state.user.uid + "/classrooms");
        ref.once('value').then(snapshot => {
            if(snapshot.exists()) {
                snapshot.forEach((child) => {
                    this.state.classrooms.push(child.val());
                });
                this.setState({retrievedClassrooms: true});
            }
        });
    }

    renderRows() {
        const classrooms = this.state.classrooms;
        console.log(classrooms.length);
        return classrooms.map((classroom, index) => {
            return (
                <tr role="button" tabIndex="0" data-index={index} key={"classroom-"+index} onClick={() => {this.props.showClassroom(classroom.code)}}>
                        <td>{classroom.classroom_name}</td>
                        <td>{classroom.code}</td>
                        <td>{classroom.num_students}</td>
                    </tr>
                );
            });
        }
        
    renderTable() {
        const classrooms = this.state.classrooms;
        console.log(classrooms.length);
        if(classrooms.length > 0) {
            return (
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
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div id="homepage-container" className="container-fluid">
                <h2 id="welcome-banner" className="text-center"><strong>Welcome {this.state.user.displayName}!</strong></h2>
                <div id="dashboard-buttons">
                    <button className="btn btn-lg readingaid-btn" onClick={this.props.createClassroom} uid={this.state.user.uid}>Create Classroom</button>
                    <button className="btn btn-lg readingaid-btn" onClick={this.props.logout}>Logout</button>
                </div>
                <div className="clear-fix"></div>
                {this.state.retrievedClassrooms && this.renderTable()}
            </div>
        );
    }
}

export default ClassOverview;