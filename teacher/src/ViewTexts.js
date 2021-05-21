import React from "react";

class ViewTexts extends React.Component {
    render() {
        return (
            <div className="text-center">
                <h1>View and Edit Texts</h1>
                <button className="btn btn-lg dark-btn" onClick={this.props.showDashboard}>Go Back</button>
            </div>
        );
    }
}

export default ViewTexts;