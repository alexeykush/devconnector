import React, {Component} from 'react';
import propTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {createOrEditProfile, getCurrentProfile} from "../../actions/profileActions";

import TextFieldGroup from "./../common/TextFieldGroup";
import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";
import SelectListGroup from "./../common/SelectListGroup";
import InputGroup from "./../common/InputGroup";
import Spinner from "./../common/Spinner"

import isEmpty from "../../validation/isEmpty";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            displaySocialInputs: false,
            handle: "",
            company: "",
            website: "",
            location: "",
            status: "",
            skills: [],
            githubusername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSocialInputs = this.toggleSocialInputs.bind(this);
    }


    componentDidMount() {
        this.props.getCurrentProfile();
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            })
        }
        if (!isEmpty(this.props.profile.profile) && prevProps.profile.profile !== this.props.profile.profile) {
            const profile = this.props.profile.profile;
            const newProfile = {};
            for(let key in profile){
                if(profile.hasOwnProperty(key) && this.state.hasOwnProperty(key)){
                    newProfile[key] = profile[key];
                }
            }
            this.setState({
                ...newProfile,
                ...profile.social
            })
        }
    }

    toggleSocialInputs() {
        this.setState({
            displaySocialInputs: !this.state.displaySocialInputs
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills.join(","),
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        };

        this.props.createOrEditProfile(profileData, this.props.history)
    };

    render() {
        const { profile, loading } = this.props.profile;

        if(profile === null || loading) return <Spinner />;

        const {errors, displaySocialInputs} = this.state;

        const options = [
            {label: "* Select Professional Status", value: "0"},
            {label: "Developer", value: "Developer"},
            {label: "Junior Developer", value: "Junior Developer"},
            {label: "Senior Developer", value: "Senior Developer"},
            {label: "Manager", value: "Manager"},
            {label: "Student", value: "Student"},
            {label: "Teacher", value: "Teacher"},
            {label: "Intern", value: "Intern"},
            {label: "Other", value: "Other"},
        ];

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="YouTube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">
                               Edit Profile
                            </h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info="Give us an idea where you are at in your career"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own website or a company one"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City"
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills.join(",")}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,Java)"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want yur latest repos and a Github link, include your username"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={this.toggleSocialInputs}
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    profile: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,
    createOrEditProfile: propTypes.func.isRequired,
    getCurrentProfile: propTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

const mapDispatchToProps = {
    createOrEditProfile,
    getCurrentProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));