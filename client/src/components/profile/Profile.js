import React, {Component} from 'react';
import propTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getProfileByHandle } from "../../actions/profileActions";

import Spinner from "../common/Spinner";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";


class Profile extends Component {

    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle,this.props.history);
        }
    }

    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;

        if(profile === null || loading){
            profileContent = <Spinner />;
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back to Profiles
                            </Link>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile={profile} />
                    <ProfileCreds education={profile.education} experience={profile.experience} />
                    {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
                </div>
            );
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    profile: propTypes.object.isRequired,
    getProfileByHandle: propTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

const mapDispatchToProps = {
    getProfileByHandle
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));