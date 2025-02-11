import { useState,useEffect } from 'react'
import React from 'react'
import Leftsidebar from '../../component/Leftsidebar/Leftsidebar'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Avatar from '../../component/Avatar/Avatar'
import Editprofileform from './Editprofileform'
import Profilebio from './Profilebio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import "./Userprofile.css"
import { useSelector, useDispatch } from 'react-redux'
import { addFriend } from '../../action/currentuser.js'

function Userprofile({ slideIn }) {
    const { id } = useParams()
    const users = useSelector((state) => state.usersreducer)
    const currentprofile = users.filter((user) => user._id === id)[0]
    const currentuser = useSelector((state) => state.currentuserreducer);
    const dispatch = useDispatch();
    const [Switch, setswitch] = useState(false);

    // useEffect(() => {
    //     console.log("Current User:", currentuser);
    //     console.log("Current Profile:", currentprofile);
    // }, [currentuser, currentprofile]);

    // Check if the current user is already friends with the profile user
    const isFriend = currentuser?.result?.friends?.some(friendId => friendId.toString() === currentprofile?._id.toString());

    const handleAddFriend = () => {
        dispatch(addFriend(currentuser?.result._id, currentprofile._id))
    }

    return (
        <div className="home-container-1">
            <Leftsidebar slideIn={slideIn} />
            <div className="home-container-2" style={{ marginTop: "30px" }}>
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px">
                                {currentprofile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentprofile?.name}</h1>
                                <p>
                                    <FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentprofile?.joinedon).fromNow()}
                                </p>
                            </div>
                        </div>
                        
                        {/* Show the Edit Profile button only if it's the current user's profile */}
                        {currentuser?.result?._id === id && (
                            <button className="edit-profile-btn" type='button' onClick={() => setswitch(true)}>
                                <FontAwesomeIcon icon={faPen} /> Edit Profile
                            </button>
                        )}
                        
                        {/* Conditional rendering of "Add Friend" or "Friends" button */}
                        {currentuser?.result?._id !== id && !isFriend && (
                            <button className="add-friend-btn" type="button" onClick={handleAddFriend}>
                                <FontAwesomeIcon icon={faUserPlus} /> Add Friend
                            </button>
                        )}

                        {/* Show "Friends" button if already friends */}
                        {currentuser?.result?._id !== id && isFriend && (
                            <button className="add-friend-btn" type="button">
                                 Friends
                            </button>
                        )}
                    </div>
                    <>
                        {Switch ? (
                            <Editprofileform currentuser={currentuser} setswitch={setswitch} />
                        ) : (
                            <Profilebio currentprofile={currentprofile} />
                        )}
                    </>
                </section>
            </div>
        </div>
    )
}

export default Userprofile;
