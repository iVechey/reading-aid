import React from "react";
import "firebase/database";

class ShowClassroom extends React.Component {
    render() {
        const classroom = this.props.classroom;
        return (
            <div className="text-center">
                <h1><strong>{classroom.name}</strong></h1>
                <h3>{classroom.code}</h3>
                <button className="btn readingaid-btn m-2" onClick={this.props.showDashboard}>Back</button>
                <button className="btn readingaid-btn m-2" onClick={() => {this.props.deleteClassroom(classroom.code)}}>DELETE</button>
            </div>
        );
    }
}

export default ShowClassroom;