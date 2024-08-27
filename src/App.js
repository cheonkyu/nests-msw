import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input, isCompleted: false }]);
      setInput('');
    }
  };

  const toggleComplete = (i) => {
    const newTodos = [...todos];
    newTodos[i].isCompleted = !newTodos[i].isCompleted;
    setTodos(newTodos);
  };

  const deleteTodo = (i) => {
    const newTodos = [...todos];
    newTodos.splice(i, 1);
    setTodos(newTodos);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data = [], status } = await axios.get('/todo');
            console.log(data);
            if(data) {
              setTodos(data)
            }
        } catch (error) {
          console.log(error);
        }
    };
    setTimeout(() => {
      fetchData();
    }, 1000)
}, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter a new todo" 
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.isCompleted ? 'completed' : ''}>
            <span onClick={() => toggleComplete(index)}>{todo.text}</span>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
