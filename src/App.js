import React, { useState, useRef, useEffect } from 'react';

//  * Styles
import './App.css';

// * Components
import Homepage from './Home/Homepage.component';

// * Uniqye ids 
import { v4 as uuidv4 } from 'uuid';

//  * Constants
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // * When initialiting state using useState, pass it the value of out initial state
  // * This method returns an array that we can destructure to acctes the current state 
  // * In case we canto to modify the state we do this by using setState

  //  ? Hook useRef
  // * To reference elements inside the HTML using hooks, we can 
  // * we use the html 'ref' attribute and we asign a name to id, 
  // * <input ref={todoNameRef} type="text" />
  // * then we define a var with that name and we assign it to the hook useRef()
  // * const todoNameRef = useRef()
  // * To access the value of this element we can say
  //  * const name = todoNameRef.current.value

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (storeTodos) setTodos(storeTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleComplete = (id) => {
    // ? Always make a copy of the state when modifying
    const newTodos = [...todos];
    // ? Find the todo with the id and stored in the variable
    const todo = newTodos.find(elem => elem.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos)
  }

  const handleClearClick = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos)
  }


  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === '') return
    // ? In order to set a new state, we need to access to the previos one,
    // ? passing a copy of the object and modifying what we need as a a second
    // ? parameter
    setTodos(previousValue => {
      return [...previousValue, { id: uuidv4(), name: name, completed: false }]
    })
    todoNameRef.current.value = '';
  }

  // *After accesing this properties we can pass them as state
  return (
    <div className="App">
      <Homepage todo={todos} toggleTodo={toggleComplete}> </Homepage>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add To do</button>
      <button onClick={handleClearClick}> Clear Complete</button>
      <div>{todos.filter(todo => !todo.completed).length} left to do</div>
    </div>
  );
}

export default App;
