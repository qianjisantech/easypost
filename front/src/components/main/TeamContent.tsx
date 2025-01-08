import React from 'react';
import { Button, Row, Col, Typography } from 'antd';
import ProjectTabs from '@/components/main/ProjectTabs';
import LoadingSpinner from '@/components/main/LoadingSpinner';
import { Content } from "antd/es/layout/layout";  // 导入 Content 组件

const { Title } = Typography;

const TeamsContent = ({
                        loading,
                        handleCreateProject,
                        cardsData,
                        handleCardClick,
                        menu,
                        teamId
                      }) => {

  const renderContent = () => {
    return (
      <>
        {loading && <LoadingSpinner />} {/* 显示加载中组件 */}
        <div style={{ marginBottom: 2, marginLeft: 10 }}>
          <Title level={2} type="primary">{teamId}</Title>
        </div>

        {/* 新建项目按钮 */}
        <Row justify="end" gutter={16}>
          <Col>
            <Button type="primary" onClick={handleCreateProject}>
              新建项目
            </Button>
          </Col>
        </Row>

        {/* 项目 Tabs */}
        <ProjectTabs
          cardsData={cardsData}
          menu={menu}
          onCardClick={handleCardClick}
        />
      </>
    );
  };

  return (
    <div style={{ backgroundColor: '#fff', left: 0, width: '100%', marginTop: 0 }}> {/* 减少 marginTop 或完全去除 */}
      <Content
        style={{
          padding: '0 10px',  // 适当的内边距
          minHeight: 'calc(100vh - 64px)',  // 确保 Content 占据剩余空间
          backgroundColor: '#fff',
          width: '100%',  // 使 Content 撑满父容器宽度
          boxSizing: 'border-box',  // 确保 padding 不影响宽度
        }}
      >
        {renderContent()}
      </Content>
    </div>
  );
};

export default TeamsContent;
