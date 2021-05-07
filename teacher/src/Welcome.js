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

    switchView() {
        this.setState({ showSignUp: !this.state.showSignUp });
    }

    render() {
        let component;
        if(!this.state.showSignUp) {
            component = <Login switchView={this.switchView} login={this.props.login} />;
        } else {
            component = <Signup switchView={this.switchView} login={this.props.login} />;
        }
        return (
            <div>
                <h2 id="welcome-banner"><strong>ReadingAid</strong></h2>
                {component}
            </div>
        );
    }
}

export default Welcome;