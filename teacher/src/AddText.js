import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

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

        if (this.state.text.trim() === "" || this.state.title.trim() === ""){
            alert("Make sure to fill in all fields!");
        }
        else{
            var newTextKey = firebase.database().ref().push().key;
            
            var newText = {
                title: this.state.title,
                text: this.state.text,
                textId: newTextKey,
                owner: this.props.uid,
            }

            var updates = {};
            updates["/texts/" + newTextKey] = newText;
            updates["/teachers/" + this.props.uid + "/texts/" + newTextKey] = true;
            firebase.database().ref().update(updates);

            //connect textId to students in assign text
            // ref = firebase.database().ref("students/" + this.props.uid + "/texts/" + textId).set({
            //     textId: textId
            // });

            alert("New Text '" + this.state.title + "' created!");
            this.props.goBack();
        }

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
                        <input name="title"  className="form-control form-control-lg title-input" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} />
                        <textarea className="textBox" type="textarea" placeholder="Enter Text Here" name="text" value={this.state.text} onChange={this.handleInputChange}/>
                        
                </div>
                <button id="addText" type="button" className="btn btn-lg dark-btn" onClick={this.handleSubmit}>Save</button>       
            </div>
        );
    }
}

export default AddText;
