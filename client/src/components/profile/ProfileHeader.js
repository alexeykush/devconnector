import React from 'react';

import isEmpty from "../../validation/isEmpty";

const ProfileHeader = ({ profile }) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            <img
                                className="rounded-circle"
                                src={profile.user.avatar}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4 text-center">{profile.user.name}</h1>
                        <p className="lead text-center">{profile.status} {!isEmpty(profile.company) &&
                        <span>at {profile.company}</span>}</p>
                        <p>{!isEmpty(profile.location) && <span>{profile.location}</span>}</p>
                        <p>
                            {!isEmpty(profile.website) && (
                                <a rel="noopener noreferrer" className="text-white p-2" href={profile.website} target="_blank">
                                    <i className="fas fa-globe fa-2x"/>
                                </a>
                            )}
                            {!isEmpty(profile.social.twitter) && (
                                <a rel="noopener noreferrer" className="text-white p-2" href={profile.social.twitter} target="_blank">
                                    <i className="fas fa-twitter fa-2x"/>
                                </a>
                            )}
                            {!isEmpty(profile.social.facebook) && (
                                <a rel="noopener noreferrer" className="text-white p-2" href={profile.social.facebook} target="_blank">
                                    <i className="fas fa-facebook fa-2x"/>
                                </a>
                            )}
                            {!isEmpty(profile.social.linkedin) && (
                                <a rel="noopener noreferrer" className="text-white p-2" href={profile.social.linkedin} target="_blank">
                                    <i className="fas fa-linkedin fa-2x"/>
                                </a>
                            )}
                            {!isEmpty(profile.social.instagram) && (
                                <a rel="noopener noreferrer" className="text-white p-2" href={profile.social.instagram} target="_blank">
                                    <i className="fas fa-instagram fa-2x"/>
                                </a>
                            )}

                            {!isEmpty(profile.social.youtube) && (
                                <a rel="noopener noreferrer" className="text-white p-2" href={profile.social.youtube} target="_blank">
                                    <i className="fab fa-youtube fa-2x"/>
                                </a>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;