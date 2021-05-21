import React from "react";
import firebase from "firebase/app";
import "firebase/database";

class SpecificStudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            loading: true,
        }
    }

    componentDidMount() {
        firebase.database().ref("students").child(this.props.uid).once("value").then(snapshot => {
            this.setState({ student: snapshot.val(), loading: false });
        });
    }

    render () {
        const loading = this.state.loading;
        return !loading && (
            <span>
                <strong>Student "{this.state.student.username}"</strong>
                <button onClick={this.props.showDashboard} className="btn btn-lg dark-btn">Go Back</button>
            </span>
        );
    }
}

export default SpecificStudentView;