import React from 'react'
import Rightsidebar from '../../component/Rightsidebar/Rightsidebar'
import Leftsidebar from '../../component/Leftsidebar/Leftsidebar'
import HomemainbarP from './HomemainbarP'
import '../../App.css'

const Public = ({slideIn}) => {
  return (
    <div className="home-container-1">
      <Leftsidebar slideIn={slideIn}/>
      <div className="home-container-2">
        <HomemainbarP/>
        <Rightsidebar/>
      </div>
    </div>
  )
}

export default Public;