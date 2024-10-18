import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import AddCourse from './pages/AddCourse';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton from './components/Logout';

function App() {
  return (
    <Router>
      <LogoutButton/>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/my-courses">My Courses</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/my-courses" element={<MyCourses />} />
        {/* Only accessible by instructors and admins */}
        <Route path="/add-course" element={
          <ProtectedRoute allowedRoles={['instructor', 'admin']}>
            <AddCourse />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
