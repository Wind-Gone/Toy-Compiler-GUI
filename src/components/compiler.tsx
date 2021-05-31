import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Divider,
  Input,
  Table,
  Modal,
} from 'antd';
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
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/theme-ambiance';
import 'ace-builds/src-noconflict/theme-merbivore';
import 'ace-builds/src-noconflict/theme-terminal';
import ReactAce, { IAceEditorProps } from 'react-ace/lib/ace';
import FirstSet from './FirstSet';
import FollowSet from './FollowSet';
import { table } from 'console';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
const { TextArea } = Input;

function compiler() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [complierSwitch, setCompilerSwitch] = useState('lexer');
  const [collapsed, setCollapsed] = useState(false);
  const [inputFileName, setInputFileName] = useState('');
  const [rootPath, setRootPath] = useState('当前文件夹');
  const [files, setFiles] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const inputText = useRef<ReactAce>(null);
  const outputText = useRef<ReactAce>(null);
  const [codetheme, setcodetheme] = useState('eclipse');
  const [columns, setcolumns] = useState([]);
  const [tableData, settableData] = useState([]);

  /* 对话框 */
  const [firstSetVisible, setFirstSetVisible] = useState(false);
  const [followSetVisible, setFollowSetVisible] = useState(false);
  const [tableVisible, settableVisible] = useState(false);
  var finalTableForPrint: string[][] = [];
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
        setOutput(data);
      });
  };
  const handleFile = (e: any) => {
    const content = e.target.result;
    setInput(content);
  };
  const handleChangeFile = (file: any) => {
    console.log(file);
    setInputFileName(file.name);
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  };

  const handelFiles = (e: any) => {
    //清空
    setFiles([]);
    setFilesData([]);
    const files = e!.target!.files; //文件列表
    setRootPath(files[0].webkitRelativePath.split('/')[0]);
    let fileNames = [];
    for (let i = 0; i < files.length; i++) {
      let fr = new FileReader();
      const file = files[i];
      fileNames.push(file.name);
      fr.readAsText(file);
      fr.onload = () => {
        let t = filesData;
        t.push(fr.result);
        setFilesData(t);
      };
    }
    console.log('fileNames', fileNames);
    let newfiles = fileNames.map((fileName, index) => {
      return (
        <Menu.Item
          onClick={() => {
            console.log('222', filesData);
            setInput(filesData[index]);
            setInputFileName(fileName);
          }}
        >
          {fileName}
        </Menu.Item>
      );
    });
    setFiles(newfiles);
  };
  const ChangeCodeTheme = function (event) {
    console.log('huhu', event.item.props.children[1]);
    setcodetheme(event.item.props.children[1]);
  };

  /* first follow table 集 */
  const handleOk = (label: string) => {
    if (label == 'FirstSet') {
      setFirstSetVisible(false);
    } else if (label == 'FollowSet') {
      setFollowSetVisible(false);
    }
  };

  const handleCancel = (label: string) => {
    if (label == 'FirstSet') {
      setFirstSetVisible(false);
    } else if (label == 'FollowSet') {
      setFollowSetVisible(false);
    }
  };
  const prepareData = function () {
    const temp = [];
    var tabletitle = finalTableForPrint[0];
    for (var i = 0; i < 4; i++) {
      let item = {
        title: tabletitle[i].trim(),
        width: 100,
        dataIndex: tabletitle[i].trim(),
        key: tabletitle[i].trim(),
        fixed: 'left',
      };
      temp.push(item);
    }
    for (var i = 4; i < tabletitle.length; i++) {
      let item = {
        title: tabletitle[i].trim(),
        width: 100,
        dataIndex: tabletitle[i].trim(),
        key: tabletitle[i].trim(),
      };
      temp.push(item);
    }
    setcolumns(temp);
    console.log('columns', columns);
    let temp2 = [];
    settableVisible(true);
    for (var i = 1; i < finalTableForPrint.length; i++) {
      temp2.push({
        key: i,
        'VT/T': finalTableForPrint[i][0],
        if: finalTableForPrint[i][1],
        then: finalTableForPrint[i][2],
        else: finalTableForPrint[i][3],
        while: finalTableForPrint[i][4],
        identifiers: finalTableForPrint[i][5],
        '+': finalTableForPrint[i][6],
        '-': finalTableForPrint[i][7],
        '/': finalTableForPrint[i][8],
        '*': finalTableForPrint[i][9],
        '=': finalTableForPrint[i][10],
        '==': finalTableForPrint[i][11],
        '<': finalTableForPrint[i][12],
        '<=': finalTableForPrint[i][13],
        '>': finalTableForPrint[i][14],
        '>=': finalTableForPrint[i][15],
        '(': finalTableForPrint[i][16],
        ')': finalTableForPrint[i][17],
        '{': finalTableForPrint[i][18],
        '}': finalTableForPrint[i][19],
        ';': finalTableForPrint[i][20],
        num: finalTableForPrint[i][21],
      });
    }
    console.log('this', temp2);
    settableData(temp2);
  };
  const getFinalTable = function () {
    var tableArray = [];
    let url = 'http://localhost:8080/finalTable';
    fetch(url)
      .then((res) => res.text())
      .then((res) => {
        console.log('hu', res);
        tableArray = res.split('[');
        console.log('hu', tableArray);
        console.log(tableArray.length);
        console.log(tableArray[3].length);
        for (var i = 2; i < tableArray.length; i++) {
          var tempArray = tableArray[i].split(',');
          finalTableForPrint[i - 2] = [];
          for (var j = 0; j < tempArray.length - 1; j++) {
            if (tempArray[j] == ' ') tempArray[j] = 'null';
            if (tempArray[j].endsWith(']')) {
              console.log(']]]]]]]]]]]]]]]');
              tempArray[j] = tempArray[j].substr(0, tempArray[j].length - 1);
            }

            if (tempArray[j].toString() == ' num]') {
              tempArray[j] = 'num';
            }
            console.log(tempArray[j], ' ');
            finalTableForPrint[i - 2][j] = tempArray[j];
          }
        }
        prepareData();
      });
  };
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
              导入文件
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => handleChangeFile(e!.target!.files![0])}
                accept="text/plain"
              />
            </label>
          </Menu.Item>
          <Menu.Item>
            <label>
              打开文件夹
              <input
                type="file"
                multiple
                style={{ display: 'none' }}
                webkitdirectory="true"
                onInput={(e) => handelFiles(e)}
                accept="text/plain"
              />
            </label>
          </Menu.Item>
        </SubMenu>
        <SubMenu title="视图">
          <Menu.Item>开发者视图</Menu.Item>
        </SubMenu>
        <SubMenu title="操作">
          <Menu.Item>清空输入</Menu.Item>
        </SubMenu>
        <SubMenu title="格式">
          <SubMenu title="代码风格">
            <Menu.Item title="github" onClick={ChangeCodeTheme}>
              github
            </Menu.Item>
            <Menu.Item title="monokai" onClick={ChangeCodeTheme}>
              monokai
            </Menu.Item>
            <Menu.Item title="chrome" onClick={ChangeCodeTheme}>
              chrome
            </Menu.Item>
            <Menu.Item title="chaos" onClick={ChangeCodeTheme}>
              chaos
            </Menu.Item>
            <Menu.Item title="merbivore" onClick={ChangeCodeTheme}>
              merbivore
            </Menu.Item>
            <Menu.Item title="terminal" onClick={ChangeCodeTheme}>
              terminal
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu title="编译">
          <Menu.Item onClick={runCompiler}>词法分析</Menu.Item>
          <Menu.Item>语法分析</Menu.Item>
          <Menu.Item>语义分析</Menu.Item>
        </SubMenu>
        <SubMenu title="中间过程">
          <Menu.Item
            onClick={() => {
              setFirstSetVisible(true);
            }}
          >
            First集
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setFollowSetVisible(true);
            }}
          >
            Follow集
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              getFinalTable();
              settableVisible(true);
            }}
          >
            解析表
          </Menu.Item>
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
            <SubMenu key="sub1" icon={<FolderOpenOutlined />} title={rootPath}>
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
              {inputFileName + '  '}[输入编译的程序]
            </div>
            <div>
              <AceEditor
                ref={inputText}
                onChange={inputOnChange}
                fontSize="18px"
                // placeholder="请输入程序......  🤓"
                width="100%"
                value={input}
                height="150px"
                mode="java"
                theme={codetheme}
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
              <TextArea
                readOnly={true}
                style={{ height: '200px' }}
                value={output}
              />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Compiler ©2021 Created by hzr czh wyj
          </Footer>
          <Modal
            width="70%"
            title="ll语法分析表"
            visible={tableVisible}
            onOk={() => settableVisible(false)}
            onCancel={() => settableVisible(false)}
          >
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              scroll={{ x: 1500, y: 300 }}
            />
          </Modal>
        </Layout>
      </Layout>
      <FirstSet
        visible={firstSetVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <FollowSet
        visible={followSetVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      ,{/* header */}
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
