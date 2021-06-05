import React from "react";
import ReactDOM from "react-dom";
import Recorder from "./recorder";
import { BsTriangleFill } from "react-icons/bs";
import "./styles.css";
import Recognition from "./recognition";
//import firebase from "firebase/app"
//import "firebase/analytics"


class Readerview extends React.Component {
  
  constructor(props) {
    super(props);
    this.index = 0;
    //const sentence = props.text
    this.state = {
      index: 0,
      commands: [],
      wordList: null,
      loading: true,
      audio: null
    };
    this.changeCallback = this.changeCallback.bind(this);
    this.getAudio = this.getAudio.bind(this)
    /*this is the word array, its needed for pointer movement
      once the pointer moves the words turns to NaN. I did a prevWord=XXX
      and saved as variable. However, that didnt work as the Word. We could
      pass in the first word as a prop and then it would work. 
      this.currWord = props.firstWord etc
    */
    this.wordArr = [];
  }

  getAudio(audioFile) {
    console.log(audioFile)
    this.setState({audio: audioFile})

  }

  componentDidMount() {
    // Set up Firebase config
    /*var firebaseConfig = {
      apiKey: "AIzaSyAJ0fQ_zRpTXxm7BpJmsJs5nwQGlOPjg6M",
      authDomain: "readingaid-42419.firebaseapp.com",
      projectId: "readingaid-42419",
      storageBucket: "readingaid-42419.appspot.com",
      messagingSenderId: "1007749465687",
      appId: "1:1007749465687:web:571c35a33931c55edc4512",
      measurementId: "G-YLN0KB3RL5",
      databaseURL: "https://readingaid-42419-default-rtdb.firebaseio.com/",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();*/

    var sentence = "word, This. .is";
    this.setState({ wordList: sentence.split(" "), loading: false });
  }
  callOnStop() {
    this.refs.recorder.stop()
  }

  end = () => {
    // 1. upload audio file to firebase
    // 2. increment text read?
    // 3. return to main screen
  };
  

  changeCallback(spokenWord) {
    var cleanWord = this.state.wordList[this.state.index].replace(
      /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
      ""
    );
    if (cleanWord === spokenWord.command) {
      this.setState({ index: this.state.index + 1 });
    }

    if (this.state.index === this.state.wordList.length) {
      console.log("The student is finished...");
      this.callOnStop()
      console.log("here: ",this.state.audio)
    }
  }

  render() {
    return (
      !this.state.loading && (
        <div>
          <Recorder ref = "recorder"
            audio = {this.getAudio}
            />
          <header>
            Title Of the Story
          </header>
          <Recognition
            wordList={this.state.wordList}
            callBack={this.changeCallback}
          />
          {this.state.wordList.map((txt, index) => {
            if (index === this.state.index) {
              //with a pointer
              return (
                <span className="words" id={index} key={index}>
                  {txt}{" "}
                  <span className="block">
                    <BsTriangleFill />
                  </span>{" "}
                </span>
              );
            } else {
              return (
                <span className="words" id={index} key={index}>
                  {txt}
                </span>
              );
            }
          })}
        </div>
      )
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
