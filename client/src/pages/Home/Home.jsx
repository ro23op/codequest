import React from 'react';
import LeftsideBar from '../../component/Leftsidebar/Leftsidebar';
import Rightsidebar from '../../component/Rightsidebar/Rightsidebar';
import Homemainbar from '../../component/Homemainbar/Homemainbar';
import '../../App.css'

function Home({slideIn}) {
  return (
    <div className="home-container-1">
        <LeftsideBar slidein={slideIn}/>
    <div className="home-container-2">
        <Homemainbar/>
        <Rightsidebar/>
    </div>
    </div>
  )
}

export default Home