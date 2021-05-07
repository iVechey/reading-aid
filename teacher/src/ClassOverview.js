// TODO this is the classroom overview page. it receives the current user's username as a prop.
import React from 'react';

class ClassOverview extends React.Component {
    render() {
        return (
            <div id="homepage-container" className="container-fluid">
                <h1 className="text-center">Welcome {this.props.user}!</h1>
                <div id="create-classroom-btn">
                    <button className="btn btn-lg btn-secondary" onClick={this.props.createClassroom}>Create Classroom</button>
                    <button className="btn btn-lg btn-secondary" onClick={this.props.handleLogout}>Logout</button>
                </div>
            </div>
        );
    }
}

export default ClassOverview;