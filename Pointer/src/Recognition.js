import "./styles.css";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

function Recognition(props) {
  const [index, setIndex] = useState(0);
  const wordList = props.wordList;
  const commands = [];
  //need to get from firebase, no clue how to access that yet

  wordList.map((word) => {
    commands.push({
      command: word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
      callback: ({ command }) => props.callBack({ command })
    });
  });

  //this may be a problem when we update commands.
  const { transcript } = useSpeechRecognition({ commands });
  //SpeechRecognition.startListening({ continuous: true });

  function startListen() {

    SpeechRecognition.startListening({ continuous: true });
  }

  //the buttons are just for testing. there will only be a pointer
  return (
    <div className="App">
      <p id="transcript">Transcript: {transcript}</p>
      <button onClick={startListen}> Start</button>
    </div>
  );
}

export default Recognition;
