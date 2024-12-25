import React from 'react';
import { Card } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

const ProjectCard = ({ card, menu }) => (

    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            width: '200px',
        }}
        onClick={() => card.onClick(card.route)} // 处理点击事件，跳转路由
    >
        <Card
            title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* 鼠标悬停触发下拉菜单 */}
                    <Dropdown overlay={menu} trigger={['hover']}>
                        <EllipsisOutlined
                            style={{
                                fontSize: '16px',
                                cursor: 'pointer',
                                marginRight: '8px',
                            }}
                        />
                    </Dropdown>
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
                        公共
                    </div>
                    {card.title}
                </div>
            }
            bordered={true}
            hoverable
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: 'lightgray',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div style={{ fontSize: '36px', color: card.color }}>
                {card.icon}
            </div>
        </Card>
    </div>
);

export default ProjectCard;
