import React from 'react'
import { useSelector } from 'react-redux'
import ProfileDropdown from '../Components/Core/Auth/ProfileDropdown';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const{loading:authloading}=useSelector( (state)=>state.auth);
     const{loading:profileloading}=useSelector( (state)=>state.profile);

    if(profileloading || authloading){
        return(
            <div className='mt-10'>
                Loading
            </div>
        )
    }

  return (
    <div>
      <ProfileDropdown></ProfileDropdown>
      <div>
        <div>
            <Outlet>
                
            </Outlet>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
