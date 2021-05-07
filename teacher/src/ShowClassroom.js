import React from "react";
import firebase from "firebase/app";
import "firebase/database";

class ShowClassroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classroom: firebase.database().ref('classrooms').child(props.code),
        };
    }
    render() {
        console.log("classroom: " + this.state.classroom);
        return (
            <div className="text-center">
                <h2>{this.props.code}</h2>
                <button className="btn readingaid-btn btn-lg" onClick={this.props.showDashboard}>Back</button>
            </div>
        );
    }
}

export default ShowClassroom;