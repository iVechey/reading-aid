import "./styles.css";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import Recorder from "./Recorder"

/*Problems:
  1. update commmand list: the command list will properly update. However, 
  the command list from transcript will only recognize the initialized ones. 

  ie if target word is "the" once it's said the new target word can be changed, 
  the speech recogintion hook won't recognize the change-tried setCommands() got error. 


  Solution: Think of solution as a new Object with a new command list in java. There may 
  be a simple way to do this in React.  

  Another possible solution would be to have a list of every word in the text as a command
  , this probably isn't ideal. 

  2. Move pointer: See Pointer.js
    -The coordinates move properly but the shape doesn't show up once moved. 

    Solution: It is possible to move the shape. Check konva documentation 
    or put multiple pointers on the screen

  3. Words must be in some sort of container that goes side by side. rather than 
   on top of one another. 
   
   Solution: This is probably a CSS solution, other than that it seems easy. 
*/

function Recognition() {
  const [index, setIndex] = useState(0);

  //need to get from firebase, no clue how to access that yet
  const wordList = ["hello", "this", "is", "a", "word", "list"];

  //command, if : said
  //callback, then : do this
  var commands = [
    {
      command: "word",
      callback: () => changeCallback()
    },
    {
      //needs more than one command, so create an easter egg
      command: "Easter Egg",
      callback: () => console.log("This is a hidden easter egg")
    }
  ];
  //this may be a problem when we update commands.
  var { transcript } = useSpeechRecognition({ commands });

  function startListen() {
    console.log(commands);
    //if continuous == false, it will stop listening to when silent.
    //commands work fine with continuous
    SpeechRecognition.startListening({ continuous: true });
  }
  function changeCallback() {
    console.log(index);
    console.log(commands[0].command);

    //this does get accessed
    if (index < wordList.length) {
      commands[0].command = wordList[index];
      setIndex(index + 1);
    } else {
      //send the recording to firebase
      console.log("The student is finished...");
    }
  }
  //the buttons are just for testing. there will only be a pointer
  return (
    <div className="App">
      <p id="transcript">Transcript, Testing only, should be hidden: {transcript}</p>
      <button onClick={startListen}> Start</button>
      <button onClick={changeCallback}> CallBack </button>
      <Recorder></Recorder>
    </div>
  );
}

export default Recognition;
