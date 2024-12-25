import React from 'react';
import { Row, Col, Tabs } from 'antd';
import ProjectCard from './ProjectCard';

const { TabPane } = Tabs;

const ProjectTabs = ({ cardsData, menu }) => (
    <Tabs defaultActiveKey="1">
        <TabPane tab="团队项目" key="1">
            <Row gutter={8}>
                {cardsData.map((card, index) => (
                    <Col key={index} span={3}>
                        <ProjectCard card={card} menu={menu} />
                    </Col>
                ))}
            </Row>
        </TabPane>
    </Tabs>
);

export default ProjectTabs;
