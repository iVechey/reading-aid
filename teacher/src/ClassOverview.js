import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class ClassOverview extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.renderStudents = this.renderStudents.bind(this);
        this.showData = this.showData.bind(this);
        this.state = {
            user: firebase.auth().currentUser,
            classrooms: null,
            loading: true,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let ref = firebase.database().ref("teachers").child(this.state.user.uid);
        ref.once("value").then(snapshot => {
            this.response = snapshot.val()["classrooms"];
            this.setState({ classrooms: this.response, loading: false, });
        });
    }

    renderStudents(i) {
        const classroom = Object.values(this.state.classrooms)[i];
        return classroom.students ? (
                Object.values(classroom.students).map((student, j) => {
                    return <button className="list-group-item list-group-item-action" key={"student-" + j}><image></image><strong>{student.name}</strong></button>
                })
         ) : ( 
         <span><strong>No students yet</strong></span>
          );
    }

    showData() {
        return Object.values(this.state.classrooms).map((classroom, index) => {
            return (
                <div className="accordion-item" key={classroom.code}>
                    <h2 className="accordion-header" id={"heading-" + index}>
                        <button className="accordion-button dark-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + index} aria-expanded="false" aria-controls={"collapse-" + index}>
                            {classroom.name} (Class Code: {classroom.code})
                        </button>
                    </h2>    
                    <div id={"collapse-" + index} className="accordion-collapse collapse" aria-labelledby={"heading-" + index} data-bs-parent="#classrooms-table-container">
                        <div className="list-group">
                            {this.renderStudents(index)}
                        </div>
                    </div>
                </div>
                );
            });
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
                <div id="classrooms-table-container" className="accordion">
                    {!loading && this.showData()}
                </div>
            </div>
        );
    }
}

export default ClassOverview;