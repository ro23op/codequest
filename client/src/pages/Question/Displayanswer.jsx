import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../component/Avatar/Avatar';
import { useSelector ,useDispatch } from 'react-redux';
import { deleteanswer } from '../../action/question';

function Displayanswer({ question, handleshare }) {
  const user = useSelector((state)=>state.currentuserreducer)
  const {id} = useParams()
  const dispatch = useDispatch()
  const handledelete = (answerid, noofanswers) => {
    dispatch(deleteanswer(id,answerid,noofanswers-1))
  }
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans.id}>
          <p>{ans.answerbody}</p>
          <div className="question-actions-user">
            <div>
              <button type='button' onClick={handleshare}>Share</button>
              {user?.result?._id === ans?.userid && (
                <button type='button' onClick={() => handledelete(ans._id, question.noofanswers)}>Delete</button>
              )}
            </div>
            <div>
            <p>answered {moment(ans.answeredon).fromNow()}</p>
            <Link to={`Users/${ans.userid}`} className='user-link' style={{ color: "#0086d8" }}>
              <Avatar backgroundColor="orange" px='8px' py='5px' borderRadius='4px'>
                {ans.useranswered.charAt(0).toUpperCase()}
              </Avatar>
              <div>{ans.useranswered}</div>
            </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Displayanswer