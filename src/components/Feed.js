import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import Post from "./Post";
import {emit} from 'eiphop';// listen to ipc responses
import LSNHandler from '../tools/LSNHandler';


class Feed extends Component {
    
    componentDidMount() {
        setInterval(() => {
            this.setState(() => {
                var handler = new LSNHandler()
                emit('lsnRequest', {request: "GET POSTS", port: localStorage.getItem("lsn-session-port"), host: localStorage.getItem('lsn-session-host')})
                .then(res => {
                    console.log(handler.handlePosts(res.result.posts.post))
                    this.props.updatePosts(handler.handlePosts(res.result.posts.post))
                });
                return { unseen: "does not display" }
            });
        }, 1000);
    }

    render() {
        return this.props.posts.map((post) =>(
            <Post key={post.id} post={post} />
        ));
    }

}

// PropTypes
Feed.propTypes = {
    posts: PropTypes.array.isRequired
}

export default Feed;
