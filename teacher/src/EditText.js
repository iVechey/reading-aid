import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {BsArrowLeft } from "react-icons/bs";

class AddText extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.state = {
            title: '',
            text: ''
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo(){
        let ref = firebase.database().ref("texts/" + this.props.textId);
        ref.once('value').then(snapshot => {
            if(snapshot.exists()) {
                const textObj = snapshot.val();
                this.setState({title: textObj.title});
                this.setState({text:textObj.text})
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.text.trim() === "" || this.state.title.trim() === ""){
            alert("Make sure to fill in all fields!");
        }
        else{
            var updates = {};
            updates["/texts/" + this.props.textId + "/title"] = this.state.title;
            updates["/texts/" + this.props.textId + "/text"] = this.state.text;
            firebase.database().ref().update(updates);

            alert("Changes to '" + this.state.title + "' have been saved!");
            this.props.getTexts();
            this.props.goBack();
        }
    }

    handleDelete(event){
        event.preventDefault();

        if(window.confirm("Are you sure you want to delete this text?")){

            //remove text from student/texts
            firebase.database().ref('students').once('value').then(snapshot=>{
                if(snapshot.exists()){
                    snapshot.forEach((child) => {
                        var text = child.child("/texts/"+this.props.textId);
                        if(text.val()!=null){
                            text.ref.remove();
                        }
                    });
                }
            });

            //remove text from teacher/texts
            var ref = firebase.database().ref('teachers/'+this.props.uid+'/texts/'+this.props.textId);
            ref.remove();
            
            //remove from text table
            ref = firebase.database().ref('texts/'+this.props.textId);
            ref.remove();

            this.props.getTexts();
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
            <div id="homepage-container" className="container-fluid">
                <h1><strong>Edit Texts</strong></h1>
                 <div id="back-arrow" type="button" role="button" tabIndex="0" onClick={() => {this.props.goBack(this.props.textId)}}> 
                        <BsArrowLeft />
                    </div>
                <div className="form-group">
                        <input name="title"  className="form-control form-control-lg title-input" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} />
                        <textarea className="textBox" type="textarea" placeholder="Enter Text Here" name="text" value={this.state.text} onChange={this.handleInputChange}/>
                        
                </div>
                <button id="save-text" type="button" className="btn btn-lg dark-btn" onClick={this.handleSubmit}>Save</button>     
                <button id="save-text" type="button" className="btn btn-lg dark-btn" onClick={this.handleDelete}>Delete</button>    
            </div>
        );
    }
}

export default AddText;
