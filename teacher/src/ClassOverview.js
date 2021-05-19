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
        this.getClassrooms = this.getClassrooms.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.state = {
            classrooms: [],
            students: [[]],
            user: firebase.auth().currentUser,
            loading: true,
        }
    }

    componentDidMount() {
        this.getClassrooms();
        this.getStudents();
    }

    getClassrooms() {
        let ref = firebase.database().ref("teachers/" + this.state.user.uid + "/classrooms");
        ref.once('value').then(snapshot => {
            if(snapshot.exists()) {
                snapshot.forEach(child => {
                    this.state.classrooms.push(child.val());
                });
            }
            this.setState({loading: false});
        });
    }

    getStudents() {
        let ref = firebase.database().ref("classrooms");
        const classrooms = this.state.classrooms;
        const students = this.state.students;
        console.log(classrooms);
        console.log(students);
        classrooms.forEach((classroom, index) => {
            ref.child(classroom.code).once('value').then(snapshot => {
                if(snapshot.exists()) {
                    console.log(snapshot.val());
                    snapshot.forEach(child => {
                        students[index].push(child.val());
                    });
                } else {
                    console.log("snapshot not found");
                }
            });
        });
        console.log("done loading");
        this.setState({loading: false});
    }

    renderStudents(index) {
        const students = this.state.students;
        console.log(students);
        return students.map((student, index) => {
            return <li key={"student-" + index}>{student.name}</li>
        });
    }

    renderRows() {
        const classrooms = this.state.classrooms;
        console.log("making rows");
        return classrooms.map((classroom, index) => {
            return (
                <div className="accordion-item" key={classroom.code}>
                    <h2 className="accordion-header" id={"heading-" + index}>
                        <button className="accordion-button readingaid-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + index} aria-expanded="false" aria-controls={"collapse-" + index}>
                            {classroom.name} (Class Code: {classroom.code})
                        </button>
                    </h2>    
                    <div id={"collapse-" + index} className="accordion-collapse collapse" aria-labelledby={"heading-" + index} data-bs-parent="#classrooms-table-container">
                        <div className="accordion-body">
                            <ul className="list-group">
                                {this.renderStudents(index)}
                            </ul>
                        </div>
                    </div>
                </div>
                );
            });
        }
        
    renderTable() {
        console.log("making table");
        const classrooms = this.state.classrooms;
        console.log(classrooms);
        if(classrooms.length > 0) {
            console.log("rendering table");
            return (
                <div id="classrooms-table-container" className="accordion">
                    {this.renderRows()}
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        const loading = this.state.loading;
        return (
            <div id="homepage-container" className="container-fluid">
                <button id="logout-btn" className="btn btn-lg readingaid-btn" onClick={this.props.logout}>Sign Out</button>
                <h2 id="welcome-banner" className="text-center"><strong>Welcome {this.state.user.displayName}!</strong></h2>
                <div id="dashboard-buttons">
                    <button className="btn btn-lg readingaid-btn" onClick={this.props.createClassroom} uid={this.state.user.uid}>Create New Class</button>
                    <button className="btn btn-lg readingaid-btn" onClick={this.props.viewTexts} uid={this.state.user.uid}>My Texts</button>
                    <button className="btn btn-lg readingaid-btn" onClick={this.props.createText} uid={this.state.user.uid}>Add Text</button>
                </div>
                <div className="clear-fix"></div>
                {!loading && this.renderTable()}
            </div>
        );
    }
}

export default ClassOverview;