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

    componentDidMount() {
        firebase.database().ref("students").child(this.props.uid).once("value").then(snapshot => {
            this.setState({ student: snapshot.val(), loading: false });
        });
    }

    showTexts() {
        const texts = this.state.student.texts;
        return Object.values(texts).map((text, index) => {
            return <Dropdown.Item key={"text-"+index} onClick={() => {this.populateTable(text)}}>{text.title}</Dropdown.Item>;
        });
    }

    populateTable(text) {
        document.getElementById("text-dropdown").innerHTML = text.title;
        document.getElementById("tot_time").innerHTML = text.tot_time + " minutes";
        document.getElementById("num_words_read").innerHTML = text.num_words_read + " words";
        document.getElementById("wpm").innerHTML = text.wpm + " wpm";
        document.getElementById("diff_words").innerHTML = text.diff_words;
    }

    render () {
        const loading = this.state.loading;
        const student = this.state.student;
        return !loading && (
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
                            <h1>{student.username}</h1>
                            <h2>12345</h2>
                        </div>
                            <div id="recording-view-container">
                                <div id="recording-view">Recording View</div>
                                <div id="recording-controls"><IoPlayBackSharp /><IoPlaySharp /> <IoPlayForwardSharp /></div>
                            </div>
                    </div>
                </div>
                <button className="btn btn-lg dark-btn mt-3" onClick={this.props.assignTexts}>Assign New Text</button>
                {student.texts && 
                <div id="student-stats">
                    <Dropdown>
                        <Dropdown.Toggle className="light-btn mt-3" size="lg" variant="light" id="text-dropdown">
                            Books
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.showTexts()}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Table id="stats-table" className="mt-3" bordered>
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
                    </Table>
                </div>}
            </div>
        );
    }
}

export default SpecificStudentView;