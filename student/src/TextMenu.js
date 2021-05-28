import React from 'react';
import "./TextMenu.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { Button } from "react-bootstrap"

class TextMenu extends React.Component {

    constructor(props) {
        super(props)
        this.getAssignedTextIds = this.getTexts.bind(this);
        this.displayTexts = this.displayTexts.bind(this);
        this.getTexts = this.getTexts.bind(this);
        this.state = {
            user: firebase.auth().currentUser,
            assignedTextIds: [],
            texts: [],
        }
    }

    componentDidMount() {
        this.getAssignedTextIds();
        this.getTexts();
    }

    getAssignedTextsIds() {
        firebase.database().ref('students').child(this.state.user.uid).child('texts').on('value', (snapshot) => {
            if(snapshot.exists()) {
                snapshot.forEach((child => {
                    this.state.assignedTextIds.push(child)
                }))
            }
        })
    }

    getTexts() {
        firebase.database().ref('texts').on('value', (snapshot) => {
            if(snapshot.exists()) {
                snapshot.forEach((child => {
                    if (this.state.assignedTextIds.includes(child.textId)) {
                        this.state.texts.push(child)
                    }
                }))
            }
        })
    }

    // TODO: display logo for each text assigned - if timesRead < 3 clickable
    //       (on click redirect to specific text page)
    //       and if timesRead >= 3 grayed out and not clickable

    displayTexts() {

            const texts = Object.values(this.state.texts);

            return texts.texts ? (
                this.state.texts.forEach((text => {
                    return (
                        <Button value={text.title} size="large"/>
                    )
                }))
            ) : (
                <h2>no texts have been assigned</h2>
            )
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