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
            classroom: null,
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
                this.setState({ isShowingClassroom: true, classroom: classroom });
            } else {
                console.log("Invalid code '" + code + "'");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    showDashboard() {
        this.setState({ isCreatingClassroom: false, isShowingClassroom: false, classroom: null });
    }

    deleteClassroom(code) {
        // delete from overall classrooms list
        firebase.database().ref('classrooms').child(code).remove();
        // delete from teacher's individual classroom list
        firebase.database().ref('teachers').child(this.state.uid).child('classrooms').child(code).remove();
        alert("Classroom '" + code + "' deleted.");
        this.showDashboard();
    }

    editClassroom(code) {

    }

   render() {
       if(this.state.isCreatingClassroom) {
            return <CreateClassroom returnToDashboard={this.showDashboard} uid={this.state.uid} />;
        } else if(this.state.isShowingClassroom) {
            return <ShowClassroom classroom={this.state.classroom} showDashboard={this.showDashboard} deleteClassroom={this.deleteClassroom} editClassroom={this.editClassroom} /> 
        } else {
            return <ClassOverview logout={this.props.logout} createClassroom={this.createClassroom} showClassroom={this.showClassroom} />;
        }
   }
}

export default Home;