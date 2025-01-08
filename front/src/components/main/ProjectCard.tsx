import React from 'react';
import { Card, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import Image from 'next/image';

const ProjectCard = ({ card, menu, onClick }) => (
  <Card
    title={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
        <span style={{ flexGrow: 1 }}>{card.title}</span>
        <Dropdown overlay={menu} trigger={['hover']}>
          <EllipsisOutlined
            style={{
              fontSize: '16px',
              cursor: 'pointer',
            }}
          />
        </Dropdown>
      </div>
    }
    bordered={false}  // 去掉边框
    hoverable
    onClick={() => onClick(card.route)}
    style={{
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: '8px',  // 圆角设计
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',  // 更细腻的阴影效果
      transition: 'transform 0.3s',  // 鼠标悬停时的缩放效果
    }}
    bodyStyle={{
      padding: '20px 16px',  // 控制内容内边距
    }}
  >
    {/* 项目图片 */}
    <div
      style={{
        width: '100%',
        height: '160px',  // 适当增大图片的高度
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',  // 确保图片不会溢出
        marginBottom: '16px',  // 图片和文本之间的间距
      }}
    >
      {/* 图片部分：使用 `next/image` 组件 */}
      <Image src="/assets/svg/project1.svg" alt="Project Image" width={160} height={160} />
    </div>

    {/*/!* 项目描述 *!/*/}
    {/*<div style={{ color: '#666', fontSize: '14px' }}>*/}
    {/*  /!* 示例描述文本 *!/*/}
    {/*  这是一个团队项目的简短描述，描述可以是关于项目的简短介绍或者其他有价值的信息。*/}
    {/*</div>*/}
  </Card>
);

export default ProjectCard;
