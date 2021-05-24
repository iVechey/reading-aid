import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import AddText from "./AddText"
import { BsFillPlusCircleFill, BsPeopleCircle } from "react-icons/bs";
import { Accordion, Card, ListGroup, Button } from "react-bootstrap"


/*TODO:
* 1) change text table to have texId value and get rid of this.state.texIds
* 2) highlight or display which text we are currently selected
* 3) fix css
* 4) get rid of addText view stuff in here bc i moved to home.js
*/

class AssignText extends React.Component {
    constructor(props) {
        super(props);
        this.renderTextRows = this.renderTextRows.bind(this);
        this.renderTextTable = this.renderTextTable.bind(this);
        this.renderStudentTable = this.renderStudentTable.bind(this);
        this.getTexts = this.getTexts.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.showAddText = this.showAddText.bind(this);
        this.unshowAddText = this.unshowAddText.bind(this);
        this.renderStudents = this.renderStudents.bind(this);
        this.selectText = this.selectText.bind(this);
        this.state = {
            texts: [],
            selectedText: null,
            textIds: [],//update text table so we dont have to do this
            students: [],
            classrooms:[],
            user: firebase.auth().currentUser,
            retrievedTexts: false,
            retrievedStudents:false,
            showStudents:false,
            isAddingText:false,
        }
    }

    componentDidMount() {
        this.getTexts();
        this.getClassrooms();
    }

    getTexts(){
        //for each textId in teacher table
        let ref = firebase.database().ref("teachers/" + this.props.uid + "/texts");
        ref.once('value').then(snapshot => {
            if(snapshot.exists()) {
                snapshot.forEach((child) => {
                    //find text in text table
                    this.state.textIds.push(child.key);
                    
                    let textRef = firebase.database().ref("texts/" + child.val().textId).once('value').then(snapshot =>{
                        if(snapshot.exists()){
                            this.state.texts.push(snapshot.val());
                            this.setState({retrievedTexts: true});
                        }
                    });
                });
                this.setState({selectedText: this.state.textIds[0]});
            }
        });
    }

    getClassrooms() {
        let ref = firebase.database().ref("teachers/" + this.state.user.uid + "/classrooms");
        ref.once('value').then(snapshot => {
            if(snapshot.exists()) {
                snapshot.forEach((child) => {
                    this.state.classrooms.push(child.val());
                });
                this.setState({retrievedClassrooms: true});
            }
        });
    }

    getStudents(){
        this.getClassrooms(); //gets all codes for a teachers classrooms
        for (const curClass of this.state.classrooms){ //for each teacher classroom
            const specificClassroom = curClass.students.name;
            this.state.students.push(specificClassroom);
        } 
        this.setState({retrievedStudents: true});
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
                            <input type="checkbox" className= "radio-btn" value={student.uid} name="name" id={"radio-btn-"+i+"-"+j} onClick = {() => {this.handleRadioClick(student.uid,i,j)}}/>
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
                
            <tr id="tr-style" tabIndex="0" data-index={index} key={"text-"+index} onClick={()=> this.selectText(index)}>  {/* stop setting showStudents here instead set it in updatet*/}
                <td>{text.title} {<div className="link-button">Edit</div>}</td>
            </tr>
                );
             });
    }
    

    selectText(index){
        const text = this.state.textIds[index];//todo: change selectedText to just be id once we update text table
        this.setState({ selectedText: text});
        //this.updateStudentTable(text); //REPETITIVE dont need

    }

    // shouldCheck(studentId){

    //     console.log("in should SELECTED: "+this.state.selectedText);
    //     const text = this.state.selectedText;
    //     let ref = firebase.database().ref("students/" + studentId);
    //             ref.once('value').then(snapshot => {
    //                 if(snapshot.exists()) {
    //                     var student = snapshot.val();
    //                     //console.log(student);
    //                     //console.log(student.username);
    //                     //console.log(student.texts);
    //                     if (student.texts!=null && student.texts.hasOwnProperty(text)){
    //                         //box.checked = true;
    //                         console.log("true");
    //                         return true;
    //                     }
    //                     else{
    //                         //box.checked = false;
    //                         console.log("false");
    //                         return false;
    //                     }
    //                 }
    //             });

    // }

    //updates the checkmarks
    updateStudentTable(text){
      // document.querySelector('tr[key="text-{index}"]').setAttribute("background-color","#123456");
        
        //console.log("IN UPDATE);
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
                        //console.log(student);
                        //console.log(student.username);
                        //console.log(student.texts);
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


    handleRadioClick(student,i,j){        
        const cb = document.getElementById("radio-btn-"+i+"-"+j);
           const checked = document.getElementById("radio-btn-"+i+"-"+j).checked;
           var ref = firebase.database().ref('students/' + student + '/texts/' + this.state.selectedText);
            if (checked){
                ref.set({
                    textId: this.state.selectedText
                });
            }
            else{
                //console.log("remove from database");
                ref.remove();
            }
    }

    showAddText(){
        this.setState({isAddingText:true});
    }

    unshowAddText(){
        this.setState({isAddingText:false});
        //this.updateStudentTable(this.state.selectedText);//to update table again after hitting back button
    }

    render() {
        if (this.state.isAddingText){
            return <AddText goBack={this.unshowAddText} uid={this.props.uid} getTexts={this.getTexts}/>
        }
        else{
            return (
                <div id="homepage-container" className="container-fluid">
                    <h1><strong>Add/Edit Texts</strong></h1>
                    <h4>Current Selection: {this.state.selectedText !=null? this.state.selectedText:"nothing"}</h4>
                    <button className="btn btn-lg dark-btn" onClick={this.props.showDashboard}>Back</button>
                    {this.renderTextTable()}
                    {this.state.retrievedTexts && this.renderStudentTable()} 
                    {this.updateStudentTable(this.state.selectedText)}
                </div>
                
            );
        }
    }
}

export default AssignText;