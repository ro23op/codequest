import React from 'react';
import LeftsideBar from '../../component/Leftsidebar/Leftsidebar';
import Rightsidebar from '../../component/Rightsidebar/Rightsidebar';
import Questiondetails from './Questiondetails';

function Displayquestion({slideIn}) {
  return (
    <div className="home-container-1">
        <LeftsideBar slideIn={slideIn}/>
    <div className="home-container-2">
        <Questiondetails/>
        <Rightsidebar/>
    </div>
    </div>
  )
}

export default Displayquestion