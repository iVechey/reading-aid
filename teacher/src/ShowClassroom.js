import React from "react";

class ShowClassroom extends React.Component {
    render() {
        return (
            <div className="text-center">
                <h2>{this.props.classroom}</h2>
                <button className="btn btn-secondary btn-lg" onClick={this.props.showDashboard}>Back</button>
            </div>
        );
    }
}

export default ShowClassroom;