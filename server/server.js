import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/Auth.js'
import videoRoutes from './routes/Video.js';
import likeRoutes from './routes/Like.js';
import subscribeRoutes from './routes/Subscribe.js'
import commentRoutes from './routes/Comment.js'; 
import viewRoutes from './routes/Views.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://65dcc4942e5823009dd8a0ec--bright-cheesecake-57616f.netlify.app',
  credentials: true
}));

app.use('/api/auth',authRoutes);
app.use('/api/video',videoRoutes);
app.use('/api/subscribes',subscribeRoutes);
app.use('/api/likes',likeRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/views',viewRoutes);

app.get('/',(req,res)=>{
    
    res.json("Hello World")
})



app.listen(8800,()=>{
    console.log("Server is running on port number 8800")
})
