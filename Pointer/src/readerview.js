import React from "react";
import ReactDOM from "react-dom";
import Recorder from "./recorder"
import {BsTriangleFill } from "react-icons/bs"

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
      this.index = 0;
      //const sentence = props.text
      this.state = {
        //this will be where our recording is
        index: 0,
        recording: null

      };
    /*this is the word array, its needed for pointer movement
      once the pointer moves the words turns to NaN. I did a prevWord=XXX
      and saved as variable. However, that didnt work as the Word. We could
      pass in the first word as a prop and then it would work. 
      this.currWord = props.firstWord etc
    */
    this.wordArr = [];
  }

  

  click = () => {
    this.setState({index: this.index++})
  }

  end = () => {
    

    // 1. upload audio file to firebase
    // 2. increment text read?
    // 3. return to main screen
  }

  render() {
    const sentence = "This is a longer sentence, we are just using this to test out some things on our page."
    const words = sentence.split(" ")

    return (
      <div>
        <Recorder></Recorder>
        <header>
          <button onClick={this.click}>Click</button>
          Title Of the Story
        </header>
        {words.map((txt, index) => {
          if(index === this.state.index) {
            //with a pointer
          return <span className = "words" id={index} key = {index}>{txt} <span className = "block"><BsTriangleFill/></span> </span>
          } else {
            return <span className = "words" id={index} key = {index}>{txt}</span>
          }
      })}
        
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
