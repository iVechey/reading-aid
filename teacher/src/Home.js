import { Component } from "react";
import "./Home.css";

class Home extends Component {
   render() {
        return (
            <div id="homepage-container" className="container-fluid">
                <h1 className="text-center">{this.props.name}'s homepage</h1>
                <div id="create-classroom-btn">
                    <button className="btn btn-lg btn-secondary">Create Classroom</button>
                    <button className="btn btn-lg btn-secondary" onClick={this.props.handleLogout}>Logout</button>
                </div>
            </div>
        )
   }
}

export default Home;