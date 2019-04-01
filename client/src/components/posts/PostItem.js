import React, { Component } from 'react';
import propTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {

    handleLike(id, likes){
        if(this.findUserLike(likes)) return false;
        this.props.addLike(id)
    }

    handleUnlike(id, likes){
        if(!this.findUserLike(likes)) return false;
        this.props.removeLike(id)
    }

    handleDelete(id){
        this.props.deletePost(id);
    }

    findUserLike(likes){
        const { auth } = this.props;
        if(likes.filter(like => like.user === auth.user.id).length > 0){
            return true
        } else {
            return false;
        }
    }

    render() {
        const { post, auth, showActions = true } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="">
                            <img className="rounded-circle d-none d-md-block"
                                 src={post.avatar}
                                 alt=""/>
                        </a>
                        <br/>
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {
                            showActions && (
                                <React.Fragment>
                                    <button
                                        type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.handleLike(post._id, post.likes)}
                                    >
                                        <i className={classnames("fas fa-thumbs-up", {
                                            "text-info" : this.findUserLike(post.likes)
                                        })} />
                                        <span className="badge badge-light">{post.likes.length}</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.handleUnlike(post._id, post.likes)}
                                    >
                                        <i className="text-secondary fas fa-thumbs-down" />
                                    </button>
                                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                        Comments
                                    </Link>
                                    {
                                        post.user === auth.user.id &&
                                        <button
                                            type="button"
                                            onClick={() => this.handleDelete(post._id)}
                                            className="btn btn-danger mr-1"
                                        >
                                            <i className="fas fa-times" />
                                        </button>
                                    }
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    post: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    deletePost: propTypes.func.isRequired,
    addLike: propTypes.func.isRequired,
    removeLike: propTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    deletePost,
    addLike,
    removeLike
};

export default connect(mapStateToProps,mapDispatchToProps)(PostItem);
