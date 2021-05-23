import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import AddText from "./AddText"
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

// import Collapsible from 'react-collapsible';
// import "bootstrap/dist/css/bootstrap.min.css";
// // To make rows collapsible
// import "bootstrap/js/src/collapse.js";

class AssignText extends React.Component {
    constructor(props) {
        super(props);
        this.renderTextRows = this.renderTextRows.bind(this);
        this.renderTextTable = this.renderTextTable.bind(this);
        this.renderStudentRows = this.renderStudentRows.bind(this);
        this.renderStudentTable = this.renderStudentTable.bind(this);
        this.getTexts = this.getTexts.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.showAddText = this.showAddText.bind(this);
        this.unshowAddText = this.unshowAddText.bind(this);
        this.studentPerClass = this.studentPerClass.bind(this);
        this.state = {
            texts: [],
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
        //this.getStudents()
    }

    getTexts(){
        this.state.texts = ["Toad and Frog","The Cat in the Hat"];
        this.setState({retrievedTexts: true});
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
        // this.getClassrooms(); //gets all codes for a teachers classrooms
        // for (const curClass of this.state.classrooms){ //for each teacher classroom
        //     const specificClassroom = [];
        //     let ref = firebase.database().ref("students");
        //     ref.once('value').then(snapshot => {
        //     if(snapshot.exists()) {
        //         snapshot.forEach((child) => {//parse through each student and find matching classroom code
        //             if (child.classroom == curClass){
        //                 specificClassroom.push(child.username)
        //             }
        //            // this.state.classrooms.push(child.val());
        //         });
        //         this.setState({retrievedClassrooms: true});
        //     }
        //     this.state.students.push(specificClassroom);
        // });
    // }

            // for (const student of classroom.students){//parse through student folder in database and find classroom matches and put in students[[],[]]
            //     students.push(student); //students doesnt exist currently in database, just num_students
            //     //students.push(classroom.students)
            // }
            // students.push(classroom.students); //students doesnt exist currently in database, just num_students
            // //students.push(classroom.students)
       // }
        //this.state.students = [["Tommy","John"],["Suzy","Adam"]];
        this.setState({retrievedStudents: true});
    }

    renderTextRows(){
        const texts = this.state.texts;
        //const index = 0;
         return texts.map((text, index) => {
            return (
                
                 <tr tabIndex="0" data-index={index} key={"text-"+index} onClick={() => {this.setState({showStudents:true})}}>  
                {/* </tr><tr tabIndex="0" data-index={index} key={"text-"+index}>   */}
                {/* onClick={() => {this.props.showClassroom(classroom.code)}}> */}
                        {/* <td>Toad and Frog {<button className="btn readingaid-btn m-2">Edit</button>}</td> */}
                        {/* <td>Toad and Frog {<div className="link-button">Edit</div>}</td> */}
                        <td>{text} {<div className="link-button">Edit</div>}</td>
                    </tr>
                );
             });
    }

    renderStudentRows(){
        const classrooms = this.state.classrooms;
        console.log("gets here");
        return classrooms.map((classroom, index) => { //for each [] of students in students[[],[],[]]
            return (
                 <tr class="" tabIndex="0" data-index={index} key={"class-"+index}>  {/*put drop down option here */}
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    {classroom.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {this.studentPerClass(classroom.students)}

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </tr>     
                );
             });
        // const students = this.state.students;
        // const classrooms = this.state.classrooms;
        // console.log("gets here");
        // return students.map((student, index) => { //for each [] of students in students[[],[],[]]
        //     return (
        //          <tr class="" tabIndex="0" data-index={index} key={"student-"+index}>  {/*put drop down option here */}
        //             <Accordion>
        //                 <Card>
        //                     <Card.Header>
        //                         <Accordion.Toggle as={Button} variant="link" eventKey="0">
        //                             {classrooms[index].name}
        //                         </Accordion.Toggle>
        //                     </Card.Header>
        //                     <Accordion.Collapse eventKey="0">
        //                         <Card.Body>
        //                             {this.studentPerClass(index)}

        //                         </Card.Body>
        //                     </Accordion.Collapse>
        //                 </Card>
        //             </Accordion>
        //         </tr>     
        //         );
        //      });

    }

    studentPerClass(students){
        //const students = this.state.students[index];
        return students.map((student) => {
            return(
            // <td><input type="radio" value="1" name="chosen" /> {student}</td>
            <div><input type="radio" value="1" name="chosen" /> {student.name}</div>//add an onClick to add students to book
            );
        });
    }
    renderTextTable() {
         const texts = this.state.texts;
        // if(texts.length > 0) {
            return (
                <div id="#text-table-container">
                    <h1>Your Texts</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Texts</th>
                                {/* <th>Code</th> */}
                                {/* <th>Number of Students</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTextRows()}
                            <tr tabIndex="0" data-index={texts.length} key={"create-new-text"} id="add-row">  
                                <td onClick={this.showAddText}>Create New Text {<h6 id="btn-circle">+</h6>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        // } else {
        //     return null;
        // }
    }

    renderStudentTable(){
        const students = this.state.students;
        return (
            <div id="#text-table-container">
                <h1>Assign Text</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Students</th>
                            {/* <th>Code</th> */}
                            {/* <th>Number of Students</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderStudentRows()}
                        {/* <tr tabIndex="0" data-index={texts.length} key={"create-new-text"} id="add-row">  
                            <td>Create New Text {<h6 id="btn-circle" onClick={this.showStudents()}>+</h6>}</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        )

    }

    showAddText(){
        this.setState({isAddingText:true});
    }

    unshowAddText(){
        this.setState({isAddingText:false});
    }

    render() {
        // const classroom = this.props.classroom;
        if (this.state.isAddingText){
            return <AddText unshowAddText={this.unshowAddText} uid={this.state.uid}/>
        }
        else{
            return (
                <div className="text-center">
                    <h1><strong>Add/Edit Texts</strong></h1>
                    <button className="btn readingaid-btn m-2" onClick={this.props.showDashboard}>Back</button>
                    {/* <button className="btn readingaid-btn m-2" onClick={() => {this.props.deleteClassroom(classroom.code)}}>DELETE</button> */}
                    {/* {this.state.retrievedTexts && this.renderTable()} */}

                    <div className="text_table_div" id="text-table-container">
                        {this.state.retrievedTexts && this.renderTextTable()}
                    </div>

                    <div className="student_table_div">
                        {this.state.retrievedStudents && this.state.showStudents && this.renderStudentTable()}
                    </div>
                    
                </div>
                
            );
        }
    }
}

export default AssignText;