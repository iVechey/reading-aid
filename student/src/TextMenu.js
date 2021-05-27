import React, { Component } from "react";
import "./TextMenu.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { Image } from "react-bootstrap/Image"
import { Button } from "react-bootstrap/Button"

class TextMenu extends React.Component {

    constructor(props) {
        super(props)
        this.getTexts = this.getTexts.bind(this);
        this.displayTexts = this.displayTexts.bind(this);
        this.state = {
            user: firebase.auth().currentUser,
            assignedTexts: [],
        }
    }

    componentDidMount() {
        this.getTexts();
    }

    getTexts() {
        let ref = firebase.database().ref("students").child(this.state.user.id).child("texts")
        ref.once("value").then(snapshot => {
            this.response = snapshot.val()["texts"];
            this.setState({ assignedTexts: this.response });
        })
    }

    // TODO: display logo for each text assigned - if timesRead < 3 clickable
    //       (on click redirect to specific text page)
    //       and if timesRead >= 3 grayed out and not clickable

    displayTexts() {

        const text = Object.values(this.state.texts)[i]
        let button

        {/* FIXME: Hopefully this is returning container for each text assigned */}

        return assignedTexts.texts ? (
            <div id="text-container" class="container-fluid">

                {/** FIXME: Need to add if-statement so button clickable only if timesRead < 3 */}

                if ({text.timesRead} < 3) {
                    button = <Button /*onClick={this.handleClick}*/ value={text.title} size="large"/>
                } else {
                    button = <Button value={text.title} size="large" disabled/>
                }
                return button
                <div id="checkmark-container" class="container-fluid">
                    {/* FIXME: Return 1 checkmark for each time read */}
                    <Image src="student\public\checkmark_img.png" />
                </div>

            </div>
        ) : (
            <span><strong>this student has no assigned texts</strong></span>
        )
    }

    render() {
        <div id="text-menu-container" className="container-fluid">
            {this.displayTexts()}
        </div>
    }

}

export default TextMenu