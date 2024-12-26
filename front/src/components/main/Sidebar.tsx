import React from 'react';
import { Menu } from 'antd';
import { AppstoreAddOutlined, FileOutlined } from '@ant-design/icons';

const Sidebar = () => (
    <div style={{
        height: '100vh',        // Sidebar占满整个屏幕高度
        display: 'flex',        // 使用flex布局
        flexDirection: 'column', // 垂直布局
        width: 200,             // Sidebar宽度
        backgroundColor: '#fff', // 可以设置背景色
        borderRight: '1px solid #ddd', // 右边的边框
    }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <svg
                t="1735037586493"
                className="icon"
                viewBox="0 0 1028 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7534"
                width="64"
                height="64"
            >
                <path
                    d="M585.473374 295.885775l-240.51966 65.974206 48.843004 180.976182 240.583927-65.974205 49.067938 180.815514-240.583927 63.854395 46.81859 180.976182-240.583927 63.841341-59.672012-216.962752a178.104246 178.104246 0 0 0 36.250667-159.735902c-17.062918-57.48693-59.639878-102.184705-110.700097-121.336304L55.330969 244.793423l483.288669-127.795149z m304.433301-8.483258L811.147331 0 0.001004 215.005617l78.75834 289.555465c46.81859 8.579659 89.427684 44.697775 102.184705 95.790128 14.90997 51.124486-4.273763 102.184705-40.456146 136.246273l76.606395 287.402517 811.180469-217.126432-76.7038-287.402516c-48.939404-8.579659-89.363417-44.697775-104.273386-95.790128-12.753005-51.124486 4.273763-104.333637 42.57696-136.246274z"
                    fill="#FF7300"
                    p-id="7535"
                ></path>
            </svg>
        </div>

        {/* Menu */}
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{
                flexGrow: 1,           // 让 Menu 填充剩余空间
                borderRight: 0,        // 去掉右侧的边框
            }}
        >
            <Menu.Item key="1" icon={<AppstoreAddOutlined />}>我的团队</Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}>个人空间</Menu.Item>
        </Menu>
    </div>
);

export default Sidebar;
