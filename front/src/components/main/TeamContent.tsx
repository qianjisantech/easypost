'use client';
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Typography, message, Skeleton } from 'antd';  // 导入 Skeleton
import TeamTabs from '@/components/main/TeamTabs';
import LoadingSpinner from '@/components/main/LoadingSpinner';
import { Content } from "antd/es/layout/layout";  // 导入 Content 组件

const { Title } = Typography;

const TeamsContent = ({
                        loading,
                        teamId,
                      }) => {
  const [teamDetails, setTeamDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [activeTabKey, setActiveTabKey] = useState('1'); // 默认激活"团队项目" Tab

  // 静态模拟的团队数据
  const teamList = {
    1: {
      name: '客户服务',
      description: '客户服务',
    },
    2: {
      name: '网络营运',
      description: '网络营运',
    },
    3: {
      name: '网络经营',
      description: '网络经营',
    },
    // 更多团队...
  };

  // 模拟根据 teamId 获取团队详情
  const fetchTeamDetails = (teamId) => {
    setIsLoadingDetails(true);
    setTimeout(() => {
      if (teamList[teamId]) {
        setTeamDetails(teamList[teamId]);
        setIsLoadingDetails(false);
      } else {
        message.error('团队信息不存在');
        setIsLoadingDetails(false);
      }
    }, 1000); // 模拟加载时间
  };

  // 在组件加载时获取团队详情
  useEffect(() => {
    if (teamId) {
      fetchTeamDetails(teamId);
    }
  }, [teamId]);

  // 处理 Tab 切换
  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  // 渲染内容
  const renderContent = () => (
    <>
      {/* 加载中状态 */}
      {loading && <LoadingSpinner />}

      {/* 团队信息 */}
      {isLoadingDetails ? (
        <div style={{ marginBottom: 20, marginLeft: 10 }}>
          {/* 使用 Skeleton 来占位 */}
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
      ) : (
        <div style={{ marginBottom: 20, marginLeft: 10 }}>
          {teamDetails && (
            <>
              <Title level={2} type="primary">{teamDetails.name}</Title>
              {/*<p>{teamDetails.description}</p>*/}
            </>
          )}
        </div>
      )}

      {/* 新建项目按钮，仅在“团队项目”Tab激活时显示 */}

      {/* 项目 Tabs */}
      <TeamTabs teamId={teamId}/>
    </>
  );

  return (
    <div style={{ backgroundColor: '#fff', width: '100%', marginTop: 0 }}>
      <Content
        style={{
          padding: '0 20px',  // 适当的内边距调整
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
