import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import CourseDetail from './components/CourseDetail/CourseDetail';
import CreateCourse from './components/CreateCourse/CreateCourse';
import ModifyStudents from './components/ModifyStudents/ModifyStudents';
import Login from './components/Login/Login';
import Signup from './components/Singup/Singup';


function App() {
  
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:subject' element={<CourseDetail />} />
        <Route path='/newcourse' element={<CreateCourse />} />
        <Route path='/students/:subject' element={<ModifyStudents />} />
      </Routes>
    </div>
  )
}

export default App


