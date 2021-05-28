import { Component } from "react";
import "./Home.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import TextMenu from "./TextMenu";
import ReadText from "./ReadText";

class Home extends Component {
    constructor(props) {
        super(props);
        this.readText = this.readText.bind(this);
        this.showTextMenu = this.showTextMenu.bind(this);
        this.state = {
            user: firebase.auth().currentUser,
            isReadingText: false,
        }
    }

    readText() {
        this.setState({ isReadingText: true });
    }

    showTextMenu() {
        this.setState({ isReadingText: false });
    }

   render() {
       if (this.state.isReadingText) {
           return <ReadText showTextMenu={this.showTextMenu} user={this.user} />;
       } else {
           return <TextMenu/>
       }
   }
}

export default Home;