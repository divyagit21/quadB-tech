
import React, { useState } from 'react';

const TaskInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [taskType, setTaskType] = useState('indoor');
  const [taskCity, setTaskCity] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleAdd = () => {
    if (taskText.trim() === '') return alert('Enter a task!');
    if (taskType === 'outdoor' && taskCity.trim() === '') return alert('Enter city!');

    onAddTask({
      text: taskText,
      type: taskType,
      city: taskType === 'outdoor' ? taskCity : '',
      weather: null,
      priority,
    });

    setTaskText('');
    setTaskCity('');
    setTaskType('indoor');
    setPriority('Medium');
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter your task"
        style={styles.input}
      />

      <select value={taskType} onChange={(e) => setTaskType(e.target.value)} style={styles.select}>
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
      </select>

      {taskType === 'outdoor' && (
        <input
          type="text"
          value={taskCity}
          onChange={(e) => setTaskCity(e.target.value)}
          placeholder="City"
          style={styles.input}
        />
      )}

      <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.select}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button onClick={handleAdd} style={styles.button}>Add Task</button>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '25px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '700px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #a0d9c6',
    backgroundColor: '#f0fdfa',
    marginRight: '10px',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #a0d9c6',
    backgroundColor: '#f0fdfa',
    marginRight: '10px',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#38b2ac',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default TaskInput;
