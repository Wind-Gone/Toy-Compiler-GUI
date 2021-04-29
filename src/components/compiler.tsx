import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import { Select } from 'antd';
import { PlayCircleOutlined ,ClearOutlined, EditTwoTone , BulbTwoTone } from '@ant-design/icons';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import ReactAce, { IAceEditorProps } from 'react-ace/lib/ace';

const { Option } = Select;

function compiler() {
  const [input, setInput] = useState('');
  const [complierSwitch, setCompilerSwitch] = useState('lexer');
  const inputText = useRef<ReactAce>(null);
  const outputText = useRef<ReactAce>(null);

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
        outputText.current!.editor.setValue(data);
      });
  };

  return (
    <div>
      {/* header */}
      <div>
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
      </div>

      {/* 文本框 */}
      <div>
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
      </div>
    </div>
  );
}

export default compiler;
