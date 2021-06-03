import React, { useEffect } from 'react';
import G6 from '@antv/g6';
import { Button } from 'antd';

const data = {
  id: 'Modeling Methods',
  children: [
    {
      id: 'Classification',
      children: [
        { id: 'Logistic regression', children: [] },
        { id: 'Linear discriminant analysis' },
        { id: 'Rules' },
        { id: 'Decision trees' },
        { id: 'Naive Bayes' },
        { id: 'K nearest neighbor' },
        { id: 'Probabilistic neural network' },
        { id: 'Support vector machine' },
      ],
    },
    {
      id: 'Consensus',
      children: [
        {
          id: 'Models diversity',
          children: [
            { id: 'Different initializations' },
            { id: 'Different parameter choices' },
            { id: 'Different architectures' },
            { id: 'Different modeling methods' },
            { id: 'Different training sets' },
            { id: 'Different feature sets' },
          ],
        },
        {
          id: 'Methods',
          children: [
            { id: 'Classifier selection' },
            { id: 'Classifier fusion' },
          ],
        },
        {
          id: 'Common',
          children: [{ id: 'Bagging' }, { id: 'Boosting' }, { id: 'AdaBoost' }],
        },
      ],
    },
    {
      id: 'Regression',
      children: [
        { id: 'Multiple linear regression' },
        { id: 'Partial least squares' },
        { id: 'Multi-layer feedforward neural network' },
        { id: 'General regression neural network' },
        { id: 'Support vector regression' },
      ],
    },
  ],
};

export interface Props {
  input: any;
}

function Tree({ input }: Props) {
  let graph;
  function initTree() {}

  useEffect(() => {
    const container = document.getElementById('container');
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      linkCenter: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.getModel();
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: 'cubic-vertical',
      },
      layout: {
        type: 'compactBox',
        direction: 'TB',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 80;
        },
        getHGap: function getHGap() {
          return 20;
        },
      },
    });

    
  }, []);
  return (
    <div>
      <button onClick={()=>{
        graph.node(function (node) {
          let position = 'right';
          let rotate = 0;
          if (!node.children) {
            position = 'bottom';
            rotate = Math.PI / 2;
          }
          return {
            label: node.id,
            labelCfg: {
              position,
              offset: 5,
              style: {
                rotate,
                textAlign: 'start',
              },
            },
          };
        });
    
        graph.data(data);
        graph.render();
        graph.fitView();
    
        if (typeof window !== 'undefined')
          window.onresize = () => {
            if (!graph || graph.get('destroyed')) return;
            if (!container || !container.scrollWidth || !container.scrollHeight)
              return;
            graph.changeSize(container.scrollWidth, container.scrollHeight);
          };
      }}></button>
      <div id="container"></div>
    </div>
  );
}

export default Tree;
