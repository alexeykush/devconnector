import React, {Component} from 'react';
import propTypes from "prop-types"
import { connect } from "react-redux";

import { loginUser, logoutUser } from "../../actions/authActions";

import TextFieldGroup from "./../common/TextFieldGroup";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        if(this.props.auth.isAuth){
            this.props.history.push("/dashboard");
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevProps.errors !== this.props.errors){
            this.setState({
                errors: this.props.errors
            })
        } else if(this.props.auth.isAuth){
            this.props.history.push("/dashboard");
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const user = {
            email:this.state.email,
            password:this.state.password,
        };

        this.props.loginUser(user);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    error={errors.email}
                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={errors.password}
                                />

                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = {
    loginUser,
    logOut: logoutUser
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);