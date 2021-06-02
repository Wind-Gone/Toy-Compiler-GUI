import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Modal, List, Typography, Divider } from 'antd';

interface IProps {
  visible: boolean;
  handleOk: (label: string) => void;
  handleCancel: (label: string) => void;
}

const FirstSet: FC<IProps> = ({
  visible,
  handleOk,
  handleCancel,
}): ReactElement => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = 'http://localhost:8080/FirstSet';
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(e=>console.log(e));
  }, []);

  return (
    <div>
      <Modal
        title="First集"
        visible={visible}
        onOk={() => handleOk('FirstSet')}
        onCancel={() => handleCancel('FirstSet')}
      >
        <List
          bordered
          dataSource={data}
          renderItem={(item) => {
            let arr = item.split(" ");

            return (
              <List.Item>
                <Typography.Text mark>{arr[0]+":"}</Typography.Text>&nbsp;&nbsp;&nbsp; {" "+arr.slice(1,arr.length-1).join(" 、")+arr[arr.length-1]}
              </List.Item>
            );
          }}
        />
      </Modal>
    </div>
  );
};

export default FirstSet;
