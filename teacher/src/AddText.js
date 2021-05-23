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
            title: "",
            text: ""
        }
    }

    handleSubmit(event) {
        firebase.database().ref('teachers').child(user.uid).set({
            // texts: 
            // username: user.displayName,
            // email: user.email,
        });

    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value});
    }

    render(){
        return(
            <div className="text-center">
                 <button className="btn readingaid-btn m-2" onClick={this.props.unshowAddText}>Back</button>
                <div className="text-center"><h1><strong>Add Text</strong></h1></div>
                <div className="form-group">
                        <label>Title:</label>
                        <input name="Title"  className="form-control form-control-lg" placeholder="Title" value={this.state.email} onChange={this.handleInputChange} />
                        <textarea className="textBox" type="textarea" placeholder="Enter Text Here" name="textValue" onChange={this.handleInputChange}/>
                </div>
                <button id="addText" type="button" className="btn readingaid-btn m-2" onClick={this.handleSubmit}>Save</button>       

                {/* <Accordion>
                    <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Click me!
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Click me!
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion> */}
            </div>
        );
    }
}

export default AddText;
