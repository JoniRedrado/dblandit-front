import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import CourseDetail from './components/CourseDetail/CourseDetail';
import CreateCourse from './components/CreateCourse/CreateCourse';
import ModifyStudents from './components/ModifyStudents/ModifyStudents';

function App() {


  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/courses' element={<Courses />}>Cursos</Route>
        <Route path='/courses/:subject' element={<CourseDetail />}>Cursos</Route>
        <Route path='/newcourse' element={<CreateCourse />} >Crear Curso</Route>
        <Route path='/students/:subject' element={<ModifyStudents />}>Modificar Alumnos</Route>
      </Routes>
    </div>
  )
}

export default App


