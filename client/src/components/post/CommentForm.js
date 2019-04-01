import React, {Component} from 'react';
import propTypes from "prop-types";
import { connect } from "react-redux";

import { addComment } from "../../actions/postActions";

import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";


class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.errors !== this.props.errors){
            this.setState({
                errors: this.props.errors
            })
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        const { user } = this.props.auth;
        const { postId } = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.setState({
            text: ""
        });

        this.props.addComment(postId, newComment);
    }

    render() {
        const { text,errors } = this.state;

        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Make a comment...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="Reply to post"
                                    name="text"
                                    value={text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

CommentForm.propTypes = {
    addComment: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    postId: propTypes.string.isRequired,
    errors: propTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = {
    addComment
};


export default connect(mapStateToProps,mapDispatchToProps)(CommentForm);