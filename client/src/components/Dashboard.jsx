import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles.css';

const Dashboard = () => {
    const { state } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(response.data);
        };

        fetchTasks();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>{state.user?.role.charAt(0).toUpperCase() + state.user?.role.slice(1)} Dashboard</h1>
            </div>
            <h2>Your Tasks:</h2>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task._id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
                        <h3>{task.name}</h3>
                        <p>Status: {task.status}</p>
                    </li>
                ))}
            </ul>
            <button style={{ marginTop: '20px' }}>Create New Task</button>
        </div>
    );
};

export default Dashboard;
