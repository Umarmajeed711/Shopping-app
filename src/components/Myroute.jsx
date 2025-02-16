import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { GlobalContext } from '../context/Context'
import Profile from '../pages/profile'
import { Post } from '../pages/Post'
import { Media } from '../pages/Media'

// import Check from '../pages/check'

const Myroute = () => {

    let {state, dispatch} = useContext(GlobalContext)

  return (
    <div>
        {(state?.isLogin == true)?
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile/>}></Route>
                <Route path='/Post' element={<Post/>}></Route>
                <Route path='/Media' element={<Media/>}></Route>
                <Route path='*' element={<Navigate to={"/"} />} />
            </Routes>
            :
            (state?.isLogin == false)?
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<Navigate to={"/login"} />} />
            </Routes>
            :
            <p>Loading...</p>
        }
    </div>
  )
}

export default Myroute