import { Component } from "react";
import "./Home.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import CreateClassroom from "./CreateClassroom";
import ClassOverview from "./ClassOverview";

class Home extends Component {
    constructor(props) {
        super(props);
        this.createClassroom = this.createClassroom.bind(this);
        this.showClassroom = this.showClassroom.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.state = {
            isCreatingClassroom: false,
        }
    }

    createClassroom() {
        this.setState({ isCreatingClassroom: true });
    }

    showClassroom(classroom_code) {
        // TODO this should show an overview of the classroom specified by the given code
        // right now it gives "maximum update depth exceeded" if we try to set state here
    }

    showDashboard() {
        this.setState({ isCreatingClassroom: false });
    }

   render() {
       if(this.state.isCreatingClassroom) {
           return <CreateClassroom returnToDashboard={this.showDashboard} uid={firebase.auth().currentUser.uid} />;
        } else {
           return <ClassOverview logout={this.props.logout} createClassroom={this.createClassroom} showClassroom={this.showClassroom} />;
        }
   }
}

export default Home;