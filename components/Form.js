import React from 'react';
import { Input } from 'antd';

const Form = ({ label, type, name, placeholder, value, onChange, required }) => {
    return (
        <label className="form-label d-flex">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">{label}:</div>
            <Input
                className="form-input col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9"
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </label>
    );
};

export default Form;
