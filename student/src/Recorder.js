//https://www.npmjs.com/package/audio-react-recorder
//this is where the code came form, it's not super complex


/*Will get recordings from the students so that teachers could have access to 
student recordings. This will be a component on the student read text page*/
import React, { Component } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";

class Recorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordState: null,
      audioData: null
    };
  }
  //record when called
  componentDidMount() {
    this.setState({
      recordState: RecordState.START
    })
  }
  //stops the audio recording
  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    });
  };

  //audioData contains blob and blobUrl
  //this will get called once the recording stops
  onStop = (data) => {
    this.setState({
      audioData: data,
    })
    this.props.audio(data);
  };

  render() {
    const { recordState } = this.state;

    return (
      <div>
        <AudioReactRecorder
          canvasWidth={0}
          canvasHeight={0}
          state={recordState}
          onStop={this.onStop}
        />
      </div>
    );
  }
}
export default Recorder;

/*TODO 
chunk the recording, into single sentences or words
take the recording and put it into the database. 
*/

