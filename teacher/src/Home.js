import React from "react";
import "./Home.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import CreateClassroom from "./CreateClassroom";
import ClassOverview from "./ClassOverview";
import ShowClassroom from "./ShowClassroom";
import AssignText from "./AssignText";
import ViewTexts from "./ViewTexts";
import SpecificStudentView from "./SpecificStudentView";
import AddText from "./AddText";
// import AssignTexts from "./AssignTexts";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.createClassroom = this.createClassroom.bind(this);
        this.showClassroom = this.showClassroom.bind(this);
        this.viewTexts = this.viewTexts.bind(this);
        this.addText = this.addText.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.deleteClassroom = this.deleteClassroom.bind(this);
        // this.showAssignText = this.showAssignText.bind(this); //do i need this here?
        this.showStudent = this.showStudent.bind(this);
        this.assignTexts = this.assignTexts.bind(this);
        this.state = {
            uid: firebase.auth().currentUser.uid,
            isCreatingClassroom: false,
            isShowingClassroom: false,
            isViewingTexts: false,
            isShowingStudent: false,
            isAssigningTexts: false,
            isAddingText:false,
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
            isAssigningTexts: false,
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

    assignTexts() {
        this.setState({ isShowingStudent: false, isAddingText:false, isAssigningTexts: true });
    }

    addText(){
        this.setState({isAssigningTexts: false ,isAddingText:true});
    }

   render() {
       if(this.state.isCreatingClassroom) {
            return <CreateClassroom returnToDashboard={this.showDashboard} uid={this.state.uid} />;
        } else if(this.state.isShowingClassroom) {
            return <ShowClassroom classroom={this.state.currentClassroom} showDashboard={this.showDashboard} deleteClassroom={this.deleteClassroom} editClassroom={this.editClassroom} /> 
        } else if(this.state.isViewingTexts) {
            return <ViewTexts uid={this.state.uid} showDashboard={this.showDashboard} />;
        } else if(this.state.isShowingStudent) {
            return <SpecificStudentView uid={this.state.currentStudent} showDashboard={this.showDashboard} assignTexts={this.assignTexts} />;
        } else if(this.state.isAssigningTexts) {
            return <AssignText uid={this.state.uid} showDashboard={this.showDashboard} addText={this.addText} />;
        }else if(this.state.isAddingText){
            return <AddText uid={this.state.uid} goBack={this.assignTexts}/>;
        }else {
            return <ClassOverview logout={this.props.logout} createClassroom={this.createClassroom} showClassroom={this.showClassroom} showStudent={this.showStudent} assignTexts={this.assignTexts} /> //viewTexts={this.viewTexts} />;
        }
   }
}

export default Home;