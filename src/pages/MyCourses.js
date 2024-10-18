import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token'); // Fetch the token

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get('https://edu-pt-1.onrender.com/api/courses/my-courses', {
          headers: { Authorization: token },
        });
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching enrolled courses', error);
      }
    };

    if (token) {
      fetchEnrolledCourses();
    }
  }, [token]);

  return (
    <div>
      <h2>My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${course.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={course.title}
              ></iframe>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyCourses;
