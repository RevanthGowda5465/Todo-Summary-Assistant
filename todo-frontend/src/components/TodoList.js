import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList({ user }) {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [priority, setPriority] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [dueDateTime, setDueDateTime] = useState('');

    const handleSummarize = async () => {
        const email = localStorage.getItem("loggedInEmail");

        try {
            const response = await fetch(`http://localhost:8080/api/summarize?userEmail=${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const message = await response.text();
            alert(message);
        } catch (error) {
            console.error("Error calling summarize:", error);
            alert("Failed to summarize: " + error.message);
        }
    };
    useEffect(() => {
        fetch(`http://localhost:8080/api/todos?userEmail=${user.email}`)
            .then(response => response.json())
            .then(data => {
                setTodos(data.sort((a, b) => b.priority - a.priority));
            })
            .catch(error => console.error('Error fetching todos:', error));
    }, [user]);

    const updateLocalStorage = (newTodos) => {
        localStorage.setItem(
            'todos',
            JSON.stringify(
                JSON.parse(localStorage.getItem('todos') || '[]')
                    .filter((t) => t.userId !== user.email)
                    .concat(newTodos)
            )
        );
    };

    const handleAddTodo = () => {
        if (!newTitle || !newDescription || !priority) {
            alert("Please fill in all the fields.");
            return;
        }

        const newTodo = {
            title: newTitle,
            description: newDescription,
            priority: parseInt(priority),
            status: 'PENDING',
            dueDateTime: dueDateTime ? new Date(dueDateTime).toISOString().slice(0, 19) : null,
            userEmail: user.email,
        };

        fetch('http://localhost:8080/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
        })
            .then(response => response.json())
            .then(createdTodo => {
                setTodos(prevTodos => [...prevTodos, createdTodo].sort((a, b) => b.priority - a.priority));
                setNewTitle('');
                setNewDescription('');
                setPriority(1);
            })
            .catch(error => console.error('Error adding todo:', error));
    };
    const newTodo = {
        title: newTitle,
        description: newDescription,
        status: 'Ongoing',
        priority: parseInt(priority),
        userEmail: user.email,
        dueDateTime: dueDateTime ? new Date(dueDateTime).toISOString() : null,
    };
    const updatedTodo = {
        id: editId,
        title: newTitle,
        description: newDescription,
        priority: parseInt(priority),
        userEmail: user.email,
        status: todos.find(todo => todo.id === editId)?.status || 'Ongoing',
        dueDateTime: dueDateTime,
    };

    const handleDeleteTodo = (id) => {
        fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            })
            .catch(error => console.error('Error deleting todo:', error));
    };

    const toggleStatus = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, status: !todo.status } : todo
        ).sort((a, b) => b.priority - a.priority);
        setTodos(updatedTodos);
        updateLocalStorage(updatedTodos);
    };

    const setStatusCompleted = (id) => {
        const updatedTodo = todos.find(todo => todo.id === id);

        updatedTodo.status = "Completed";

        fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        })
            .then(response => response.json())
            .then(updatedTodo => {
                setTodos(prevTodos =>
                    prevTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
                );
            })
            .catch(error => console.error('Error updating status:', error));
    };


    const setStatusNotCompleted = (id) => {
        const updatedTodo = todos.find(todo => todo.id === id);

        updatedTodo.status = "Ongoing";

        fetch(`http://localhost:8080/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        })
            .then(response => response.json())
            .then(updatedTodo => {
                setTodos(prevTodos =>
                    prevTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
                );
            })
            .catch(error => console.error('Error updating status:', error));
    };


    const renderPriorityBars = (level) => {
        return (
            <div className="priority-bars">
                {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className={`bar ${n <= level ? 'filled' : ''}`}></div>
                ))}
            </div>
        );
    };

    const handleEditTodo = (todo) => {
        setNewTitle(todo.title);
        setNewDescription(todo.description);
        setPriority(todo.priority);
        setIsEditing(true);
        setEditId(todo.id);
        setDueDateTime(todo.dueDateTime ? todo.dueDateTime.slice(0, 16) : '');
    };

    const handleSaveEdit = () => {
        if (!newTitle || !newDescription || !priority) {
            alert("Please fill in all the fields.");
            return;
        }

        const updatedTodo = {
            id: editId,
            title: newTitle,
            description: newDescription,
            priority: parseInt(priority),
            userEmail: user.email,
            status: todos.find(todo => todo.id === editId)?.status || 'Ongoing',
            dueDateTime: dueDateTime ? new Date(dueDateTime).toISOString() : null,
        };

        fetch(`http://localhost:8080/api/todos/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo),
        })
            .then(response => response.json())
            .then(savedTodo => {
                setTodos(prevTodos => prevTodos.map(todo => (todo.id === editId ? savedTodo : todo)).sort((a, b) => b.priority - a.priority));
                setNewTitle('');
                setNewDescription('');
                setPriority(1);
                setIsEditing(false);
                setEditId(null);
            })
            .catch(error => console.error('Error updating todo:', error));
    };


    return (
        <div>
            <h3>Your Todos</h3>
            <input type="text" className='todo-list-input' placeholder="Title" value={newTitle} required onChange={(e) => setNewTitle(e.target.value)} />
            <input
                type="text"
                placeholder="Description"
                value={newDescription}
                className='todo-list-input'
                required="required"
                onChange={(e) => setNewDescription(e.target.value)}
            />
            <input
                type="datetime-local"
                className="todo-list-input"
                value={dueDateTime}
                onChange={(e) => setDueDateTime(e.target.value)}
                required
            />
            <select className='todo-list-input' value={priority} required="required" onChange={(e) => setPriority(e.target.value)}>
                <option value="1">Priority 1 (Lowest)</option>
                <option value="2">Priority 2</option>
                <option value="3">Priority 3</option>
                <option value="4">Priority 4</option>
                <option value="5">Priority 5 (Highest)</option>
            </select>
            <button onClick={isEditing ? handleSaveEdit : handleAddTodo}>
                {isEditing ? 'Save Changes' : 'Add Todo'}
            </button>
            <button onClick={handleSummarize}>Summarize & Send to Slack</button>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Priority</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date/Time</th>
                        <th>Actions</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={todo.id}>
                            <td>{index + 1}</td>
                            <td>{renderPriorityBars(todo.priority)}</td>
                            <td>{todo.title}</td>
                            <td className="description">{todo.description}</td>
                            <td>
                                <span
                                    className={todo.status === 'Completed' ? 'dot green' : 'dot red'}
                                    onClick={() => toggleStatus(todo.id)}
                                    title={todo.status === 'Completed' ? 'Completed' : 'Ongoing'}
                                ></span>
                            </td>
                            <td>
                                {todo.dueDateTime ? new Date(todo.dueDateTime).toLocaleString() : 'N/A'}
                            </td>
                            <td>
                                {todo.status !== 'Completed' && (
                                    <button onClick={() => setStatusCompleted(todo.id)}>Set as Completed</button>
                                )}
                                {todo.status === 'Completed' && (
                                    <button onClick={() => setStatusNotCompleted(todo.id)}>Set as Not Completed</button>
                                )}
                            </td>


                            <td>
                                <button onClick={() => handleEditTodo(todo)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteTodo(todo.id)}>Delete Task</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TodoList;