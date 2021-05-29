import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class ReadText extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <h2>this is the ReadText page</h2>;
            <button class="btn btn-primary btn-lg btn-block" onClick={this.props.showTextMenu}>Back</button>
        </div>

    }

}

export default ReadText;