import { Component } from "react";
import "./Home.css";
import "firebase/database";
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
       console.log(this.state);
       if(this.state.isCreatingClassroom) {
           return <CreateClassroom username={this.props.user} returnToDashboard={this.showDashboard} />;
        } else {
           return <ClassOverview user={this.props.user} handleLogout={this.props.handleLogout} createClassroom={this.createClassroom} />;
        }
   }
}

export default Home;