import React, { useState } from 'react';
import classes from './App.module.css';
import Task from '../../Component/Task/Task';

function App() {
  //States
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState(' ');

  //Fonctions
  const removeClickedHandler = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const doneClickedHandler = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks);
  };

  const submittedTaskHandler = (event) => {
    event.preventDefault();

    const newTasks = {
      content: input,
      done: false,
    };
    setTasks([...tasks, newTasks]);
    setInput('');
  };

  const changedFromHandler = (event) => {
    setInput(event.target.value);
  };

  //Variable
  let tasksDisplayed = tasks.map((task, index) => {
    const _removeClickedHandler = () => removeClickedHandler(index);
    const _doneClickedHandler = () => doneClickedHandler(index);
    return (
      <Task
        done={task.done}
        content={task.content}
        key={index}
        removedClicked={_removeClickedHandler}
        doneClicked={_doneClickedHandler}
      />
    );
  });

  return (
    <div className={classes.App}>
      <header>
        <span>TO-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={submittedTaskHandler}>
          <input
            type='text'
            value={input}
            onChange={changedFromHandler}
            placeholder='Que souhaitez-vous ajouter ?'
          />
          <button type='submit'>Ajouter</button>
        </form>
      </div>
      {tasksDisplayed}
    </div>
  );
}

export default App;
