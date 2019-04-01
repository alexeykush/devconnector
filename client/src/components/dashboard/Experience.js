import React, {Component} from 'react';
import propTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {

    handleDelete(id){
        this.props.deleteExperience(id);
    }

    render() {
        const experience = this.props.experience.map(exp => (

            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD" date={exp.from} /> - {exp.current ? "Now" : <Moment format="YYYY/MM/DD" date={exp.to} />}
                </td>
                <td>
                    <button onClick={() => this.handleDelete(exp._id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                    {experience}
                    </tbody>
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    deleteExperience: propTypes.func.isRequired
};

const mapDispatchToProps = {
    deleteExperience
};


export default connect(null,mapDispatchToProps)(Experience);