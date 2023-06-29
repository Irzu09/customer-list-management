import React from 'react';
import { Input } from 'antd';

const FormEdit = ({ label, type, name, value, onChange, required, editMode, clickedData }) => {
    return (
        <label className="card-label d-flex">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">{label}:</div>
            {editMode ?
                <Input
                    className="card-input col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7 mb-0"
                    type={type}
                    name={name}
                    value={value}
                    required={required}
                    onChange={onChange}
                /> :
                <span className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7">{value}</span>}
        </label>
    );
};

export default FormEdit;
