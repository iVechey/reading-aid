import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class ReadText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h2>this is the ReadText page</h2>;
    }

}

export default ReadText;