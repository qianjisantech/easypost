import React, { useEffect, useState } from 'react';
import { Menu, Modal, Button, message, Input } from 'antd';
import { AppstoreAddOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter,usePathname } from 'next/navigation';
import { TeamCreate, TeamQueryPage } from "@/api/team"; // 使用 next/router 中的 useRouter

const Sidebar = () => {
  const router = useRouter();  // 使用 useRouter 获取路由对象
  const [teams, setTeams] = useState([]);  // 用于存储从 API 获取的团队数据
  const [loading, setLoading] = useState(true);  // 控制加载状态
  const pathname = usePathname();
  const [teamId, setTeamId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname === '/main/teams' && teams.length > 0) {
      debugger
      const firstTeamId = teams[0].id;  // 获取第一个团队的 ID
      router.push(`/main/teams/${firstTeamId}`);  // 跳转到第一个团队的页面
    }
  }, [pathname, teams]);  // 监听路径变化和团队数据
  const sidebarStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    backgroundColor: '#fff',
    borderRight: '1px solid #ddd',
  };

  const menuStyle = {
    flexGrow: 1,
    borderRight: 0,
  };

  const logoStyle = {
    textAlign: 'center',
    padding: '20px',
  };
// 处理新建团队点击事件
  const handleCreateTeamClick = () => {
    // 使用 React.createRef 创建 ref
    const inputRef = React.createRef();

    Modal.confirm({
      title: '新建团队',
      content: (
        <div style={{ margin: 20 }}>
          <Input placeholder="请输入团队名称" ref={inputRef} />
        </div>
      ),
      icon: null,
      okText: '新建',
      cancelText: '取消',
      async onOk() {
        // 获取输入框的值
        const teamName = inputRef.current?.input?.value;
        console.log('获取输入框的值teamName：',teamName)
        if (!teamName) {
          message.error('团队名称不能为空');
        }
        // 发起接口调用
        const response = await TeamCreate( JSON.stringify({ teamName: teamName }));
        if (response.data.success){
          message.success(response.data.message);
          fetchTeamsData()
        }
      },
      onCancel() {
        console.log('取消');
      },
    });
  };
  // API 请求函数：获取团队列表
  const fetchTeamsData = async () => {
    try {
      const response = await TeamQueryPage({ page: 1, pageSize: 100});  // 假设 API 地址是 /api/teams
     if (response.data.success){
       const data = response.data.data;
       setTeams(data);  // 将获取的数据存储在 state 中
       setLoading(false);  // 设置为非加载状态
     }
    } catch (error) {
      console.error('获取团队数据失败:', error);
      message.error('获取团队数据失败');
      setLoading(true);
    }
  };

  // 在组件加载时获取团队数据
  useEffect(() => {
    fetchTeamsData();
  }, []);


  // 处理 SubMenu 或 MenuItem 的点击事件
  const handleMenuItemClick = (teamId) => {
    const route = `/main/teams/${teamId}`;  // 构建路径，例如：/main/teams/1234
    router.push(route);  // 跳转到对应的页面
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
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

      {/* Main Menu */}
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={menuStyle}
      >
        {/* 我的组织 */}
        <Menu.SubMenu
          key="1"
          icon={<AppstoreAddOutlined />}
          title="我的组织"
        >
          {/* 新建团队按钮 */}
          <Menu.Item
            icon={<PlusOutlined />}
            onClick={handleCreateTeamClick}
            style={{ color: 'rgb(147, 115, 238)' }}
          >
            新建团队
          </Menu.Item>

          {/* 动态渲染团队菜单项 */}
          {!loading && teams.length > 0 ? (

            teams.map((team) => (
              <Menu.Item
                key={team.id}
                onClick={() => handleMenuItemClick(team.id)}  // 跳转到团队 ID 对应的页面
                style={{ marginBottom: 5 }}
              >
                {team.teamName}
              </Menu.Item>
            ))
          ) : (
            <Menu.Item disabled>加载中...</Menu.Item>
          )}
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;
