import React, { useState, useRef, useEffect } from 'react';
import classes from './App.module.css';
import Task from '../../Component/Task/Task';
import axios from '../../axios.firebase';

function App() {

  //States
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState(' ');

  //Référence
  const inputForm = useRef('');

  //Effect
  useEffect(() => {
    inputForm.current.focus();

    axios.get('/newTask.json')
     .then(response => {  
        const newTasks = [];
          for (let key in response.data) {
            if(response.data[key]) {
              newTasks.push({
                ...response.data[key], 
                id : key
            });
          }
        } 
          setTasks(newTasks);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);


  //Functions
  const removeClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);

    axios.delete('/newTask/' + tasks[index].id + '.json')
      .then(response => {
      console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const doneClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks);

    axios.put('/newTask/' + tasks[index].id + '.json', tasks[index])
    .then (response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    }); 
  }

  const submittedTaskHandler = event => {
    event.preventDefault();

    const newTasks = {
      content : input,
      done : false
    }
    setTasks([...tasks, newTasks]);
    setInput('');

    axios.post('/newTask.json', newTasks)
      .then (response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      }); 
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
          ref = {inputForm}
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
