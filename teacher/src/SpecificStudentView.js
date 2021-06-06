import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import { BsArrowLeft } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import "./Home.css";
import { IoPlayBackSharp, IoPlaySharp, IoPlayForwardSharp } from "react-icons/io5";

class SpecificStudentView extends React.Component {
    constructor(props) {
        super(props);
        this.showTexts = this.showTexts.bind(this);
        this.populateTable = this.populateTable.bind(this);
        this.state = {
            student: null,
            loading: true,
        }
    }

    /* Gets the student's assigned texts from the database */
    async componentDidMount() {
        const snapshot = await firebase.database().ref("students").child(this.props.uid).get();
        if(snapshot.exists()) {
            this.setState({ student: snapshot.val() });
            if(this.state.student.texts) {
                for (const [id, text] of Object.entries(this.state.student.texts)) {
                    const child = await firebase.database().ref("texts").child(id).child("title").get();
                    text.title = child.val();
                }
            }
            this.setState({ loading: false });
        }
    }

    /* Renders the dropdown of student's assigned texts, disabling the ones they haven't read yet */
    showTexts() {
        const texts = this.state.student.texts;
        if(texts) {
            return Object.values(texts).map((text) => {
                if(text.timesRead > 0) {
                    return  <Dropdown.Item key={text.textId} onClick={() => {this.populateTable(text)}}>"{text.title}"</Dropdown.Item>;
                } else {
                    return <Dropdown.Item key={text.textId} disabled>"{text.title}" (not read yet)</Dropdown.Item>
                }
            });
        } else {
            return <Dropdown.Item disabled>No texts assigned yet</Dropdown.Item>;
        }
    }

    /* Populate the bottom table with stats once a specific text is selected */
    populateTable(text) {
        document.getElementById("text-dropdown").innerHTML = text.title;
        document.getElementById("tot_time").innerHTML = text.tot_time + " minutes";
        document.getElementById("num_words_read").innerHTML = text.num_words_read + " words";
        document.getElementById("wpm").innerHTML = text.wpm + " wpm";
        document.getElementById("diff_words").innerHTML = text.diff_words;
    }

    /* Shows user info (name, id, photo), button to assign texts, dropdown of their assigned texts, a table for reading stats, and a space for the recording view */
    render () {
        return !this.state.loading && (
            <div id="student-view-container">
                <div id="back-arrow" type="button" role="button" tabIndex="0" onClick={this.props.showDashboard}>
                    <BsArrowLeft />
                </div>
                <div>
                    <div id="student-info">
                        <div id="photo-container">
                            <FaUserCircle />
                        </div>
                        <div id="name-container">
                            <h1>{this.state.student.username}</h1>
                            <h2>12345</h2>
                        </div>
                        {this.state.student.texts && 
                        <div id="recording-view-container">
                            <div id="recording-view">Recording View</div>
                            <div id="recording-controls"><IoPlayBackSharp /><IoPlaySharp /> <IoPlayForwardSharp /></div>
                        </div>}
                    </div>
                </div>
                <button className="btn btn-lg dark-btn mt-3" onClick={this.props.assignTexts}>Assign New Text</button>
                <div id="student-stats">
                    <Dropdown>
                        <Dropdown.Toggle className="light-btn mt-3" size="lg" variant="light" id="text-dropdown">
                            Books
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.showTexts()}
                        </Dropdown.Menu>
                    </Dropdown>
                    {this.state.student.texts && 
                    <Table id="stats-table" className="mt-5" bordered>
                        <tbody>
                            <tr>
                                <th>Total Time</th>
                                <td id="tot_time"></td>
                            </tr>
                            <tr>
                                <th>Number of Words Read</th>
                                <td id="num_words_read"></td>
                            </tr>
                            <tr>
                                <th>Words Per Minute</th>
                                <td id="wpm"></td>
                            </tr>
                            <tr>
                                <th>Difficult Words</th>
                                <td id="diff_words"></td>
                            </tr>
                        </tbody>  
                    </Table>}
                </div>
            </div>
        );
    }
}

export default SpecificStudentView;