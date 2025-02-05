'use client';
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Typography, message, Skeleton, Tag } from "antd";  // 导入 Skeleton
import TeamTabs from '@/components/main/TeamTabs';
import LoadingSpinner from '@/components/main/LoadingSpinner';
import { Content } from "antd/es/layout/layout";
import { TeamDetail } from "@/api/team";
import { useGlobalContext } from "@/contexts/global";  // 导入 Content 组件

const { Title } = Typography;

const TeamsContent = ({
                        loading,
                        teamId,
                      }) => {
  const [teamDetail, setTeamDetail] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [activeTabKey, setActiveTabKey] = useState('1'); // 默认激活"团队项目" Tab
  const { messageApi } = useGlobalContext()

  // 模拟根据 teamId 获取团队详情
  const fetchTeamDetail =  async (teamId) => {
    console.log('打印teamId',teamId)
    setIsLoadingDetail(true);
   const response=  await  TeamDetail(teamId)
    if (response.data.success){
      setTeamDetail(response.data.data);
      setIsLoadingDetail(false);
    }else {
      messageApi.error('查询报错')
    }

  };

  // 在组件加载时获取团队详情
  useEffect(() => {
    if (teamId) {
      fetchTeamDetail(teamId);
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
      {isLoadingDetail ? (
        <div style={{ marginBottom: 20, marginLeft: 10 }}>
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
      ) : (
        <div style={{ marginBottom: 20, marginLeft: 10 }}>
          {teamDetail && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Title level={2} type="primary" style={{ margin: 0 }}>
                {teamDetail.teamName}
                {teamDetail.isManager ? (
                  <Tag color="red" style={{ marginLeft: 10 }}>团队所有者</Tag>
                ) : (
                  <Tag color="green" style={{ marginLeft: 10 }}>团队成员</Tag>
                )}
              </Title>
            </div>
          )}
        </div>
      )}

      {/* 项目 Tabs */}
      <TeamTabs teamId={teamId} />
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
