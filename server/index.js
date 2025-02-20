import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userroutes from './routes/user.js'
import questionroutes from './routes/question.js'
import answerroutes from './routes/answer.js'
import postroutes from './routes/post.js'
import loginroutes from './routes/login.js';
import session from "express-session";

const app = express();
dotenv.config();

app.use(
    session({
        secret: "your-secret-key", // Change this to a strong secret
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);


app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

app.use('/user',userroutes);
app.use('/questions',questionroutes);
app.use('/post',postroutes);
app.use('/answer',answerroutes);
app.use('/auth',loginroutes);



app.get('/', (req,res)=>{
    res.send("Codequest is running perfect")
})

const PORT = process.env.PORT || 5000
const database_url = process.env.MONGODB_URL

mongoose.connect(database_url)
.then(()=>app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`)
}))
.catch((err)=>console.log(err.message))