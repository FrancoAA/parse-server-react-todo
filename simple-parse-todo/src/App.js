import React, { Component, useRef, useEffect } from 'react';
import Parse from 'parse';

import './App.css';

const ParseLiveQueryHOC = (C, { applicationId, serverURL, masterKey, subscriptionQuery }) => {

  Parse.initialize(applicationId, masterKey);
  Parse.serverURL = serverURL;

  const client = new Parse.LiveQueryClient({
    applicationId,
    serverURL: 'ws://127.0.0.1:1337/parse', 
    masterKey
  });

  client.open();

  return class extends Component {
    state = {
      data: []
    };

    async componentDidMount() {
      // Set the initial data
      const parseData = await subscriptionQuery.find();
      const nativeData = parseData.map(d => d.toJSON());
      this.setState({ data: nativeData });
      
      // Subscribe to the events
      let subscription = client.subscribe(subscriptionQuery);

      subscription.on('create', (parseObj) => {
        const nativeObj = parseObj.toJSON();
        this.setState(prevState => ({
          data: [...prevState.data, nativeObj]
        }));
      });

      subscription.on('delete', (parseObj) => {
        const nativeObj = parseObj.toJSON();
        this.setState(prevState => {
          const data = prevState.data.filter(x => x.objectId !== nativeObj.objectId);
          return { data };
        });
      });

      subscription.on('update', (parseObj) => {
        const nativeObj = parseObj.toJSON();
        this.setState(prevState => {
          const pos = prevState.data.findIndex(x => x.objectId === nativeObj.objectId);
          prevState.data[pos] = nativeObj;
          return Object.assign({}, prevState);
        });
      });
    }

    componentWillUnmount() {
      client.disconnect();
    }

    render() {
      return <C data={this.state.data}/>
    }
  }
}

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

class App extends Component {

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
    );
  }
}

export default ParseLiveQueryHOC(
  App,
  {
    applicationId: 'myAppId', 
    serverURL: 'http://127.0.0.1:1337/parse', 
    masterKey: 'helloworld',
    subscriptionQuery: new Parse.Query('Todo').ascending('createdAt')
  }
);
