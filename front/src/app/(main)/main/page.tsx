'use client'

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';  // 使用 next/navigation 的 useRouter
import { Layout, Button, Row, Col, Typography, Modal, Menu } from 'antd';
import Sidebar from '@/components/main/Sidebar'; // 如果有需要自定义的 Sidebar 组件
import HeaderComponent from '@/components/main/HeaderComponent';
import ProjectTabs from '@/components/main/ProjectTabs';
import LoadingSpinner from '@/components/main/LoadingSpinner';

const { Header, Content, Sider } = Layout;  // 使用 Layout.Sider 来设置侧边栏
const { Title } = Typography;

export default function MainPage() {
    const [loading, setLoading] = useState(false);  // 用来控制 loading 状态
    const [isPending, startTransition] = useTransition();  // 使用 useTransition 来控制跳转延迟
    const router = useRouter();

    // 跳转到目标页面并设置加载状态
    const handleCardClick = (route) => {
        setLoading(true);  // 跳转前显示 loading
        startTransition(() => {
            router.push(route);  // 执行跳转
        });
    };

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleCreateProject = () => {
        setOpen(true);  // 打开新建项目的模态框
    };

    const iconMap = {
        appstore: 'AppstoreAddOutlined',
        file: 'FileOutlined',
        database: 'DatabaseOutlined',
        user: 'UserOutlined',
    };

    const cardsData = [
        { title: '中东', icon: 'appstore', color: '#1890ff', route: '/project' },
        { title: '巴西', icon: 'file', color: '#52c41a', route: '/project' },
        { title: '墨西哥', icon: 'database', color: '#faad14', route: '/project' },
        { title: '埃及', icon: 'user', color: '#13c2c2', route: '/project' },
        { title: '阿联酋', icon: 'appstore', color: '#2f54eb', route: '/project' },
    ];

    const organizations = [
        { id: '1', name: '新开国家-客户服务' },
        { id: '2', name: '新开国家-网络经营' },
        { id: '3', name: '新开国家-网络营运' }
    ];

    const handleSelectChange = (value) => {
        console.log(`选择的组织: ${value}`);
    };

    // 更新 Menu 项目事件
    const menu = (
        <Menu onClick={(e) => console.log(`Clicked ${e.key}`)}>
            <Menu.Item key="copy">复制</Menu.Item>
            <Menu.Item key="edit">编辑</Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ minHeight: '60vh' }}>
            {/* Sidebar: 使用 Sider */}
            <Sider width={200} style={{ background: '#fff' }}>
                <Sidebar />  {/* 自定义 Sidebar 可以保持原样 */}
            </Sider>

            {/* Layout 中的剩余部分，放置 Header 和 Content */}
            <Layout style={{ marginTop: 40 }}> {/* Make room for Sidebar */}
                {/* Header */}
                <Header
                    style={{
                        background: '#fff',
                        position: 'fixed',
                        width: 'calc(100% - 200px)',  // 确保 Header 不被 Sidebar 遮挡
                        zIndex: 1,
                        top: 0,
                        left: 200,
                    }}
                >
                    <HeaderComponent
                        organizations={organizations}
                        handleSelectChange={handleSelectChange}
                    />
                </Header>

                {/* Content */}
                <div style={{ backgroundColor: '#fff', left: 0 }}>
                    <Content
                        style={{
                            padding: '30px 20px',
                            marginTop: 64,  // Give room for the fixed header
                            minHeight: 'calc(100vh - 64px)',  // Ensure content takes full height minus the header
                            backgroundColor: '#fff',
                        }}
                    >
                        {loading && <LoadingSpinner />}  {/* 显示加载中组件 */}
                        <div style={{ marginBottom: 2, marginLeft: 10 }}>
                            <Title level={2} type="primary">个人空间</Title>
                        </div>

                        {/* New Project Button */}
                        <Row justify="end" gutter={16}>
                            <Col>
                                <Button type="primary" onClick={handleCreateProject}>新建项目</Button>
                            </Col>
                        </Row>

                        {/* Project Tabs */}
                        <ProjectTabs
                            cardsData={cardsData}
                            menu={menu}
                            onCardClick={handleCardClick}
                        />
                    </Content>
                </div>
            </Layout>

            {/* 新建项目模态框 */}
            <Modal
                title="新建项目"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                width={500}
            >
                <p>{modalText}</p>
            </Modal>
        </Layout>
    );
}
