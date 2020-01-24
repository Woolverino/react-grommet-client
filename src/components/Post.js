import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import LSNHandler from '../tools/LSNHandler';

class Post extends Component {
    render() {
        var handler = new LSNHandler();
        return(
            <div className="card">
                    <div className="card-body">
                        <h3>{this.props.post.title}</h3>
                        <p> {handler.formatDate(this.props.post.date)} </p>
                        <p>{this.props.post.data}</p>
                    </div>
            </div>
        );
    }

}

// PropTypes
Post.propTypes = {
    post: PropTypes.object.isRequired
}

export default Post;
