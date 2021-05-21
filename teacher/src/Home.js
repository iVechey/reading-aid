import React from "react";
import "./Home.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import CreateClassroom from "./CreateClassroom";
import ClassOverview from "./ClassOverview";
import ShowClassroom from "./ShowClassroom";
import ViewTexts from "./ViewTexts";
import SpecificStudentView from "./SpecificStudentView";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.createClassroom = this.createClassroom.bind(this);
        this.showClassroom = this.showClassroom.bind(this);
        this.viewTexts = this.viewTexts.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.deleteClassroom = this.deleteClassroom.bind(this);
        this.showStudent = this.showStudent.bind(this);
        this.state = {
            uid: firebase.auth().currentUser.uid,
            isCreatingClassroom: false,
            isShowingClassroom: false,
            isViewingTexts: false,
            isShowingStudent: false,
            currentClassroom: null,
            currentStudent: null,
        }
    }

    createClassroom() {
        this.setState({ isCreatingClassroom: true });
    }

    showClassroom(code) {
        console.log(code);
        firebase.database().ref("classrooms/" + code).get().then((snapshot) => {
            if(snapshot.exists()) {
                var classroom = snapshot.val();
                console.log(classroom);
                this.setState({ isShowingClassroom: true, currentClassroom: classroom });
            } else {
                console.log("Invalid code '" + code + "'");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    viewTexts() {
        this.setState({ isViewingTexts: true });
    }

    showDashboard() {
        this.setState({ 
            isCreatingClassroom: false, 
            isShowingClassroom: false, 
            isViewingTexts: false, 
            isShowingStudent: false, 
            currentClassroom: null,
            currentStudent: null });
    }

    deleteClassroom(code) {
        // delete from overall classrooms list
        firebase.database().ref('classrooms').child(code).remove();
        // delete from teacher's individual classroom list
        firebase.database().ref('teachers').child(this.state.uid).child('classrooms').child(code).remove();
        alert("Classroom '" + code + "' deleted.");
        this.showDashboard();
    }

    showStudent(student_id) {
        this.setState({ isShowingStudent: true, currentStudent: student_id });
    }

   render() {
       if(this.state.isCreatingClassroom) {
            return <CreateClassroom returnToDashboard={this.showDashboard} uid={this.state.uid} />;
        } else if(this.state.isShowingClassroom) {
            return <ShowClassroom classroom={this.state.currentClassroom} showDashboard={this.showDashboard} deleteClassroom={this.deleteClassroom} editClassroom={this.editClassroom} /> 
        } else if(this.state.isViewingTexts) {
            return <ViewTexts uid={this.state.uid} showDashboard={this.showDashboard} />;
        } else if(this.state.isShowingStudent) {
            return <SpecificStudentView uid={this.state.currentStudent} showDashboard={this.showDashboard} />;
        } else {
            return <ClassOverview logout={this.props.logout} createClassroom={this.createClassroom} showClassroom={this.showClassroom} showStudent={this.showStudent} viewTexts={this.viewTexts} />;
        }
   }
}

export default Home;