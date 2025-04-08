
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API;
const Todo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storedUser = sessionStorage.getItem('loggedInUser');
  const username = location.state?.username || JSON.parse(storedUser)?.name;

  const [tasks, setTasks] = useState([]);
  const [loadingTaskIndex, setLoadingTaskIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!storedUser) {
      navigate('/');
      return;
    }

    if (username) {
      const storedTasks = JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];
      setTasks(storedTasks);
    }
  }, [username, storedUser, navigate]);

  const fetchWeather = async (city, index) => {
    try {
      setLoadingTaskIndex(index);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const weather = response.data.weather[0].description;
      const temp = response.data.main.temp;

      const updatedTasks = [...tasks];
      updatedTasks[index].weather = `${weather}, ${temp}°C`;
      setTasks(updatedTasks);
      localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
    } catch (err) {
      setError('Failed to fetch weather. Please check the city name.');
    } finally {
      setLoadingTaskIndex(null);
    }
  };

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
    setError('');
  };

  const handleDelete = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
  };

  const handleEditTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    navigate('/');
  };

  if (!storedUser) return null;

  return (
    <div style={{ padding: '30px', backgroundColor: '#e6f9f2', minHeight: '100vh' }}>
      <h2 style={{ color: '#2f855a', marginBottom: '20px' }}>Welcome, {username}!</h2>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#e53e3e',
          color: 'white',
          padding: '8px 14px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Logout
      </button>

      <TaskInput onAddTask={handleAddTask} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <TaskList
        tasks={tasks}
        onFetchWeather={fetchWeather}
        onDelete={handleDelete}
        onEdit={handleEditTask}
        loadingIndex={loadingTaskIndex}
      />
    </div>
  );
};

export default Todo;
