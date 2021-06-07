import React from 'react';
import "./TextMenu.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class TextMenu extends React.Component {

    constructor(props) {
        super(props);
        this.displayTexts = this.displayTexts.bind(this);
        this.displayCheckmarks = this.displayCheckmarks.bind(this);
        this.makeTextButton = this.makeTextButton.bind(this);
        this.state = {
            user: firebase.auth().currentUser,
            texts: [],
        }
    }

    // Fetch the user's assigned texts from the database
    async componentDidMount() {
        const snapshot = await firebase.database().ref('students').child(this.state.user.uid).child('texts').get();
        if(snapshot.exists()) {
            this.setState({ texts: snapshot.val() });
            if(this.state.texts) {
                for (const [id, text] of Object.entries(this.state.texts)) {
                    const child = await firebase.database().ref('texts').child(id).child("title").get();
                    text.title = child.val();
                }
            }
            this.setState({ loading: false });
        }
    }

    // For the given text, create and return a container of checkmarks 
    // representing the number of time that text has been read
    displayCheckmarks(text) {

        let checkmarks = [];

        // Create an array of timesRead checkmarks
        for (let i = 0; i < text.timesRead; i++) {
            checkmarks.push(<img id="checkmark-img" src="images/checkmark_img.png" class="img-fluid" alt="checkmark"></img>);
        }

        // Return a container of the checkmarks generated
        return (
            <div id="single-checkmark-container">
                {checkmarks}
            </div>
        );

    }

    // Create and a return a button for the given text
    makeTextButton(text) {
        // if the user has read the text <3 times
        return (text.timesRead < 3) ? (
            // return a clickable button - on click, call readText to switch state to isReading
            <button id="text-button" type="button" class="btn btn-outline-dark btn-lg" onClick={() => {this.props.readText(text)}}>{text.title}</button>
        ) : (
            // if the user has read the text 3 times, return a disabled buttons
            <button id="text-button" type="button" class="btn btn-outline-dark btn-lg" disabled>{text.title}</button>
        )

    }

    // For each text, return a container containing a button for that text along with checkmarks representing times read
    displayTexts() {

        const texts = this.state.texts;

        if (texts) {
            return Object.values(texts).map((text) => {
                return <div id="text-container" className="container">
                        {this.makeTextButton(text)}
                        <div id="checkmark-container" class="container">
                            {this.displayCheckmarks(text)} 
                        </div>
                    </div>
            });
        } else {
            <h2>no texts have been assigned</h2>
        }

    }

    // Render a menu where each assigned text is represented by a button along with checkmarks
    // representing times that text has been read
    render() {
        return (
            <div id="text-menu-container" className="container-fluid">
                {this.displayTexts()}
            </div>
        )
    }

}

export default TextMenu