import React from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
    const location= useLocation()
    const username = location.state?.username
  return (
    <div>Welcome {username}</div>
  )
}

export default Home