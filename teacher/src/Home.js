import { Component } from "react";
import "./Home.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import CreateClassroom from "./CreateClassroom";
import ClassOverview from "./ClassOverview";
import ShowClassroom from "./ShowClassroom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.createClassroom = this.createClassroom.bind(this);
        this.showClassroom = this.showClassroom.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.deleteClassroom = this.deleteClassroom.bind(this);
        this.state = {
            uid: firebase.auth().currentUser.uid,
            isCreatingClassroom: false,
            isShowingClassroom: false,
            classroom_code: '',
        }
    }

    createClassroom() {
        this.setState({ isCreatingClassroom: true });
    }

    showClassroom(code) {
        this.setState({ isShowingClassroom: true, classroom_code: code });
    }

    showDashboard() {
        this.setState({ isCreatingClassroom: false, isShowingClassroom: false, classroom: '' });
    }

    deleteClassroom(code) {
        // delete from overall classrooms list
        firebase.database().ref('classrooms').child(code).remove();
        // delete from teacher's individual classroom list
        firebase.database().ref('teachers').child(this.state.uid).child('classrooms').child(code).remove();
        alert("Classroom '" + code + "' deleted.");
        this.showDashboard();
    }

   render() {
       if(this.state.isCreatingClassroom) {
            return <CreateClassroom returnToDashboard={this.showDashboard} uid={this.state.uid} />;
        } else if(this.state.isShowingClassroom) {
            return <ShowClassroom code={this.state.classroom_code} showDashboard={this.showDashboard} deleteClassroom={this.deleteClassroom} /> 
        } else {
            return <ClassOverview logout={this.props.logout} createClassroom={this.createClassroom} showClassroom={this.showClassroom} />;
        }
   }
}

export default Home;