import React from "react";

class AssignTexts extends React.Component {
    render() {
        return (
            <div className="text-center">
                <h1>Assign Texts</h1>
                <button className="btn btn-lg dark-btn" onClick={this.props.showDashboard}>Go Back</button>
            </div>
        );
    }
}

export default AssignTexts;