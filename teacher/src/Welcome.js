import { Component } from "react";
import "./Welcome.css";
import Login from "./Login";
import Signup from "./Signup";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            hasAccount: true,
        }
    }

    handleCreate() {
        this.setState({ hasAccount: false });
    }

    handleLogin() {
        this.setState({ hasAccount: true });
    }

    render() {
        let component;
        if(this.state.hasAccount) {
            component = <Login switchView={this.handleCreate} handleLogin={this.props.handleLogin} />;
        } else {
            component = <Signup switchView={this.handleLogin} />;
        }
        return (
            <div>
                <h2><strong>ReadingAid</strong></h2>
                {component}
            </div>
        );
    }
}

export default Welcome;