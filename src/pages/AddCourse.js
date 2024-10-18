import React, { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoId, setVideoId] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://edu-pt-1.onrender.com/api/courses/create',
        { title, description, videoId },
        { headers: { Authorization: token } }
      );
      alert('Course added successfully!');
    } catch (err) {
      console.error('Error adding course', err);
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course Description"
          required
        />
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="YouTube Video ID"
          required
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
