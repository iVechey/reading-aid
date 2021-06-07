import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
/*this will recognize the voice and convert that to text, similar how siri works. We will have a list of commands of the text
which will call a function checking if they got the word correctly

Page:
https://www.npmjs.com/package/react-speech-recognition
*/

//Ideally this would be in a component. However, there is some strange thing about hooks which is beyond my expertise. You'll see an error
//Feel free to check out the error.
function Recognition(props) {
  const wordList = props.wordList;
  const commands = [{command: "2", callback: () => props.callBack({command: "to"})}];
  //map each word into a specific command command: word said callback: function call... we want the same function which checks the word said
  //with the taget word
  wordList.map((word) => {
    commands.push({
      command: word.replace(/[.,/#!$%^&*;:'{}=\-_`~()]/g, ""),
      callback: ({ command }) => props.callBack({ command })
    });
    return null;
  });
  //this will start the speech recognition with the given commands
  useSpeechRecognition({ commands });
  //drawback of the package: if user stops talking the recognition will stop listening, not ideal for students. 
  SpeechRecognition.startListening({ continuous: true });

  return null;
}

export default Recognition;
