import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class ReadText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
        }
    }

    render() {
        return <div>
            <h2>this is the ReadText page</h2>;
            <h2>{this.state.text.title}</h2>
            <button class="btn btn-primary btn-lg btn-block" onClick={this.props.showTextMenu}>Back</button>
        </div>

    }

}

export default ReadText;