import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Courses() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token'); // Get token from localStorage
  const userRole = localStorage.getItem('role'); // Get user role from localStorage
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: token },
        });
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    if (token) {
      fetchCourses();
    }
  }, [token]);

  const enrollCourse = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/courses/enroll/${courseId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      alert('Enrolled successfully');
    } catch (error) {
      alert('Error enrolling in the course');
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      {/* Conditionally render "Add Course" button for instructor or admin */}
      {userRole === 'instructor' || userRole === 'admin' ? (
        <button onClick={() => navigate('/add-course')}>Add Course</button>
      ) : null}

      {/* Display courses or a message if none are available */}
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button onClick={() => enrollCourse(course._id)}>Enroll</button>
              <br />
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

export default Courses;
