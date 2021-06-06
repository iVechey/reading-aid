import React from "react";
import "./Home.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import CreateClassroom from "./CreateClassroom";
import ClassOverview from "./ClassOverview";
import AssignText from "./AssignText";
import SpecificStudentView from "./SpecificStudentView";
import AddText from "./AddText";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.createClassroom = this.createClassroom.bind(this);
        this.addText = this.addText.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.deleteClassroom = this.deleteClassroom.bind(this);
        this.showStudent = this.showStudent.bind(this);
        this.assignTexts = this.assignTexts.bind(this);
        this.state = {
            uid: firebase.auth().currentUser.uid,
            isCreatingClassroom: false,
            isViewingTexts: false,
            isShowingStudent: false,
            isAssigningTexts: false,
            isAddingText:false,
            currentClassroom: null,
            currentStudent: null,
        }
    }

    /* Redirects to create classroom page */
    createClassroom() {
        this.setState({ isCreatingClassroom: true });
    }

    /* Redirects to classrooms overview page */
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

    /* Deletes a classroom from the database and redirects to classrooms overview page */
    deleteClassroom(code) {
        // delete from overall classrooms list
        firebase.database().ref('classrooms').child(code).remove();
        // delete from teacher's individual classroom list
        firebase.database().ref('teachers').child(this.state.uid).child('classrooms').child(code).remove();
        alert("Classroom '" + code + "' deleted.");
        this.showDashboard();
    }

    /* Redirects to specific student view for the given student */
    showStudent(student_id) {
        this.setState({ isShowingStudent: true, currentStudent: student_id });
    }

    /* Redirects to assign texts page */
    assignTexts() {
        this.setState({ isShowingStudent: false, isAddingText:false, isAssigningTexts: true });
    }

    /* Redirects to add text page */
    addText(){
        this.setState({isAssigningTexts: false ,isAddingText:true});
    }

    /* Renders pages for creating classrooms, creating/assigning texts, showing specific students, or by default the classrooms overview */
   render() {
       if(this.state.isCreatingClassroom) {
            return <CreateClassroom returnToDashboard={this.showDashboard} uid={this.state.uid} />;
        } else if(this.state.isShowingStudent) {
            return <SpecificStudentView uid={this.state.currentStudent} showDashboard={this.showDashboard} assignTexts={this.assignTexts} />;
        } else if(this.state.isAssigningTexts) {
            return <AssignText uid={this.state.uid} showDashboard={this.showDashboard} addText={this.addText} />;
        } else if(this.state.isAddingText){
            return <AddText uid={this.state.uid} goBack={this.assignTexts}/>;
        } else {
            return <ClassOverview logout={this.props.logout} createClassroom={this.createClassroom} showStudent={this.showStudent} assignTexts={this.assignTexts} />;
        }
   }
}

export default Home;