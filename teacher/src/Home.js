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
        this.state = {
            isCreatingClassroom: false,
            isShowingClassroom: false,
            classroom: '',
        }
    }

    createClassroom() {
        this.setState({ isCreatingClassroom: true });
    }

    showClassroom(classroom_code) {
        this.setState({ isShowingClassroom: true, classroom: classroom_code });
    }

    showDashboard() {
        this.setState({ isCreatingClassroom: false, isShowingClassroom: false, classroom: '' });
    }

   render() {
       if(this.state.isCreatingClassroom) {
            return <CreateClassroom returnToDashboard={this.showDashboard} uid={firebase.auth().currentUser.uid} />;
        } else if(this.state.isShowingClassroom) {
            return <ShowClassroom classroom={this.state.classroom} showDashboard={this.showDashboard} /> 
        } else {
            return <ClassOverview logout={this.props.logout} createClassroom={this.createClassroom} showClassroom={this.showClassroom} />;
        }
   }
}

export default Home;