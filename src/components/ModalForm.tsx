import {Modal, Input, Form} from 'antd';
// @ts-ignore
import React, {useState, FC} from 'react';


interface IModalFormProps {
  visible: boolean;
  modalTitle: string;
  todoId: number;
  onClose: () => void;
  addTodo: (id: number, text: string, flag: boolean) => void;
  updateText: (id: number, text: string) => void;
}

const ModalForm: FC<IModalFormProps> = (props: IModalFormProps) => {

  const {visible, onClose, addTodo, modalTitle, todoId, updateText} = props;
  const [itemId, setItemId] = useState(1);
  const [form] = Form.useForm();

  const onFinish = () => {
    const text: string = form.getFieldValue('content').trim();
    if (modalTitle === '添加任务') {
      addTodo(itemId, text, false);
      setItemId((itemId: number) => itemId + 1);
    }
    if (modalTitle === '编辑任务') {
      updateText(todoId, text);
    }
    form.setFieldsValue({content: ''});
    onClose();
  };

  return (
    <div>
      <Modal
        title={modalTitle}
        visible={visible}
        onCancel={onClose}
        onOk={onFinish}
        okText="提交"
      >
        <Form layout="horizontal" form={form}>
          <Form.Item
            name="content"
            label="内容"
            rules={[{required: true}]}
          >
            <Input placeholder="请输入内容" autoComplete="off"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalForm;
