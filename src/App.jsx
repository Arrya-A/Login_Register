import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/Auth'
import Home from './components/Home'
function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Auth/>} />
        <Route path={"/register"} element={<Auth insideRegister={true}/>}  />
        <Route path={"/home"} element={<Home/>} />
      </Routes>
    </>
  )
}

export default App
