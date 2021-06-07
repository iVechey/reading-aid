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
            currentText: null,
        }
    }

    // Called by text buttons in text menu on home page to go to ReadText to read
    // the selected text
    readText(text) {
        this.setState({ isReadingText: true, currentText: text });
    }

    // Called by return button in ReadText page to return user to home page
    showTextMenu() {
        this.setState({ isReadingText: false });
    }

    // Render either the student home page with menu of assigned texts, or the read text page for the selected
    // text, depending on the current state
   render() {
       if (this.state.isReadingText) {
           return <ReadText text={this.state.currentText} showTextMenu={this.showTextMenu} user={this.state.user} />;
       } else {
           return <div id="homepage-container" className="container-fluid">
                <row>
                <div id="homepage-header">
                    <button id="logout-button" type="button" class="btn btn-outline-dark btn-lg" onClick={this.props.logout}>Sign Out</button>
                </div>                  
                </row>
                <row>
                <div id="banner-container">
                    <h2 id="student-home-banner">READING AID</h2>
                </div>
                </row>
                <row>
                    <div id="text-menu" className="container-fluid"><TextMenu readText={this.readText}/></div>
                </row>

            </div>
       }
   }
}

export default Home;