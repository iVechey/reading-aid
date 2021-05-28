


import React, { Component } from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Shape } from 'react-konva';
import Pointer from "./Pointer"

/* this package is good to use since you are able to change
    shapes easily, so if we wanted to change it we can just 
    use line to. etc


/*
  Possible ideas for x. 
  
  1. If we want x in the middle, we need
  to have the width of the word. Is this possible? 

  2. We can also take x-coord of current word + x-coord of next word
  and divide by two, this will be offset though, but possible

  3. We can also have text boxes that we declare, each box has text 
  inside it, then we can always get the coord of the middle of the box
  , similar to idea 1. 

*/
class App extends Component {
  triggerMethod(){
    this.refs.point.moveX(400);
  }

  render() {
    return ( 
      <div>
        <button onClick = {this.triggerMethod.bind(this)}> hello </button>
        <Pointer ref = "point"> 
        </Pointer>
      </div>
      
      
    );
  };

  
};

render(<App />, document.getElementById('root'));

