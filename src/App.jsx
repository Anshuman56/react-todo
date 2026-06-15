import { useState } from "react";

function ListTodos({ arr, onDelete, onToggle }) {
  let completedCount = arr.filter((item) => item.completed).length;

  return (
    <div>
      <ul className="todo-list">
        {arr.map((item) => (
          <li key={item.id} className="todo-item">
            <div className="todo-left">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggle(item.id)}
              />
              <span
                className={`todo-text ${item.completed ? "completed" : ""}`}
              >
                {item.text}
              </span>
            </div>
            <div className="delete-btn" onClick={() => onDelete(item.id)}>
              x
            </div>
          </li>
        ))}
      </ul>
      <p className="task-counter">
        {completedCount} of {arr.length} tasks complete
      </p>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="add-btn">
      {children}
    </button>
  );
}

export default function App() {
  let [todoItem, setTodoItem] = useState("");
  let [addInput, setInput] = useState([]);
  let [nextId, setNextId] = useState(1);

  function hannleChange(e) {
    setTodoItem(e.target.value);
  }

  function deleteOne(deleteId) {
    let newArr = addInput.filter((item) => item.id !== deleteId);
    setInput(newArr);
  }

  function toggleOne(toggleId) {
    setInput(
      addInput.map((item) =>
        item.id === toggleId ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handaleClick(e) {
    e.preventDefault();

    if (todoItem.trim() !== "") {
      setInput([...addInput, { id: nextId, text: todoItem, completed: false }]);
      setNextId(nextId + 1);
      setTodoItem("");
    }
  }

  return (
    <div className="card">
      <h1>My Task</h1>
      <h2>What's on today?</h2>
      <form className="todo-container">
        <input
          type="text"
          value={todoItem}
          onChange={hannleChange}
          className="todo-input"
          placeholder="Enter text"
        />
        <Button onClick={handaleClick}>add</Button>
      </form>
      <ListTodos arr={addInput} onDelete={deleteOne} onToggle={toggleOne} />
    </div>
  );
}
