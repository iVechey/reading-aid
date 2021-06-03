import React from 'react';
import "./styles.css"

export default function wordbank() {
  const text =
    "This is some sample text. Sample text is good for testing. One day I'll be an actual string instead of a made up one. I'm going to keep this going on forever to see if i can scroll down the screen since students will definitely want to do that";
  const words = text.split(" ");
  //id= 0-length
  //id="1"
  return (
    <div>
      {words.map((txt, index) => (
        <h1 id={index} key = {index}>{txt}</h1>
      ))}
    </div>
  );
}
