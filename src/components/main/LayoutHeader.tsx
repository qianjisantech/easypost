import React from 'react';
import { Space, Select } from 'antd';

const { Option } = Select;

const LayoutHeader = ({ organizations, handleSelectChange }) => (
    <div style={{ position: 'absolute', right: 20, top: 20 }}>
        <span>组织：</span>
        <Select
            defaultValue={organizations[0].id}
            style={{ width: 200 }}
            onChange={handleSelectChange}
        >
            {organizations.map((org) => (
                <Option key={org.id} value={org.id}>
                    {org.name}
                </Option>
            ))}
        </Select>
    </div>
);

export default LayoutHeader;
