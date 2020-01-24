import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {emit} from 'eiphop';// listen to ipc responses
import LSNHandler from '../tools/LSNHandler';

class Poster extends Component {
    
    state = {}

    render() {
        var handler = new LSNHandler()
        const {testerResponse} = this.state
        return (
            <div className="card">
                <div className="card">
                    <div className="card-body">
                        <h1>Post</h1>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Title</span>
                        </div>
                        <input type="text" className="form-control" id="post-title" placeholder="Title"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Data</span>
                        </div>
                        <input type="text" className="form-control" id="post-data" placeholder="Post content here."></input>
                    </div>
                    <button type="button" className="btn btn-primary" id="connect-button" onClick={() => {
                        var request = "AUTH " + localStorage.getItem("lsn-session-password") + " POST TITLE " + document.getElementById("post-title").value +"; DATA " +document.getElementById("post-data").value  +";"
                        emit('lsnRequest', {request: request, port: localStorage.getItem("lsn-session-port"), host: localStorage.getItem('lsn-session-host')})
                        ;
                    }}>Send</button>
                </div>
            </div>
        );
    }

}

export default Poster;