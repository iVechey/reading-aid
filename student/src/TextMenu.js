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

    displayCheckmarks(text) {

        let checkmarks = [];

        for (let i = 0; i < text.timesRead; i++) {
            checkmarks.push(<img id="checkmark-img" src="images/checkmark_img.png" class="img-fluid" alt="checkmark"></img>);
        }

        return (
            <div id="single-checkmark-container">
                {checkmarks}
            </div>
        );

    }

    makeTextButton(text) {

        return (text.timesRead < 3) ? (
            <button id="text-button" type="button" class="btn btn-primary btn-lg btn-block" onClick={() => {this.props.readText(text)}}>{text.title}</button>
        ) : (
            <button id="text-button" type="button" class="btn btn-primary btn-lg btn-block" disabled>{text.title}</button>
        )

    }

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

    render() {
        return (
            <div id="text-menu-container" className="container-fluid">
                {this.displayTexts()}
            </div>
        )
    }

}

export default TextMenu