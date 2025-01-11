import { useState } from 'react'
import React from 'react'
import Leftsidebar from '../../component/Leftsidebar/Leftsidebar'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Avatar from '../../component/Avatar/Avatar'
import Editprofileform from './Editprofileform'
import Profilebio from './Profilebio'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBirthdayCake, faPen} from '@fortawesome/free-solid-svg-icons'
import "./Userprofile.css"
import { useSelector } from 'react-redux'

function Userprofile({slideIn}) {
    const {id} = useParams()
    const users = useSelector((state)=>state.usersreducer)
    const currentprofile = users.filter((user)=>user._id === id)[0]
    const currentuser = useSelector((state)=>state.currentuserreducer)
    const [Switch,setswitch] = useState(false);
    return (
        <div className="home-container-1">
            <Leftsidebar slideIn={slideIn} />
            <div className="home-container-2" style={{ marginTop: "30px" }}>
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px">{currentprofile.name.charAt(0).toUpperCase()}</Avatar>
                            <div className="user-name">
                                <h1>{currentprofile?.name}</h1>
                                <p>
                                    <FontAwesomeIcon icon={faBirthdayCake}/> Joined{" "} {moment(currentprofile?.joinedon).fromNow()}
                                </p>
                            </div>
                        </div>
                        {currentuser?.result?._id === id && (
                            <button className="edit-profile-btn" type='button' onClick={()=>{setswitch(true)}}><FontAwesomeIcon icon={faPen}/> Edit Profile</button>
                        )}
                    </div>
                    <>
                    {Switch ?(
                        <Editprofileform currentuser={currentuser} setswitch= {setswitch} />
                    ):(
                        <Profilebio currentprofile={currentprofile}/>
                    )}
                    </>
                </section>
            </div>
        </div>
    )
}

export default Userprofile