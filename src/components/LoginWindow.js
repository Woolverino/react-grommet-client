import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import LSNHandler from '../tools/LSNHandler';
import {emit} from 'eiphop';// listen to ipc responses

class LoginWindow extends Component {
    
    
    render() {
        var handler = new LSNHandler()
        return (
            <div className="card">
                <div className="card">
                    <div className="card-body">
                        <h1>Connect</h1>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Host IP Address</span>
                        </div>
                        <input type="text" className="form-control" id="host-ip" placeholder="localhost"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Port</span>
                        </div>
                        <input type="text" className="form-control" id="port" placeholder="1337"></input>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Master Password</span>
                        </div>
                        <input type="password" className="form-control" id="master-pass"></input>
                    </div>
                    <button type="button" className="btn btn-primary" id="connect-button" onClick={ () => {
                        localStorage.setItem('lsn-session-host',document.getElementById("host-ip").value)
                        localStorage.setItem('lsn-session-port',document.getElementById("port").value)
                        localStorage.setItem('lsn-session-password',document.getElementById("master-pass").value)
                        this.props.setConnected(true)
                        emit('lsnRequest', {request: "GET POSTS", port: localStorage.getItem("lsn-session-port"), host: localStorage.getItem('lsn-session-host')})
                        .then(res => {
                            console.log(handler.handlePosts(res.result.posts.post))
                            this.props.updatePosts(handler.handlePosts(res.result.posts.post))
                        });
                    }} >Connect</button>
                </div>
            </div>
        );
    }

}

// PropTypes
LoginWindow.propTypes = {
}

export default LoginWindow;
