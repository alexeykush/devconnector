import React from 'react';
import classnames from "classnames";
import propTypes from "prop-types";

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    type = "text",
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames("form-control form-control-lg",{
                    "is-invalid" : error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    type: propTypes.string,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string,
    error: propTypes.string,
    info: propTypes.string,
    disabled: propTypes.bool
};

export default TextFieldGroup;
