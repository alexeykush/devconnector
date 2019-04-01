import React, {Component} from 'react';
import propTypes from "prop-types";
import { connect } from "react-redux";

import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {

    handleDelete(postId,commentId){
        this.props.deleteComment(postId,commentId);
    }

    render() {
        const { comment, postId, auth } = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <div>
                            <img
                                className="rounded-circle d-none d-md-block"
                                 src={comment.avatar}
                                 alt=""
                            />
                        </div>
                        <br/>
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>
                        {
                            comment.user === auth.user.id &&
                            <button
                                type="button"
                                onClick={() => this.handleDelete(postId,comment._id)}
                                className="btn btn-danger mr-1"
                            >
                                <i className="fas fa-times" />
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
  deleteComment: propTypes.func.isRequired,
  comment: propTypes.object.isRequired,
  postId: propTypes.string.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);