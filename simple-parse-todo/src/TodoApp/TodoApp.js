import React, { Component, useRef, useEffect } from 'react';
import Parse from 'parse';

import {
  IonApp,
  IonContent,
  IonHeader,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItemGroup,
  IonItemDivider
} from '@ionic/react';

import ParseLiveQueryHOC from '../common/ParseLiveQuery';

import './TodoApp.scss';

const AddTodoComponent = ({ todo, onCreate, onUpdate }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.value = todo ? todo.description : '';
  });

  const handleEvent = (e) => {

    if (e.type === 'keyup' && e.keyCode !== 13) {
      return;
    }

    if (todo && todo.objectId) {
      onUpdate({ ...todo, description: e.target.value.trim() });
    } else {
      onCreate({ description: e.target.value.trim() });
    }

    e.target.value = '';
  };

  return (
    <IonInput ref={inputEl} placeholder="Something todo..." onKeyUp={handleEvent}></IonInput>
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

  handleInput = (e) => {
    if (e.keyCode === 13) {
      console.log('Text: ', e.target.value);
    }
  };

  render() {
    return (
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Todo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/*-- List of Text Items --*/}
          <IonList>
            {this.props.data.map(todo => (
            <IonItemSliding>
              <IonItemOptions side="start">
                <IonItemOption color="success" onClick={() => this.setEditTodo(todo)}>Edit</IonItemOption>
              </IonItemOptions>

              <IonItem key={todo.objectId}>
                <IonLabel>
                  <span className={todo.completed ? 'completed' : undefined}>{todo.description}</span>
                </IonLabel>
                <IonCheckbox checked={todo.completed} onClick={() => this.toggleCompleted(todo)}/>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => this.removeTodoItem(todo)}>Remove</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
            ))}
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonTitle>
              <AddTodoComponent onCreate={this.addTodoItem} onUpdate={this.updateTodoItem} todo={this.state.todo}/>
            </IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonApp>
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
