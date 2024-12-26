import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = () => (
    <div
        style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,  // 确保它显示在页面上层
        }}
    >
        <Spin size="large" />
    </div>
);

export default LoadingSpinner;
