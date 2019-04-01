import React from 'react';
import classnames from "classnames";
import propTypes from "prop-types";

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type = "text",
    onChange
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input
                className={classnames("form-control form-control-lg",{
                    "is-invalid" : error
                })}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

InputGroup.propTypes = {
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    type: propTypes.string,
    placeholder: propTypes.string,
    error: propTypes.string,
    icon: propTypes.string
};

export default InputGroup;