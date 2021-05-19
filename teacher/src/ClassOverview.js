import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class ClassOverview extends React.Component {
    constructor(props) {
        super(props);
        this.renderRows = this.renderRows.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.renderStudents = this.renderStudents.bind(this);
        this.getData = this.getData.bind(this);
        this.state = {
            classrooms: [],
            students: [],
            user: firebase.auth().currentUser,
            loading: true,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        // retrieve classrooms for this user
        var ref = firebase.database().ref("teachers/" + this.state.user.uid + "/classrooms");
        ref.on('value', snapshot => {
            if(snapshot.exists()) {
                snapshot.forEach(child => {
                    this.state.classrooms.push(child.val());
                    this.state.students.push([]);
                });
            }
        });
        console.log("classrooms:", this.state.classrooms);

        // retrieve the students that are in each class
        ref = firebase.database().ref("classrooms");
        this.state.classrooms.forEach((classroom, index) => {
            ref.child(classroom.code).child('students').on('value', snapshot => {
                if(snapshot.exists()) {
                    console.log(snapshot.val());
                    snapshot.forEach(child => {
                        console.log(index + " " + this.state.students[index]);
                        this.state.students[index].push(child.val());
                    });
                }
            });
        });
        console.log("students:", this.state.students);
        // tell the render function we're ready to load the retrieved data
        console.log("done loading");
        this.setState({loading: false});
    }

    renderStudents(i) {
        return this.state.students[i].map((student, j) => {
            return <button className="list-group-item list-group-item-action" key={"student-" + j}>{student.name}</button>
        });
    }

    renderRows() {
        return this.state.classrooms.map((classroom, index) => {
            return (
                <div className="accordion-item" key={classroom.code}>
                    <h2 className="accordion-header" id={"heading-" + index}>
                        <button className="accordion-button dark-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + index} aria-expanded="false" aria-controls={"collapse-" + index}>
                            {classroom.name} (Class Code: {classroom.code})
                        </button>
                    </h2>    
                    <div id={"collapse-" + index} className="accordion-collapse collapse" aria-labelledby={"heading-" + index} data-bs-parent="#classrooms-table-container">
                        <div className="list-group">
                            {this.state.students[index].length > 0 ? this.renderStudents(index) : <strong>No Students Yet</strong>}
                        </div>
                    </div>
                </div>
                );
            });
        }
        
    renderTable() {
        return (
            <div id="classrooms-table-container" className="accordion">
                {this.renderRows()}
            </div>
        )
    }

    render() {
        const loading = this.state.loading;
        return (
            <div id="homepage-container" className="container-fluid">
                <button id="logout-btn" className="btn btn-lg light-btn" onClick={this.props.logout}>Sign Out</button>
                <h2 id="welcome-banner" className="text-center"><strong>Welcome {this.state.user.displayName}!</strong></h2>
                <div id="dashboard-buttons">
                    <button className="btn btn-lg light-btn" onClick={this.props.createClassroom} uid={this.state.user.uid}>Create New Class</button>
                    <button className="btn btn-lg light-btn" onClick={this.props.viewTexts} uid={this.state.user.uid}>My Texts</button>
                    <button className="btn btn-lg light-btn" onClick={this.props.createText} uid={this.state.user.uid}>Add Text</button>
                </div>
                <div className="clear-fix"></div>
                {!loading && this.renderTable()}
            </div>
        );
    }
}

export default ClassOverview;