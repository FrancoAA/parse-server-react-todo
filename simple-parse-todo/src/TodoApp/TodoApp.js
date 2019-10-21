import React, { Component, useRef, useEffect } from 'react';
import Parse from 'parse';

import ParseLiveQueryHOC from '../common/ParseLiveQuery';

import './TodoApp.css';

const AddTodoComponent = ({ todo, onCreate, onUpdate }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.value = todo ? todo.description : '';
  });

  const handleEvent = (e) => {

    if (e.type === 'keyup' && e.keyCode !== 13) {
      return;
    }

    if (!todo.objectId) {
      onCreate({ description: e.target.value.trim() });
    } else {
      onUpdate({ ...todo, description: e.target.value.trim() });
    }

    e.target.value = '';
  };

  return (
    <input type="text" ref={inputEl} onKeyUp={handleEvent}/>
  )
};

class TodoApp extends Component {

  state = {
    todo: null
  };

  TodoClass = Parse.Object.extend('Todo');

  toggleCompleted = async(todo) => {
    let instance = new this.TodoClass(todo);
    instance.set('completed', !todo.completed);
    await instance.save();
  }

  addTodoItem = async(todo) => {
    let instance = new this.TodoClass({ ...todo });
    await instance.save();
  };

  removeTodoItem = async(todo) => {
    let instance = new this.TodoClass(todo);
    await instance.destroy();
  }

  setEditTodo = (todo) => {
    this.setState({ todo });
  };

  updateTodoItem = async(todo) => {
    let instance = new this.TodoClass(todo);
    await instance.save();
    this.setState({ todo: null })
  };

  render() {
    return (
      <div className="App">
        <div className="Container">
          <ul className="Todo-list">
            {this.props.data.map(t => 
              <li key={t.objectId} className={t.completed ? 'completed' : ''}>
                <button onClick={() => this.removeTodoItem(t)}>X</button>
                {t.description}
                <button onClick={() => this.setEditTodo(t)}>Edit</button>
                <input type="checkbox" checked={t.completed} readOnly onClick={() => this.toggleCompleted(t)} />
              </li>
            )}
            <li>
              <AddTodoComponent onCreate={this.addTodoItem} onUpdate={this.updateTodoItem} todo={this.state.todo}/>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ParseLiveQueryHOC(
  TodoApp,
  {
    applicationId: 'myAppId', 
    serverURL: 'http://127.0.0.1:1337/parse', 
    masterKey: 'helloworld',
    subscriptionQuery: new Parse.Query('Todo').ascending('createdAt')
  }
);
