import { Component } from "react";
import "./Welcome.css";
import Login from "./Login";
import Signup from "./Signup";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.switchView = this.switchView.bind(this);
        this.state = {
            showSignUp: false,
        }
    }

    /* Switches between rendering login page and create account page */
    switchView() {
        this.setState({ showSignUp: !this.state.showSignUp });
    }

    /* Defaults to showing login page, but can be switched to show create account page */
    render() {
        return (
            <div>
                <h2 id="welcome-banner"><strong>ReadingAid</strong></h2>
                {this.state.showSignUp ? <Signup switchView={this.switchView} login={this.props.login} /> : <Login switchView={this.switchView} login={this.props.login} />}
            </div>
        );
    }
}

export default Welcome;