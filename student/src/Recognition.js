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

  useSpeechRecognition({ commands });
  SpeechRecognition.startListening({ continuous: true });

  return null;
}

export default Recognition;
