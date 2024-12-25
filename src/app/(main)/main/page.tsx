'use client'

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    Layout,
    Row,
    Col,
    Card,
    Button,
    Typography,
    Menu,
    Tabs,
    Spin,
    Modal,
    Select,
    Form,
    Input,
    Space,
    Dropdown,
    FormProps
} from 'antd';
import { FileOutlined, AppstoreAddOutlined, DatabaseOutlined, UserOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export default function MainPage() {
    const [loading, setLoading] = useState(false);  // 用来控制 loading 状态
    const [isPending, startTransition] = useTransition();  // 使用 useTransition 来控制跳转延迟
    const router = useRouter();

    // 跳转卡片处理函数
    const handleCardClick = (route) => {
        setLoading(true);  // 跳转前显示 loading
        startTransition(() => {
            router.push(route);  // 执行跳转
        });
    };

    // 路由跳转完成后关闭 loading 状态
    const onRouteChangeComplete = () => {
        setLoading(false);  // 设置加载为 false
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
        setOpen(true);
    };

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // 图标映射表
    const iconMap = {
        appstore: <AppstoreAddOutlined />,
        file: <FileOutlined />,
        database: <DatabaseOutlined />,
        user: <UserOutlined />,
    };

    const cardsData = [
        { title: '中东', icon: 'appstore', color: '#1890ff', route: '/project' },
        { title: '巴西', icon: 'file', color: '#52c41a', route: '/project' },
        { title: '墨西哥', icon: 'database', color: '#faad14', route: '/project' },
        { title: '埃及', icon: 'user', color: '#13c2c2', route: '/project' },
        { title: '阿联酋', icon: 'appstore', color: '#2f54eb', route: '/project' },
    ];

    // 组织列表
    const organizations = [
        { id: '1', name: '新开国家-客户服务' },
        { id: '2', name: '新开国家-网络经营' },
        { id: '3', name: '新开国家-网络营运' }
    ];

    const handleSelectChange = (value) => {
        console.log(`选择的组织: ${value}`);
    };

    // 处理下拉菜单点击
    const handleMenuClick = (e) => {
        if (e.key === 'copy') {
            console.log('点击了复制');
        } else if (e.key === 'edit') {
            console.log('点击了编辑');
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="copy">复制</Menu.Item>
            <Menu.Item key="edit">编辑</Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            {/* Sider */}
            <Sider width={200} style={{ background: '#fff', marginTop: 0 }}>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {/* Logo */}
                    <div style={{ textAlign: 'center' }}>
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
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1" icon={<AppstoreAddOutlined />}>
                            我的团队
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FileOutlined />}>
                            个人空间
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>

            {/* Main Content */}
            <Layout style={{ marginLeft: 1, marginTop: 1 }}>
                {/* Header */}
                <Header
                    style={{
                        background: '#fff',
                        position: 'fixed',
                        width: 'calc(100% - 200px)',
                        zIndex: 1,
                        top: 0,
                        left: 200,
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0 20px',
                    }}
                >
                    {/* Select for organizations */}
                    <Space style={{ position: 'absolute', right: 20, top: 20 }}>
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
                    </Space>
                </Header>

                {/* Content */}
                <Content style={{ padding: '30px 20px', marginTop: 20, background: '#fff' }}>
                    {/* Loading Spinner */}
                    {loading && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <Spin size="large" />
                        </div>
                    )}

                    <div style={{ marginBottom: 2, marginLeft: 10 }}>
                        <Title level={2} type="primary">
                            个人空间
                        </Title>
                    </div>

                    <div style={{ marginBottom: 10 }}>
                        <Row justify="end" gutter={16}>
                            <Col>
                                <Button type="primary" onClick={handleCreateProject}>
                                    新建项目
                                </Button>
                            </Col>
                        </Row>
                    </div>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="团队项目" key="1">
                            <Row gutter={8}>
                                {cardsData.map((card, index) => (
                                    <Col key={index} span={3}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '200px',
                                                width: '200px',
                                            }}

                                        >
                                            <Card onClick={() => handleCardClick(card.route)} // 处理点击事件，跳转路由
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
                                                    {iconMap[card.icon]}
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        </Layout>
    );
}
