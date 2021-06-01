import React from "react";
import "./ReadText.css";
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
        return <div className="container-fluid">
            <h2>This is the ReadText page for "{this.state.text.title}"</h2>;
            <button id="back-button" class="btn btn-primary btn-lg btn-block" onClick={this.props.showTextMenu}>Back</button>
        </div>

    }

}

export default ReadText;