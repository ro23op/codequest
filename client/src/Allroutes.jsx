import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AskQuestion from './pages/Askquestion/Askquestion';
import Auth from './pages/Auth/Auth';
import Question from './component/Homemainbar/Question';
import Displayquestion from './pages/Question/Displayquestion';
import Tags from './pages/Tags/Tags';
import Users from './pages/Users/Users';
import Userprofile from './pages/Userprofile/Userprofile';


function Allroutes({slideIn,handleSlideIn}) {
  return (
    <Routes>
        <Route path='/' element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Askquestion' element={<AskQuestion/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/Question' element={<Question slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Question/:id' element={<Displayquestion slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Tags' element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Users' element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Users/:id' element={<Userprofile slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
    </Routes>
  )
}

export default Allroutes