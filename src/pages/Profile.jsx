import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/Context';
import axios from 'axios';
import { useEffect } from 'react';
import './profile.css'



export const Profile = () => {


    // data store in a context api
  let {state , dispatch} = useContext(GlobalContext);


  const [profile,setProfile] = useState({})

    // useEffect  check is the userTOken is available or not.
  useEffect(() => {

    // get the userToken from local storage
    let userToken = localStorage.getItem("userToken");

    // api for check the user authorization
    axios.get('https://dummyjson.com/auth/me' , { headers: { Authorization: `Bearer ${userToken}` }})
    .then((res) => {
      console.log(res.data)
      setProfile(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className='d-flex justify-content-center align-items-center   ' style={{height:"100vh", overflow:"hidden" }}>
       
       <div className='d-flex flex-column justify-content-center align-items-center p-3 border ' style={{boxShadow: "0px 0px 5px rgb(0,0,0)"}} >
        <div>
        <img
                src={profile?.data?.image}
                alt="logo"
                width={200}
                height={200}
                style={{ borderRadius: "50%", boxShadow: "0 0 5px black" }}
              />
        </div>

        <div className='mt-3'>
            <h6 className='border p-2 fields'>Name: {profile?.data?.firstName} {profile?.data?.lastName}</h6>
            <h6 className='border p-2 fields active'>Age: {profile?.data?.age}</h6>
            <h6 className='border p-2 fields'>Email: {profile?.data?.email}</h6>
            <h6 className='border p-2 fields'>Phone no: {profile?.data?.phone}</h6>
            <h6 className='border p-2 fields'>Address: {profile?.data?.address?.address} {profile?.data?.address?.city}</h6>
        </div>

        </div>

        
    </div>
  )
}
