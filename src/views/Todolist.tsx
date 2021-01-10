
import {Input, Button, Tabs, Badge, message} from 'antd';
import React,{useState} from 'react';
import './Todolist.less';
import ModalForm from '../components/ModalForm';
import TodoList from '../components/TodoList';
import {ITodo, ModalType} from '../model/todo';

const {Search} = Input;
const {TabPane} = Tabs;

const Todo = () => {

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [lists, setLists] = useState<ITodo[]>([]);
  const [todoId, setTodoId] = useState(1);

  const todoList = lists.filter(item => !item.done);
  const doneList = lists.filter(item => item.done);

  const onClose = () => {
    setShowModal(false);
  };

  const onShowModal = (type: ModalType, id?: number) => {
    if (type === ModalType.Add) {
      setModalTitle('添加任务');
    }
    if (type === ModalType.Edit) {
      setModalTitle('编辑任务');
      setTodoId(id!);
    }
    setShowModal(true);
  };

  const getFilter = (lists: ITodo[], searchText: string) => {
    if (searchText.trim() !== '') {
      return lists.filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()));
    }
    return lists;
  };

  const addTodo = (id: number, text: string, done: boolean) => {
    const Item = {id, text, done};
    setLists([Item, ...lists]);
    message.success('新增成功');
  };

  const deleteTodo = (id: number) => {
    const newlists = lists.filter(i => i.id !== id)
    setLists([...newlists]);
    message.success('删除成功');
  };

  const toggleDone = (id: number) => {
    const newlists = lists.map(i =>
      i.id === id
        ? {
          ...i,
          done: !i.done
        }
        : i
    )
    setLists([...newlists]);
  }

  const updateText = (id: number, text: string) => {
    const newLists = lists.map(i =>
      i.id === id ? {...i, text} : i
    )
    setLists([...newLists]);
    message.success('编辑成功');
  }

  return (
    <div className="wrapper">
      <div className="queryBar">
        <Search
          placeholder="输入要查询的内容"
          onSearch={value => setSearchText(value)}
        />
        <Button type="primary"
                className="newTodo"
                onClick={() => onShowModal(ModalType.Add)}>
          添加
        </Button>
      </div>
      <div className="list">
        <Tabs defaultActiveKey="1" size={"large"}>
          <TabPane tab={<Badge status="warning" text="待办项"/>} key="1">
            <TodoList
              lists={getFilter(todoList, searchText)}
              updateText={updateText}
              toggleDone={toggleDone}
              deleteTodo={deleteTodo}
              onShowModal={onShowModal}
            />
          </TabPane>
          <TabPane tab={<Badge status="success" text="已完成"/>} key="2">
            <TodoList
              lists={getFilter(doneList, searchText)}
              updateText={updateText}
              toggleDone={toggleDone}
              deleteTodo={deleteTodo}
              onShowModal={onShowModal}
            />
          </TabPane>
          <TabPane tab={<Badge status="default" text="清 单"/>} key="3">
            <TodoList
              lists={getFilter(lists, searchText)}
              updateText={updateText}
              toggleDone={toggleDone}
              deleteTodo={deleteTodo}
              onShowModal={onShowModal}
            />
          </TabPane>
        </Tabs>
      </div>
      <ModalForm
        modalTitle={modalTitle}
        todoId={todoId}
        visible={showModal}
        onClose={onClose}
        addTodo={addTodo}
        updateText={updateText}
      />
    </div>
  );
}

export default Todo;
