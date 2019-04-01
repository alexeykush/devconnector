import React, {Component} from 'react';
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextFieldGroup from "./../common/TextFieldGroup";

import { registerUser } from "./../../actions/authActions";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showError = this.showError.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuth){
            this.props.history.push("/dashboard");
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.errors !== this.props.errors){
            this.setState({
                errors: this.props.errors
            })
        }
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        };

        this.props.registerUser(newUser, this.props.history);
    }

    showError(el){
        return this.state.errors[el] ? <div className="invalid-feedback">{this.state.errors[el]}</div> : null
    }

    render() {

        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    error={errors.name}
                                />

                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a
       profile image, use a Gravatar email"
                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={errors.password}
                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    error={errors.confirmPassword}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = {
    registerUser
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Register));