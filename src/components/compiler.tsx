import React, { useState, useRef, useEffect } from 'react';
import { Button, Layout, Menu, Breadcrumb, Divider, Input } from 'antd';
import { Select } from 'antd';
import {
  PlayCircleOutlined,
  ClearOutlined,
  EditTwoTone,
  BulbTwoTone,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { BrowserWindow } from 'electron';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import ReactAce, { IAceEditorProps } from 'react-ace/lib/ace';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
const { TextArea } = Input;

function compiler() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [complierSwitch, setCompilerSwitch] = useState('lexer');
  const [collapsed, setCollapsed] = useState(false);
  const [inputFileName, setInputFileName] = useState("");
  const inputText = useRef<ReactAce>(null);
  const outputText = useRef<ReactAce>(null);
  
  let files;
  let rootpath = '';

  useEffect(() => {
    let reader = new FileReader();
  }, []);

  const inputOnChange = (value: string) => {
    setInput(value);
  };

  const clearInput = () => {
    inputText.current!.editor.setValue('');
    outputText.current!.editor.setValue('');
  };

  const changeCompiler = (value: string) => {
    setCompilerSwitch(value);
  };

  const runCompiler = () => {
    let url = 'http://localhost:8080/lexer';
    console.log(input);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: input,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        // outputText.current!.editor.setValue(data);
        setOutput(data)
      });
  };
  const handleFile = (e:any) => {
    const content = e.target.result;
    setInput(content);
    // You can set content in state and show it in render.
  }
  const handleChangeFile = (file: any) => {
    console.log(file);
    setInputFileName(file.name);
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }

  return (
    <div>
      <Menu
        triggerSubMenuAction="click"
        style={{ background: 'f8f8f8', fontSize: 13 }}
        mode="horizontal"
      >
        <SubMenu title="文件">
          <Menu.Item>
            <label>
              打开文件
              <input type="file" style={{ display: 'none' }} onChange={e => handleChangeFile(e!.target!.files![0])}/>
            </label>
          </Menu.Item>
        </SubMenu>
        <SubMenu title="视图">
          <Menu.Item>开发者视图</Menu.Item>
        </SubMenu>
        <SubMenu title="操作">
          <Menu.Item>清空输入</Menu.Item>
        </SubMenu>
        <SubMenu title="编译">
          <Menu.Item onClick={runCompiler}>词法分析</Menu.Item>
          <Menu.Item>语法分析</Menu.Item>
          <Menu.Item>语义分析</Menu.Item>
        </SubMenu>
      </Menu>

      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
          <div
            className="logo"
            style={{
              fontSize: 15,
              textAlign: 'center',
              height: '32px',
              margin: '16px',
              background: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            文件管理器
          </div>

          <Menu theme="dark" defaultSelectedKeys={['sub1']} mode="inline">
            <SubMenu key="sub1" icon={<FolderOpenOutlined />} title="User">
              {files}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                color: '#444444',
                height: '32px',
                background: '#f8f8f8',
                marginTop: '16px',
                marginBottom: '5px',
              }}
            >
              {inputFileName+"  "}[输入文本]
            </div>
            <div>
              <AceEditor
                ref={inputText}
                onChange={inputOnChange}
                fontSize="18px"
                // placeholder="请输入程序......  🤓"
                width="100%"
                value={input}
                height="400px"
                mode="java"
                theme="github"
                editorProps={{ $blockScrolling: true }}
              />
              <div
                style={{
                  color: '#444444',
                  height: '32px',
                  background: '#f8f8f8',
                  marginTop: '16px',
                  marginBottom: '5px',
                }}
              >
                [显示结果]
              </div>
              <TextArea readOnly={true} style={{ height: '200px' }} value={output} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Compiler ©2021 Created by hzr czh wyj
          </Footer>
        </Layout>
      </Layout>

      {/* header */}
      {/* <div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' ,paddingBottom:20}}>
          <Button
            icon={<PlayCircleOutlined />}
            style={{ marginLeft: 20 }}
            shape="round"
            type="primary"
            size="large"
            onClick={runCompiler}
          >
            立即运行
          </Button>
          <Select
            defaultValue="lexer"
            showSearch
            style={{ width: 200, marginLeft: 20 }}
            placeholder="Select a lexer / parser"
            optionFilterProp="children"
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            size="large"
          >
            <Option value="lexer">lexer</Option>
            <Option value="parser" disabled>
              Parser
            </Option>
          </Select>
          <Button
            icon={<ClearOutlined />}
            style={{ marginLeft: 20 }}
            shape="round"
            size="large"
            onClick={clearInput}
          >
            清空
          </Button>
        </div>
      </div> */}

      {/* 文本框 */}
      {/* <div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className="Container">
            <h1><EditTwoTone twoToneColor="#eb2f96" /> Input</h1>
          </div>
          <div className="Container">
            <h1><BulbTwoTone twoToneColor="#eb2f96" /> Output</h1>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className="Container">
            <AceEditor
              ref={inputText}
              onChange={inputOnChange}
              width="350px"
              fontSize="18px"
              placeholder="请输入程序......  🤓"
              value={input}
              height="300px"
              mode="java"
              theme="monokai"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <div className="Container">
            <AceEditor
              ref={outputText}
              readOnly={true}
              width="350px"
              fontSize="18px"
              height="300px"
              mode="java"
              theme="monokai"
              placeholder="输出结果......  😎"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default compiler;
