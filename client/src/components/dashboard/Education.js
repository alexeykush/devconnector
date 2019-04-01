import React, {Component} from 'react';
import propTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {

    handleDelete(id){
        this.props.deleteEducation(id);
    }

    render() {
        const education = this.props.education.map(edu => (

            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD" date={edu.from} /> - {edu.current ? "Now" : <Moment format="YYYY/MM/DD" date={edu.to} />}
                </td>
                <td>
                    <button onClick={() => this.handleDelete(edu._id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {education}
                    </tbody>
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    deleteEducation: propTypes.func.isRequired
};

const mapDispatchToProps = {
    deleteEducation
};


export default connect(null,mapDispatchToProps)(Education);