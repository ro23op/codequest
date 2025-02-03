import { useEffect,useState } from 'react';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Allroutes from './Allroutes';
import { fetchallusers } from './action/users';
import { fetchallquestion } from './action/question';
import { useDispatch } from 'react-redux';

function App() {
  const [slideIn, setSlideIn] = useState(true);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchallusers());
    dispatch(fetchallquestion());
  },[dispatch])

  useEffect(()=>{
    if(window.innerWidth<=768){
      setSlideIn(false);
    }
  },[])
  const handleSlideIn = ()=>{
    if(window.innerWidth<=768){
      setSlideIn((state)=>!state)
    }
  }
  return (
    <div className="App">
      <Router>
      <Navbar handleSlideIn = {handleSlideIn}/>
      <Allroutes slideIn={slideIn} handleSlideIn={handleSlideIn}/>
      </Router>
    </div>
  );
}

export default App;
