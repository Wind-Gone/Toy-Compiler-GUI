import React, { FC } from 'react'
import {Modal} from 'antd'

interface IProps{
  visible : boolean;
}

const FirstSet:FC<IProps> = ({
  visible
}) => {
  return (
    <div>
      <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default FirstSet