import { Component } from "react";
import "./Home.css";
import "firebase/database";
import CreateClassroom from "./CreateClassroom";
import ClassOverview from "./ClassOverview";

class Home extends Component {
    constructor(props) {
        super(props);
        this.switchView = this.switchView.bind(this);
        this.state = {
            isCreatingClassroom: false,
        }
    }

    switchView() {
        this.setState({ isCreatingClassroom: !this.state.isCreatingClassroom });
    }

   render() {
       if(this.state.isCreatingClassroom) {
           return <CreateClassroom username={this.props.user} returnToDashboard={this.switchView} />;
        } else {
           return <ClassOverview user={this.props.user} handleLogout={this.props.handleLogout} createClassroom={this.switchView} />;
        }
   }
}

export default Home;