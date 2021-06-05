import React from "react";
import "./ReadText.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { BsTriangleFill, BsArrowLeft } from "react-icons/bs";
import Recorder from "./Recorder";
import Recognition from "./Recognition";

class ReadText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: null,
            loading: true,
            index: 0,
            commands: [],
            wordList: [],
            audioFile: null
        }
        this.changeCallback = this.changeCallback.bind(this);
        this.getAudio = this.getAudio.bind(this);
    }

    componentDidMount() {
        firebase.database().ref("texts").child(this.props.text.textId).get().then(snapshot => {
            this.setState({ text: snapshot.val(), loading: false });
            this.setState({ wordList: snapshot.val().text.split(" ") });
        });
    }

    getAudio(audioFile) {
        this.setState({audio: audioFile});
    }

    changeCallback(spokenWord) {
        // remove punctuation
        var cleanWord = this.state.wordList[this.state.index].replace(
          /[.,/#!$%^&*;:'{}=\-_`~()]/g,
          ""
        );
        // check if the word spoken matches the word that the pointer is on
        if (cleanWord === spokenWord.command) {
          this.setState({ index: this.state.index + 1 });
        }
        
        // reached the end of the text
        if (this.state.index === this.state.wordList.length) {
            // retrieve the audio file
            this.refs.recorder.stop();
            console.log("Audio file: ", this.state.audio);
            // increment "times read" in the database
            const updates = {};
            updates["students/" + this.props.user.uid + "/texts/" + this.state.text.textId + "/timesRead"] = firebase.database.ServerValue.increment(1);
            firebase.database().ref().update(updates);
            // redirect to the text menu
            this.props.showTextMenu();
        }
    }

    render() {
        return !this.state.loading && (
            <div className="container">
                <Recognition wordList={this.state.wordList} callBack={this.changeCallback} />
                <Recorder ref="recorder" audio={this.getAudio} />
                <h2>{this.state.text.title}</h2>
                <div id="back-arrow" type="button" role="button" tabIndex="0" onClick={this.props.showTextMenu}>
                    <BsArrowLeft />
                </div>
                <div>
                    {this.state.text.text.split(" ").map((text, index) => {
                        if(index === this.state.index) {
                            //with a pointer
                            return (
                                <span className="words" id={index} key={index}>
                                    {text}
                                    <span className="block">
                                        <BsTriangleFill />
                                    </span>
                                </span>
                            );
                        } else {
                            return (
                                <span className="words" id={index} key={index}>
                                {text}
                                </span>
                            );
                        }
                    })}
                </div>
            </div>
        );

    }

}

export default ReadText;