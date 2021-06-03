import React from "react";
import ReactDOM from "react-dom";
import Wordbank from "./wordbank";
import Pointer from "./pointer";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.max = 0;
    var pointer = '<span className= "pointer"></span>'
    /*this is the word array, its needed for pointer movement
      once the pointer moves the words turns to NaN. I did a prevWord=XXX
      and saved as variable. However, that didnt work as the Word. We could
      pass in the first word as a prop and then it would work. 
      this.currWord = props.firstWord etc
    */
    this.wordArr = [];
  }

  click = () => {
    this.wordArr.push(document.getElementById(this.index).innerHTML);
    document.getElementById(this.index).insertAdjacentHTML( 'beforeend', this.pointer);
      //<span className="pointer"></span>
    if (this.index > 0) {
      document.getElementById(this.index - 1).innerHTML -= <span class = "pointer">Pointer</span>;
      document.getElementById(this.index - 1).innerHTML = this.wordArr[
        this.index - 1
      ];
    } else {

    }

    ++this.index;
  };

  render() {
    return (
      <div>
        <header>
          <button onClick={this.click}>Click</button>
          Title Of the Story
        </header>
        <Wordbank></Wordbank>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
