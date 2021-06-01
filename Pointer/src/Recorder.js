import React, { Component } from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

class Recorder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recordState: null
    }
  }

  start = () => {
    this.setState({
      recordState: RecordState.START
    })
  }
 
  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    })
  }
 
  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    //just here to show you everything
    console.log('audioData', audioData)
    //i think this is what we will need
    console.log(audioData.url)
  }
 
  render() {
    const { recordState } = this.state
    
    //we may have to have the students 
    //click a button to start the recording
    //you make canvas Width/Height both 0
    return (
      <div>
        Recorder: Check console for the audio file
        <AudioReactRecorder 
        canvasWidth = {20}
        canvasHeight = {20}
        backgroundColor = "red"
        foreGroundColor = "red"
        state={recordState} onStop={this.onStop} />
        
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
      </div>
    )
  }
}
export default Recorder;