import React, { useCallback } from "react";
import ReactFlow, { Background, Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

const jsonData = {
  name: "中心主题",
  children: [
    { name: "分支 1", children: [] },
    {
      name: "分支 2",
      children: [{ name: "子分支 2-1", children: [] }],
    },
  ],
};

// 递归转成 react-flow 节点
const createNodes = (data: any, parentId = "", x = 0, y = 0, nodes: Node[] = [], edges: Edge[] = []) => {
  const id = `${parentId}-${data.name}`;
  nodes.push({
    id,
    position: { x, y },
    data: { label: data.name },
  });
  data.children.forEach((child: any, index: number) => {
    const childX = x + 200;
    const childY = y + index * 100;
    edges.push({ id: `${id}-${child.name}`, source: id, target: `${id}-${child.name}` });
    createNodes(child, id, childX, childY, nodes, edges);
  });
  return { nodes, edges };
};

export default function XmindShow() {
  const { nodes, edges } = createNodes(jsonData, "root", 0, 0);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
