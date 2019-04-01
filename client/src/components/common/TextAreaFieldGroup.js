import React from 'react';
import classnames from "classnames";
import propTypes from "prop-types";

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange
}) => {
    return (
        <div className="form-group">
            <textarea
                className={classnames("form-control form-control-lg",{
                    "is-invalid" : error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaFieldGroup.propTypes = {
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string,
    error: propTypes.string,
    info: propTypes.string
};

export default TextAreaFieldGroup;
