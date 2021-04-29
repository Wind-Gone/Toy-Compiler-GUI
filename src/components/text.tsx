import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';

const onChange = () => {};

export interface Props {
  input : string
}

function Text( {input} : Props ) {
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-around'}}>
        <div className="Container">
          <h1>Input</h1>
        </div>
        <div className="Container">
          <h1>Output</h1>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-around'}}>
        <div className="Container">
          <AceEditor
            width="400px"
            fontSize="20px"
            placeholder="请输入程序......  🤓"
            value={input}
            height="300px"
            mode="java"
            theme="monokai"
            onChange={onChange}
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div className="Container">
          <AceEditor
            width="300px"
            fontSize="20px"
            height="300px"
            mode="java"
            theme="monokai"
            placeholder="输出结果......  😎"
            onChange={onChange}
            editorProps={{ $blockScrolling: true }}
          />
        </div>
      </div>
    </div>
  );
}

export default Text;
