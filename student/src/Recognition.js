import React from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

function Recognition(props) {
  const wordList = props.wordList;
  const commands = [{command: "2", callback: () => props.callBack({command: "to"})}];
  //need to get from firebase, no clue how to access that yet

  wordList.map((word) => {
    commands.push({
      command: word.replace(/[.,/#!$%^&*;:'{}=\-_`~()]/g, ""),
      callback: ({ command }) => props.callBack({ command })
    });
    return null;
  });

  //this may be a problem when we update commands.
  const { transcript } = useSpeechRecognition({ commands });
  SpeechRecognition.startListening({ continuous: true });

  //the buttons are just for testing. there will only be a pointer
  return (
    <div className="App">
    </div>
  );
}

export default Recognition;
