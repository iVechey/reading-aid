import { Component } from "react";
import "./Home.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser,
        }
    }

// TODO: for each text assigned to user, display a clickable logo
// TODO: on clicking logo redirect user to page for that text
// TODO: under logo display a checkmark for each time read
// TODO: on reaching timesRead == 3 make logo no longer clickable

   render() {
       return <h2>Hello, {this.state.user.displayName}!</h2>;
   }
}

export default Home;