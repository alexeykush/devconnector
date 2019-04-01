import React, {Component} from 'react';
import propTypes from "prop-types"
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

import { Link } from "react-router-dom";

class Navbar extends Component {

    handleLogout(){
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const { isAuth, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/feed" className="nav-link">
                        Post Feed
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link" onClick={() => this.handleLogout()}>
                        <img
                            src={user.avatar}
                            alt={user.name}
                            title="You must have a Gravatar connected to your email to display an image"
                            className="rounded-circle"
                            style={{
                                width: "25px",
                                marginRight: "5px"
                            }}
                        />
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link  to="/" className="navbar-brand">DevConnector</Link>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"> </span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/profiles" className="nav-link">
                                    Developers
                                </Link>
                            </li>
                        </ul>
                        {isAuth ? authLinks : guestLinks }
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: propTypes.func.isRequired,
    clearCurrentProfile: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    logoutUser,
    clearCurrentProfile
};

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
