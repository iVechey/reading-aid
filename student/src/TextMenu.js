import React from 'react';
import "./TextMenu.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { Button } from "react-bootstrap"

class TextMenu extends React.Component {

    constructor(props) {
        super(props);
        this.displayTexts = this.displayTexts.bind(this);
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

    displayTexts() {

        const texts = this.state.texts;

        if (texts) {
            return Object.values(texts).map((text) => {
                return <h2>"{text.title}"</h2>
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