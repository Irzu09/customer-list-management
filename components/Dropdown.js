import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';

const DropdownOption = ({ label, menuProps, buttonName, editMode, value, custList }) => {
    const gridLabel = custList ? "col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 mb-0" : "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3";
    const gridDiv = custList ? "col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7 mb-0" : "col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9";
    const gridParent = custList && "mr-4 mb-0";

    return (
        <label className={`form-label d-flex ${gridParent}`}>
            <div className={gridLabel}>{label}:</div>
            {editMode ?
                <Dropdown menu={menuProps} className={`dropdown text-start ${gridDiv}`}>
                    <Button>
                        <Space>
                            {buttonName}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown> :
                <span className={gridDiv}>{value}</span>
            }
        </label>
    );
};

export default DropdownOption;
