import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'



class AddText extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            title: '',
            text: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        // get info from form
        //var textId = firebase.database().ref('texts').push().key;

        var textListRef = firebase.database().ref('texts');
       // var postListRef = firebase.database().ref('posts');
        var newTextRef = textListRef.push();
        // do {
        //     code = this.generateCode();
        // } while(this.state.existing_classrooms.includes(code));

        // create the text in text table
        newTextRef.set({
            title: this.state.title,
            text: this.state.text,
            owner: this.props.uid,
            //textId: newTextRef.key
        });


        firebase.database().ref("teachers/" + this.props.uid + "/texts/" + newTextRef.key).set({
            textId: newTextRef.key
        });
        
        //connect textId to students in assign text
        // ref = firebase.database().ref("students/" + this.props.uid + "/texts/" + textId).set({
        //     textId: textId
        // });

        alert("New Text '" + this.state.title + "' created!");
        // take them back to overview page
        // this.props.getTexts();
        this.props.goBack();

    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value});
    }

    render(){
        return(
            <div className="text-center">
                 <button className="btn btn-lg dark-btn" onClick={this.props.goBack}>Back</button>
                <div className="text-center"><h1><strong>Add Text</strong></h1></div>
                <div className="form-group">
                        <label>Title:</label>
                        <input name="title"  className="form-control form-control-lg" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} />
                        <textarea className="textBox" type="textarea" placeholder="Enter Text Here" name="text" value={this.state.text} onChange={this.handleInputChange}/>
                </div>
                <button id="addText" type="button" className="btn readingaid-btn m-2" onClick={this.handleSubmit}>Save</button>       
            </div>
        );
    }
}

export default AddText;
