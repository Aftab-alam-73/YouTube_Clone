import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route'
import videoRoutes from './routes/video.route';
import likeRoutes from './routes/like.route';
import subscribeRoutes from './routes/subscribe.route'
import commentRoutes from './routes/comment.route'; 
import viewRoutes from './routes/views.route';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
  
}));
app.use('/api/auth',authRoutes);
app.use('/api/video',videoRoutes);
app.use('/api/subscribe',subscribeRoutes);
app.use('/api/like',likeRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/view',viewRoutes);

app.get('/',(req,res)=>{
    
    res.json("Welcome to my YouTube 2.O backend server!");
})



app.listen(8800,()=>{
    console.log("Server is running on port number 8800")
})
