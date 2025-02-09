import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:5000"
})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("Profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("Profile")).token
        }`;
    }
    return req;
})

export const login = (authdata)=>API.post("user/login",authdata)
export const signup = (authdata)=>API.post("user/signup",authdata)
export const getallusers = ()=> API.get('/user/getallusers');
export const updateprofile = (id,updatedata)=>API.patch(`user/update/${id}`,updatedata);
export const postquestion = (questiondata)=> API.post("/questions/Ask",questiondata);
export const getallquestions = ()=> API.get("/questions/get");
export const deletequestion = (id) => API.delete(`/questions/delete/${id}`);
export const votequestion = (id,value) => API.patch(`/questions/vote/${id}`,{value})
export const postanswer = (id,noofanswers,answerbody,useranswered)=> API.patch(`/answer/post/${id}`,{noofanswers,answerbody,useranswered})
export const deleteanswer = (id,answerid,noofanswers)=>API.patch(`/answer/delete/${id}`,{answerid,noofanswers})
export const addFriend = (userId, friendId) => API.post("/user/add-friend", { userId, friendId });
export const createPost = (formData) => API.post("/post/create", formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
export const getAllPosts = () => API.get("/post/get");
export const likePost = (postId, userId) => API.post("/post/like",{postId,userId})
export const commentOnPost = (postId,userId,comment) => API.post("/post/comment",{postId,userId,comment});
export const getUserFriends = (userId) => API.get(`user/friends/${userId}`)