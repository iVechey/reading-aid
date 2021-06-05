//https://www.npmjs.com/package/audio-react-recorder
//this is where the code came form, it's not super complex

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
  componentDidMount() {
    this.setState({
      recordState: RecordState.START
    })
  }

  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    });
  };
  //audioData contains blob and blobUrl
  onStop = (data) => {
    //this.setState({recordState: RecordState.STOP})
    this.setState({
      audioData: data
    })
    //just here to show you everything
    //i think this is what we will need
    //console.log(audioData.url);
    this.props.audio(data)
  

  };

  render() {
    const { recordState } = this.state;

    //we may have to have the students
    //click a button to start the recording
    //you make canvas Width/Height both 0
    return (
      <div>
        <AudioReactRecorder
          canvasWidth={20}
          canvasHeight={20}
          backgroundColor="red"
          foreGroundColor="red"
          state={recordState}
          onStop={this.onStop}
        />
      </div>
    );
  }
}
export default Recorder;
