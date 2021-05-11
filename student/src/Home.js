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

   render() {
       return <h2>Welcome {this.state.user.displayName}!</h2>;
   }
}

export default Home;