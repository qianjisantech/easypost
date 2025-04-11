import React, { useState, useEffect } from 'react';
import { Button, Spin, Empty, Card, Tag, Space, Tooltip, Image } from 'antd';
import {
  PlusOutlined,
  LinkOutlined,
  StarOutlined,
  EyeOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import './CollaborationBoard.css';

const { Meta } = Card;

// 模拟数据
const mockData = [
  {
    id: '1',
    title: '百度搜索',
    url: 'https://www.baidu.com',
    cover: 'https://picsum.photos/id/10/800/600',
    description: '全球最大的中文搜索引擎',
    tags: ['搜索', 'AI', '工具'],
    stars: 245,
    views: 1560,
    collaborators: 12,
    isFeatured: true
  },
  {
    id: '2',
    title: '谷歌云平台',
    url: 'https://cloud.google.com',
    cover: 'https://picsum.photos/id/11/800/500',
    description: '全球领先的云服务平台',
    tags: ['云计算', '大数据', 'AI'],
    stars: 189,
    views: 980,
    collaborators: 8,
    isFeatured: false
  },
  {
    id: '3',
    title: 'GitHub开源',
    url: 'https://github.com',
    cover: 'https://picsum.photos/id/12/800/400',
    description: '全球最大的代码托管平台',
    tags: ['开发', '协作', '开源'],
    stars: 312,
    views: 2300,
    collaborators: 24,
    isFeatured: true
  },
  {
    id: '4',
    title: 'Ant Design',
    url: 'https://ant.design',
    cover: 'https://picsum.photos/id/13/800/700',
    description: '企业级UI设计语言',
    tags: ['UI', 'React', '前端'],
    stars: 278,
    views: 1890,
    collaborators: 15,
    isFeatured: false
  }
];

// 瀑布流布局配置
const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
};

const CollaborationBoard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1500);
  }, []);

  const handleCreateNewProject = () => {
    console.log('创建新项目');
  };

  const handleUrlClick = (url) => {
    window.open(url, '_blank');
  };

  const filteredData = activeFilter === 'featured'
    ? data.filter(item => item.isFeatured)
    : data;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="loading-container glass-bg">
        <Spin tip="加载中..." size="large" />
        <div className="loading-dots">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="dot glass-bg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="empty-container glass-bg"
      >
        <Empty
          description={
            <span className="empty-description">暂无协作项目</span>
          }
          imageStyle={{ height: 120 }}
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            icon={<PlusOutlined />}
            type="primary"
            size="large"
            onClick={handleCreateNewProject}
            className="create-button glass-btn"
          >
            创建新项目
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="collaboration-board compact-view">
      <div className="glass-bg-layer"></div>

      <div className="board-header glass-bg">
        <Space size="middle">
          <Button
            className="glass-btn"
            type={activeFilter === 'all' ? 'primary' : 'default'}
            onClick={() => setActiveFilter('all')}
          >
            全部项目
          </Button>
          <Button
            className="glass-btn"
            type={activeFilter === 'featured' ? 'primary' : 'default'}
            onClick={() => setActiveFilter('featured')}
            icon={<StarOutlined />}
          >
            精选项目
          </Button>
        </Space>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleCreateNewProject}
            className="new-project-button glass-btn"
          >
            新建项目
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="masonry-container compact-masonry"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {filteredData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="masonry-item"
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={`project-card glass-card ${item.isFeatured ? 'featured' : ''}`}
                cover={
                  <div className="card-cover" onClick={() => handleUrlClick(item.url)}>
                    <Image
                      src={item.cover}
                      alt={item.title}
                      preview={false}
                      style={{ height: '120px', objectFit: 'cover' }}
                    />
                    <div className="cover-overlay glass-overlay">
                      <LinkOutlined className="link-icon" />
                    </div>
                  </div>
                }
                actions={[
                  <Tooltip title="星标数">
                    <span className="glass-bg-text dark-text"><StarOutlined /> {item.stars}</span>
                  </Tooltip>,
                  <Tooltip title="访问量">
                    <span className="glass-bg-text dark-text"><EyeOutlined /> {item.views}</span>
                  </Tooltip>,
                  <Tooltip title="协作者">
                    <span className="glass-bg-text dark-text"><TeamOutlined /> {item.collaborators}</span>
                  </Tooltip>
                ]}
              >
                <Meta
                  title={
                    <div className="card-title dark-text">
                      {item.isFeatured && <StarOutlined className="featured-star" />}
                      {item.title}
                    </div>
                  }
                  description={
                    <>
                      <p className="card-description dark-text">{item.description}</p>
                      <div className="card-tags">
                        {item.tags.map(tag => (
                          <Tag key={tag} className="glass-tag dark-tag">{tag}</Tag>
                        ))}
                      </div>
                    </>
                  }
                />
              </Card>
            </motion.div>
          ))}
        </Masonry>
      </motion.div>
    </div>
  );
};

export default CollaborationBoard;