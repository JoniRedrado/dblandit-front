import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import CourseDetail from './components/CourseDetail/CourseDetail';
import ModifyStudents from './components/ModifyStudents/ModifyStudents';
import Login from './components/Login/Login';
import Signup from './components/Singup/Singup';
import Home from './components/Home/Home';
import NewCourse from './components/NewCourse/NewCourse';


function App() {

  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/courses/:subject' element={<CourseDetail />} />
        <Route path='/newcourse' element={<NewCourse />} />
        <Route path='/students/:subject' element={<ModifyStudents />} />
      </Routes>
    </div>
  )
}

export default App


