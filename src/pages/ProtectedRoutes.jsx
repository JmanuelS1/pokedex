import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoutes = () => {

    const trainer = useSelector((store) => store.trainer);

    if(trainer.length > 2) {
      return <Outlet/>
    } else {
      return <Navigate to='/'/>
    }
}
export default ProtectedRoutes