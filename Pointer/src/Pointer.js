import React from "react";
import ReactDOM from "react-dom";
import Konva from "konva";
import { Stage, Layer, Shape } from 'react-konva';

class Pointer extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      //default states, will probably need to change
      position: {x: 100,
                 y: 200,
                 length: 50}
    }

    this.moveX = this.moveX.bind(this);
  }

  draw() {
    this.refs.child.draw()
  }
  //we only need to move in the x direction
  moveX(location) {
    this.setState({
      position: {length: location}
    });
    console.log(this.state.position.length)
    this.draw()
    
  }

  render() {
    return(
      //we can shrink the stage but I don't think that it's necessary
      <Stage width={window.innerWidth} height={window.innerHeight} >
          <Layer>
            <Shape 
              ref ="child"
              sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(this.state.position.x,this.state.position.y);
              context.lineTo(this.state.position.x+this.state.position.length, 
                            this.state.position.y+this.state.position.length);
              context.lineTo(this.state.position.x-this.state.position.length,
                            this.state.position.y+this.state.position.length);
              context.closePath(); // important method for Kanva, do not delete
              context.fillStrokeShape(shape);
      }}
      fill="blue" //inner portion. blue for focus
      stroke="black" //border
      strokeWidth={2} //border width
      /> 
          </Layer>
        </Stage>
    
    )
  }


}
export default Pointer;