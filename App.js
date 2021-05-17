// npm install --save react-speech-recognition
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

//npm install --save react mic
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import { findAllByPlaceholderText } from "@testing-library/react";

const sent_array = [];

//this will use mic-record functions that I think we will need
function App() {
  function Record() {
    //constructor(props);
    //super(props);

    //this is default state, wrote to clarify
    this.state = {
      record: false,
    };
    //this is when you start recording, no need to create a variable.
    //blob is what the audio is.. see onStop
    startRecording = () => {
      this.setState({ record: true });
    };
    //this will stop the recording, you will
    stopRecording = () => {
      this.setState({ record: false });
    };
    //this function is required: what happens when audio stops
    //this is called once function goes from true-false, i think.
    //array may not be best. placeholder
    onStop = (recordedBlob) => {
      arr = [recordedBlob];
      sent_array.concat(sent_array, arr);
    };
  }

  words = ["This", "Represents", "the", "sentence", "we", "will", "use"];

  //this is the
  const Dictaphone = () => {
    listen = () => {
      SpeechRecognition.startListening();
    };

    stopListening = () => {
      SpeechRecognition.stopListening();
    };

    movePointer = () => {
      console.log("This will move the pointer");
    };

    //we need some sort of function that listens for each word..
    //built-in function command needs a callback function. Think of this as
    //a siri/Alexa command. "weather" or "read texts". Once that command is
    //inputted, the function callback uses resetTranscript, and we can
    //make the pointer move to the next word.

    const commands = [
      {
        command: "current Word",
        //will automatically reset transcript
        //we will need callback to move the pointer and change the word
        //also check for the last word, so the recording can stop
        callback: movePointer(),
      },
    ];

    const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  };
  //needs an export? the only thing that doesn't compile.
}
export default App;
