import React from 'react';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { BsChevronRight, BsPeopleCircle } from "react-icons/bs";
import { Accordion, Card, ListGroup, Button } from "react-bootstrap"

class ClassOverview extends React.Component {
    constructor(props) {
        super(props);
        this.renderStudents = this.renderStudents.bind(this);
        this.showData = this.showData.bind(this);
        this.state = {
            user: firebase.auth().currentUser,
            classrooms: null,
            loading: true,
        }
    }

    componentDidMount() {
        let ref = firebase.database().ref("teachers").child(this.state.user.uid);
        ref.once("value").then(snapshot => {
            this.response = snapshot.val()["classrooms"];
            this.setState({ classrooms: this.response, loading: false, });
        });
    }

    /* Renders a list of the students in the given class; if no students, renders "no students yet" */
    renderStudents(i) {
        const classroom = Object.values(this.state.classrooms)[i];
        return classroom.students ? (
                Object.values(classroom.students).map((student, j) => {
                    return (
                        <ListGroup.Item action as="button" key={"student-" + j} onClick={() => {this.props.showStudent(student.uid)}}>
                            <BsPeopleCircle />
                            <strong>{student.name}</strong>
                            <BsChevronRight />
                        </ListGroup.Item>
                    )
                })
         ) : ( 
         <span><strong>No students yet</strong></span>
          );
    }

    /* Renders the accordion that shows all the user's classrooms and the students in them */
    showData() {
        return this.state.classrooms ? (
            <Accordion id="classrooms-table-container" defaultActiveKey="0">
               {Object.values(this.state.classrooms).map((classroom, index) => {
                return (
                    <Card key={classroom.code}>
                        <Accordion.Toggle as={Button} variant="secondary" eventKey={""+index}>
                            {classroom.name} (Class Code: {classroom.code})
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
            ) : null;
        }

    /* Shows classrooms/students accordion (above), create classroom button, assign text button, and a logout button */
    render() {
        const loading = this.state.loading;
        return (
            <div id="homepage-container" className="container-fluid">
                <button id="logout-btn" className="btn btn-lg light-btn" onClick={this.props.logout}>Sign Out</button>
                <h2 id="welcome-banner" className="text-center"><strong>ReadingAid</strong></h2>
                <div id="dashboard-buttons">
                    <button className="btn btn-lg light-btn" onClick={this.props.createClassroom}>Create New Class</button>
                    <button className="btn btn-lg light-btn" onClick={this.props.assignTexts}>Assign Texts</button>
                </div>
                <div className="clear-fix"></div>
                {!loading && this.showData()}
            </div>
        );
    }
}

export default ClassOverview;