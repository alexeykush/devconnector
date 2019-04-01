import React from 'react';
import Moment from "react-moment";

import isEmpty from "../../validation/isEmpty";

const ProfileCreds = ({education, experience}) => {

    const expItems = experience.map(exp => (
        <li key={exp._id} className="list-group-item">
            <h4>{exp.company}</h4>
            <p>
                <Moment format="YYYY/MM/DD" date={exp.from} /> - {exp.current ? "Now" : <Moment format="YYYY/MM/DD" date={exp.to} />}
            </p>
            <p><strong>Position: </strong>{exp.title}</p>
            <p>
                {!isEmpty(exp.location) && <span><strong>Location: </strong> {exp.location}</span>}
            </p>
            <p>
                {!isEmpty(exp.description) && <span><strong>Description: </strong> {exp.description}</span>}
            </p>
        </li>
    ));

    const eduItems = education.map(edu => (
        <li key={edu._id} className="list-group-item">
            <h4>{edu.school}</h4>
            <p>
                <Moment format="YYYY/MM/DD" date={edu.from} /> - {edu.current ? "Now" : <Moment format="YYYY/MM/DD" date={edu.to} />}
            </p>
            <p><strong>Degree: </strong>{edu.degree}</p>
            <p><strong>Field of Study: </strong>{edu.fieldofstudy}</p>
            <p>
                {!isEmpty(edu.description) && <span><strong>Description: </strong> {edu.description}</span>}
            </p>
        </li>
    ));

    return (
        <div className="row">
            <div className="col-md-6">
                <h3 className="text-center text-info">Experience</h3>
                {expItems.length ? (
                    <ul className="list-group">
                        {expItems}
                    </ul>
                ) : (
                    <p className="text-center">No Experience Listed</p>
                )}
            </div>
            <div className="col-md-6">
                <h3 className="text-center text-info">Education</h3>
                {eduItems.length ? (
                    <ul className="list-group">
                        {eduItems}
                    </ul>
                ) : (
                    <p className="text-center">No Education Listed</p>
                )}
            </div>

        </div>
    );
};

export default ProfileCreds;
