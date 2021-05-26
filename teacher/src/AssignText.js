import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import AddText from "./AddText"
import { BsFillPlusCircleFill, BsPeopleCircle } from "react-icons/bs";
import { Accordion, Card, ListGroup, Button } from "react-bootstrap"


class AssignText extends React.Component {
    constructor(props) {
        super(props);
        this.renderTextRows = this.renderTextRows.bind(this);
        this.renderTextTable = this.renderTextTable.bind(this);
        this.renderStudentTable = this.renderStudentTable.bind(this);
        this.getTexts = this.getTexts.bind(this);
        this.renderStudents = this.renderStudents.bind(this);
        this.selectText = this.selectText.bind(this);
        this.state = {
            texts: [],
            selectedTextId: null,
            classrooms:[],
            retrievedTexts: false,
        }
    }

    componentDidMount() {
        this.getTexts();
        this.getClassrooms();
    }

    getTexts(){
        var defaultTextId;
        var index = 0;
        let ref = firebase.database().ref("teachers/" + this.props.uid + "/texts");
        ref.once('value').then(snapshot => {
            if(snapshot.exists()) {
                snapshot.forEach((child) => {
                    //find text in text table
                    if (index==0){defaultTextId = child.key;index++}
                    firebase.database().ref("texts/" + child.key).once('value').then(snapshot =>{
                        if(snapshot.exists()){
                            this.state.texts.push(snapshot.val());
                            this.setState({retrievedTexts: true});
                        }
                    });
                });
                this.setState({selectedTextId: defaultTextId});
                //console.log("default Id: "+defaultTextId);
            }
        });
    }

    getClassrooms() {
        let ref = firebase.database().ref("teachers/" + this.props.uid + "/classrooms");
        ref.once('value').then(snapshot => {
            if(snapshot.exists()) {
                snapshot.forEach((child) => {
                    this.state.classrooms.push(child.val());
                });
            }
        });
    }

    renderStudentTable() {
        return (
            <Accordion id="classrooms-table-container">
               {Object.values(this.state.classrooms).map((classroom, index) => {
                return (
                    <Card key={classroom.code}>
                        <Accordion.Toggle as={Button} variant="secondary" eventKey={""+index}>
                            {classroom.name}
                        </Accordion.Toggle>     
                        <Accordion.Collapse eventKey={""+index}>
                            <ListGroup variant="flush">
                                {this.renderStudents(index)}
                            </ListGroup>
                        </Accordion.Collapse>
                    </Card>
                    );
                })}
            </Accordion>        
            )
        }

    renderStudents(i){
        const classroom = Object.values(this.state.classrooms)[i];
        return classroom.students ? (
                Object.values(classroom.students).map((student, j) => {
                    return (
                        <ListGroup.Item action as="button" key={"student-" + j}>
                            <BsPeopleCircle />
                            <strong>{student.name}</strong>
                            <input type="checkbox" className= "checkbox-btn" value={student.uid} name="name" id={"cb-btn-"+i+"-"+j} onClick = {() => {this.handleAssign(student.uid,i,j)}}/>
                        </ListGroup.Item>
                    )
                })
         ) : ( 
         <span><strong>No students yet</strong></span>
          );
    }

    renderTextTable() {
         const texts = this.state.texts;
            return (
                <div id="classrooms-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Texts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.retrievedTexts? this.renderTextRows() : <span><strong>No texts yet</strong></span>}
                            <tr tabIndex="0" data-index={texts.length} key={"create-new-text"} id="add-row">  
                                <td onClick= {() => {this.props.addText()}}>Create New Text {<BsFillPlusCircleFill id="btn-circle"/>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
    }

    renderTextRows(){
        const texts = this.state.texts;
         return texts.map((text, index) => {
            return (  
            <tr class= {index==0? "tr-style tr-enabled":"tr-style"} tabIndex="0" data-index={index} key={"text-"+index} onClick={()=> this.selectText(index)}>
                <td>{text.title} {<div className="edit-link-btn">Edit</div>}</td>
            </tr>
            );
        });
    }
    

    selectText(index){
        const text = this.state.texts[index].textId;
        //console.log("just selected: "+this.state.texts[index].textId);
        this.setState({ selectedTextId: text});
        this.toggleTableColor(index);
    }

    toggleTableColor(index) {
         const lastSelected = document.querySelectorAll('tr[class="tr-style tr-enabled"]');
          if (lastSelected.length > 0) {
              lastSelected[0].setAttribute("class", "tr-style");
          }
          const selected = document.querySelectorAll('tr[data-index="'+index+'"]');
 
          if (selected.length > 0){
             selected[0].setAttribute("class", "tr-style tr-enabled")
          }
     }

    //updates the checkmarks
    updateStudentTable(text){
        //console.log("IN UPDATE: "+text);
        const cbs = document.querySelectorAll('input[type="checkbox"]');
        if (cbs!=null){
            var i;
            for (i = 0; i < cbs.length; ++i) {
                const box = cbs[i]
                const studentId = box.value;

                let ref = firebase.database().ref("students/" + studentId);
                ref.once('value').then(snapshot => {
                    if(snapshot.exists()) {
                        
                        var student = snapshot.val();
                        if (student.texts!=null && student.texts.hasOwnProperty(text)){
                            box.checked = true;
                        }
                        else{
                            box.checked = false;
                        }
                    }
                });
            }
        }
    }


    handleAssign(student,i,j){        
        const checked = document.getElementById("cb-btn-"+i+"-"+j).checked;
        var ref = firebase.database().ref('students/' + student + '/texts/' + this.state.selectedTextId);
        if (checked){
            ref.set({
                textId: this.state.selectedTextId
            });
        }
        else{
            ref.remove();
        }
    }

    render() {
            return (
                <div id="homepage-container" className="container-fluid">
                    <h1><strong>Add/Edit Texts</strong></h1>
                    {/* <h4>Current Selection: {this.state.selectedTextId !=null? this.state.selectedTextId:"nothing"}</h4> */}
                    <button className="btn btn-lg dark-btn" onClick={this.props.showDashboard}>Back</button>
                    {this.renderTextTable()}
                    {this.state.retrievedTexts && this.renderStudentTable()} 
                    {this.updateStudentTable(this.state.selectedTextId)}
                </div>
                
            );
    }
}

export default AssignText;