import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Load todos from backend
  useEffect(() => {
    fetch('http://localhost:4000/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!input.trim()) return;
    const res = await fetch('http://localhost:4000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setInput('');
  };

  // Toggle done status
  const toggleTodo = async (id, done) => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done }),
    });
    const updatedTodo = await res.json();
    setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
  };

  // Delete todo
  const deleteTodo = async id => {
    await fetch(`http://localhost:4000/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1>📝 To-Do List</h1>
        <div className="input-group">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter a new task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map(({ id, text, done }) => (
            <li key={id} className={`todo-item ${done ? 'done' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggleTodo(id, done)}
                />
                <span>{text}</span>
              </label>
              <button onClick={() => deleteTodo(id)}>✖</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
