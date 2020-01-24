import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {emit} from 'eiphop';// listen to ipc responses
import LSNHandler from '../tools/LSNHandler';

class Tester extends Component {
    
    state = {}

    render() {
        var handler = new LSNHandler()
        const {testerResponse} = this.state
        return (
            <div className="card">
                <div className="card">
                    <div className="card-body">
                        <h1>Tester</h1>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Request</span>
                        </div>
                        <input type="text" className="form-control" id="tester-request" placeholder="GET PROFILE\n"></input>
                    </div>
                    Response = {JSON.stringify(testerResponse)}
                    <button type="button" className="btn btn-primary" id="connect-button" onClick={() => {
                    emit('lsnRequest', {request: document.getElementById('tester-request').value, port: localStorage.getItem("lsn-session-port"), host: localStorage.getItem('lsn-session-host')})
                        .then(res => {
                            this.setState({testerResponse: res})
                        })
                    ;
                    }}>Send</button>
                </div>
            </div>
        );
    }

}

export default Tester;