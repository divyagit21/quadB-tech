import React, { useState } from 'react';

const TaskList = ({ tasks, onDelete, onFetchWeather, onEdit, loadingIndex }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');

  const startEdit = (index, task) => {
    setEditingIndex(index);
    setEditText(task.text);
    setEditCity(task.city || '');
    setEditPriority(task.priority || 'Medium');
  };

  const saveEdit = (index, task) => {
    const updatedTask = {
      ...task,
      text: editText,
      city: task.type === 'outdoor' ? editCity : '',
      priority: editPriority
    };
    onEdit(index, updatedTask);
    setEditingIndex(null);
  };

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'red';
    if (priority === 'Medium') return 'orange';
    return 'green';
  };

  return (
    <ul style={{ padding: 0, listStyle: 'none', maxWidth: '1700px' }}>
      {tasks.length === 0 ? (
        <p style={{ color: '#555' }}>No tasks yet.</p>
      ) : (
        tasks.map((task, index) => (
          <li
            key={index}
            style={{
              backgroundColor: '#ffffff',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            {editingIndex === index ? (
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={styles.input}
                />
                {task.type === 'outdoor' && (
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    style={styles.input}
                    placeholder="City"
                  />
                )}
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  style={styles.input}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button onClick={() => saveEdit(index, task)} style={styles.saveBtn}>Save</button>
              </div>
            ) : (
              <div>
                <strong>{task.text}</strong> ({task.type}) – 
                <span style={{ color: getPriorityColor(task.priority), marginLeft: '5px' }}>
                  {task.priority} Priority
                </span>
                {task.type === 'outdoor' && (
                  <>
                    <span> – City: {task.city}</span>
                    {task.weather && (
                      <span> – Weather: {task.weather}</span>
                    )}
                    <button
                      onClick={() => onFetchWeather(task.city, index)}
                      style={styles.weatherBtn}
                      disabled={loadingIndex === index}
                    >
                      {loadingIndex === index ? 'Loading...' : 'Get Weather'}
                    </button>
                  </>
                )}
              </div>
            )}

            {editingIndex !== index && (
              <div>
                <button onClick={() => startEdit(index, task)} style={styles.editBtn}>Edit</button>
                <button onClick={() => onDelete(index)} style={styles.deleteBtn}>Delete</button>
              </div>
            )}
          </li>
        ))
      )}
    </ul>
  );
};

const styles = {
  input: {
    padding: '6px',
    marginRight: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  saveBtn: {
    padding: '6px 10px',
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editBtn: {
    marginRight: '8px',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  weatherBtn: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#81e6d9',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default TaskList;
