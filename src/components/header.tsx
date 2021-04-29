import React from 'react';
import { Button } from 'antd';
import { Select } from 'antd';

const { Option } = Select;

export interface Props {
  clear : () => void 
}

function Header( {clear} : Props ) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent:'flex-start' }}>
        <Button style={{marginLeft:20}} shape="round" type="primary" size="large">
          立即运行
        </Button>
        <Select
          showSearch
          style={{ width: 200,marginLeft: 20 }}
          placeholder="Select a lexer / parser"
          optionFilterProp="children"
          filterOption={(input, option:any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          size="large"
        >
          <Option value="lexer">lexer</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
        <Button style={{marginLeft:20}} shape="round" size="large" onClick={clear}> 
          清空
        </Button>

      </div>
    </div>
  );
}

export default Header;
