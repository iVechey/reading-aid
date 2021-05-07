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
        this.showDashboard = this.showDashboard.bind(this);
        this.state = {
            isCreatingClassroom: false,
        }
    }

    createClassroom() {
        this.setState({ isCreatingClassroom: !this.state.isCreatingClassroom });
    }


    showDashboard() {
        this.setState({ isCreatingClassroom: false });
    }

   render() {
       if(this.state.isCreatingClassroom) {
           return <CreateClassroom returnToDashboard={this.showDashboard} uid={firebase.auth().currentUser.uid} />;
        } else {
           return <ClassOverview logout={this.props.logout} createClassroom={this.createClassroom} />;
        }
   }
}

export default Home;