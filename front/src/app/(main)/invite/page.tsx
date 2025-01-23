'use client';
import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import {useRouter} from "next/navigation";

const { Title, Text } = Typography;

const InvitePage = () => {

  const [loading, setLoading] = useState(false);
  const router =useRouter()
  // 打开邀请 modal
  const goInvite = () => {
     router.push("/main/teams/1")
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', // Stack SVG and content vertically
      justifyContent: 'flex-start', // Align items at the top
      alignItems: 'center',  // Horizontally center the items
      height: '100vh',  // Full height of the screen
      marginTop: '25vh',  // Shift the content up by 25% of the viewport height
    }}>
      {/* 上部居中显示的SVG和标题，水平对齐 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',  // Align items horizontally
        marginBottom: '20px',  // Space between the SVG and the title
      }}>
        <svg
          t="1735037586493"
          className="icon"
          viewBox="0 0 1028 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7534"
          width="100"  // Increase size of the icon
          height="100" // Increase size of the icon
        >
          <path
            d="M585.473374 295.885775l-240.51966 65.974206 48.843004 180.976182 240.583927-65.974205 49.067938 180.815514-240.583927 63.854395 46.81859 180.976182-240.583927 63.841341-59.672012-216.962752a178.104246 178.104246 0 0 0 36.250667-159.735902c-17.062918-57.48693-59.639878-102.184705-110.700097-121.336304L55.330969 244.793423l483.288669-127.795149z m304.433301-8.483258L811.147331 0 0.001004 215.005617l78.75834 289.555465c46.81859 8.579659 89.427684 44.697775 102.184705 95.790128 14.90997 51.124486-4.273763 102.184705-40.456146 136.246273l76.606395 287.402517 811.180469-217.126432-76.7038-287.402516c-48.939404-8.579659-89.363417-44.697775-104.273386-95.790128-12.753005-51.124486 4.273763-104.333637 42.57696-136.246274z"
            fill="#FF7300"
            p-id="7535"
          ></path>
        </svg>
        <Title level={1} style={{ marginLeft: 15 }}>EasyPost</Title>
      </div>

      {/* 主要内容区域 */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '10px',
        }}
      >
        <Title level={3}>管理员 在 EasyPost 邀请你加入团队 客户服务</Title>

        {/* 输入框和按钮 */}
        <div style={{ marginTop: '30px' }}>
          <Button
            type="primary"
            size={'large'}
            onClick={goInvite}
            style={{ width: '100%', maxWidth: '200px' }}
          >
            加入团队
          </Button>
          <div style={{ fontSize: '10px', color: '#555', marginTop: 20 }}>
            <Text>
              <span style={{ color: '#B39DDB' }}>EasyPost-</span> <span style={{color: 'gray'}}>节省研发团队的每一分钟</span>
            </Text>
            <div style={{ marginTop: 10, }}>
              <Text style={{fontFamily: 'Arial',color: 'gray'}}>
                easypost.com
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
