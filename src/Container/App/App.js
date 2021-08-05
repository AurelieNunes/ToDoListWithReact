import React, { useState } from 'react';
import classes from './App.module.css';
import Task from '../../Component/Task/Task';

function App() {

  //States
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState(' ');

  //Fonctions
  const removeClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);

  }

  const doneClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks);
  }

  const submittedTaskHandler = event => {
    event.preventDefault();

    const newTasks = {
      content : input,
      done : false
    }
    setTasks([...tasks, newTasks]);
    setInput('');
  }

  const changedFromHandler = event => {
    setInput(event.target.value);
  }

  //Variable
  let tasksDisplayed = tasks.map((task, index) => {
    return (
      <Task
        done = {task.done}
        content = {task.content}
        key = {index}
        removedClicked={()=> removeClickedHandler(index)}
        doneClicked={() => doneClickedHandler(index)}
      />
    )
  });

  return (
    <div className={classes.App}>
      <header>
        <span>TO-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e)=> submittedTaskHandler(e)}>
          <input type="text" 
          value={input} 
          onChange = {(e) => changedFromHandler(e)}
          placeholder="Que souhaitez-vous ajouter ?" />
          <button type="submit">
            Ajouter
          </button>
        </form>
      </div>
      {tasksDisplayed}
    </div>
  );
}

export default App;
