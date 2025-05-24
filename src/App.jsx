import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login/>} />
        <Route path={"/register"} element={<Register/>}  />
        <Route path={"/home"} element={<Home/>} />
      </Routes>
    </>
  )
}

export default App
