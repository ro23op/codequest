import { useEffect,useState } from 'react';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Allroutes from './Allroutes';
import { fetchallusers } from './action/users';
import { fetchallquestion } from './action/question';
import { fetchPosts } from './action/post';
import { useDispatch ,useSelector} from 'react-redux';
import { getUserFriends } from './action/currentuser';


function App() {
  const [slideIn, setSlideIn] = useState(true);
  const dispatch = useDispatch()
  // const user = useSelector((state) => state.currentuserreducer?.result); // Fix user structure
  // useEffect(() => {
  //   dispatch(fetchPosts());
  //   if (user?._id) {
  //     // console.log("Fetching friends for user:", user._id);
  //     dispatch(getUserFriends(user._id));
  //   }
  // }, [dispatch, user?._id]);

  useEffect(()=>{
    dispatch(fetchallusers());
    dispatch(fetchallquestion());
    dispatch(fetchPosts());
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
