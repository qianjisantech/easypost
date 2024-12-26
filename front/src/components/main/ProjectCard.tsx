import React from 'react';
import { Card, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import Image from 'next/image';
const ProjectCard = ({ card, menu, onClick }) => (
    <Card
        title={
            <div style={{ display: 'flex', alignItems: 'center',width:100 }}>

                <div
                    style={{
                        backgroundColor: '#1890ff',
                        color: '#fff',
                        padding: '2px 8px',
                        fontSize: '12px',
                        borderRadius: '8px',
                        marginRight: '8px',
                    }}
                >
                    公开
                </div>
                {card.title}
                <Dropdown overlay={menu} trigger={['hover']}>
                    <EllipsisOutlined
                        style={{

                            fontSize: '16px',
                            cursor: 'pointer',
                            marginLeft: 40,
                        }}
                    />
                </Dropdown>
            </div>
        }
        bordered={true}
        hoverable
        onClick={() => onClick(card.route)}
        style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: 'lightgray',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
    >
        {/* 正方形框包裹插画 */}
        <div
            style={{
                width: '120px',  // 固定大小
                height: '120px', // 固定大小
                backgroundColor: '#f0f0f0', // 默认背景色
                borderRadius: '8px', // 圆角
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden', // 确保图片不会溢出
            }}
        >
            {/* 使用 require 引用 SVG 文件 */}
            <Image src="/assets/svg/project1.svg" alt="Image 2" width={120} height={120} />
        </div>
    </Card>
);

export default ProjectCard;
