import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import React, {FC} from 'react';
import {ITodo, ModalType} from '../model/todo';
import '../views/Todolist.less';
import {Empty} from 'antd';

interface ITodoListProps {
  lists: ITodo[],
  updateText: (id: number, text: string) => void;
  toggleDone: (id: number) => void,
  deleteTodo: (id: number) => void,
  onShowModal: (type: ModalType, id: number) => void;
}

const TodoList: FC<ITodoListProps> = (props) => {

  const {lists, toggleDone, deleteTodo, onShowModal} = props;

  return (
    <ul className="list">
      {
        lists.length ? (lists.map((todo, index) =>
          <li key={index}>
            <div className="item">
              <span className="content">{todo.text}</span>
              <div>
                <EditOutlined
                  className="icon"
                  onClick={() => onShowModal(ModalType.Edit, todo.id)}
                />
                {todo.done ? (
                  <UndoOutlined
                    className="icon"
                    onClick={() => toggleDone(todo.id)}
                  />
                ) : (
                  <CheckOutlined
                    className="icon"
                    onClick={() => toggleDone(todo.id)}
                  />
                )}
                <DeleteOutlined
                  className="icon"
                  onClick={() => deleteTodo(todo.id)}
                />
              </div>
            </div>
          </li>
        )) : (
          <Empty className="noData"/>
        )
      }
    </ul>
  );
}

export default TodoList;
