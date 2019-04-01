import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {connect} from "react-redux";

import { getPost } from "../../actions/postActions";

import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";


class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    render() {
        const { post, loading} = this.props;
        let postContent;

        if(post.post === null || loading || Object.keys(post.post).length === 0){
            postContent = <Spinner />;
        } else {
            postContent = (
                <div>
                    <PostItem post={post.post} showActions={false}/>
                    <CommentForm postId={post.post._id} />
                    <CommentFeed postId={post.post._id} comments={post.post.comments}/>
                </div>
            );
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Back To Feed
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

const mapDispatchToProps = {
    getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);