import React from 'react'
import Rightsidebar from '../../component/Rightsidebar/Rightsidebar'
import Leftsidebar from '../../component/Leftsidebar/Leftsidebar'
import Homemainbar from '../../component/Homemainbar/Homemainbar'
import '../../App.css'

const Public = ({slideIn}) => {
  return (
    <div className="home-container-1">
      <Leftsidebar slideIn={slideIn}/>
      <div className="home-container-2">
        <Homemainbar/>
        <Rightsidebar/>
      </div>
    </div>
  )
}

export default Public;