import { db } from "../connection.js";
import moment from 'moment'
// moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
export const addvideo=(req,res)=>{
    const {videoUrl,imageUrl,videoTitle,videoDesc,userId}=req.body;
    
    try{
    const q="INSERT INTO VIDEO(`title`,`videoUrl`,`imgUrl`,`descriptions`,`createdAt`,`userId`) VALUES (?)";
    const value=[videoTitle,videoUrl,imageUrl,videoDesc, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),userId]
    db.query(q,[value],(err,data)=>{
        if(err) return res.status(500).json({success:false,message:err.message})
        return res.status(200).json({success:true,message:"video successfully uploaded",data})
    })
    }catch(e){
        return res.status(500).json("Something went wrong")
    }
}
export const getvideos=(req,res)=>{
   
    try{
       const q="SELECT U.username,U.profile,V.id,V.title,V.imgUrl,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id = V.userId ORDER BY V.id DESC";
       db.query(q,(err,data)=>{
        if(err) return res.status(500).json({success:false,message:err.message})
        return res.status(200).json(data);
       })
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}
export const getSuggestionvideos=(req,res)=>{
     const {VID}=req.params
    
    try{
       const q="SELECT U.username,V.id AS videoId,V.title,V.imgUrl,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id = V.userId WHERE V.id!=? ORDER BY RAND ( )   limit 10";
       db.query(q,[VID],(err,data)=>{
        if(err) return res.status(500).json({success:false,message:err.message})
        return res.status(200).json(data);
       })
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}
export const getvideo=(req,res)=>{
     const {id}=req.params
    try{
        const q="SELECT U.id as userId, U.username,U.profile,V.id,V.title,V.videoUrl,V.descriptions,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id = V.userId WHERE V.id=?" ;
       db.query(q,[id],(err,data)=>{
        if(err) return res.status(500).json({success:false,message:err});
        return res.status(200).json(data);
       })
    }catch(err){
        return res.status(500).json({success:false,message:err});
    }
}
export const deletevideo=(req,res)=>{
    const {id}=req.params
    try{
       const q="DELETE FROM VIDEO WHERE id=?";
       db.query(q,[id],(err,data)=>{
         if(err) return res.status(500).json({success:false,error:err.message})
         return res.status(200).json({success:true,message:"Video deleted successfully"});
       })
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const getSpecificChannelVideos=(req,res)=>{
    const {id}=req.params
    try{
       const q="SELECT U.profile,U.username,V.id,V.title,V.imgUrl,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id = V.userId WHERE V.userId =?"
       db.query(q,[id],(err,data)=>{
        if(err) return res.status(500).json({success:false,error:err.message})
        return res.status(200).json(data);
       })
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const subscriptionvideos=(req,res)=>{
    const id=req.id;
   
    try{
       const q="SELECT U.username,U.profile, V.id,V.title,V.imgUrl,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id=V.userId WHERE U.id IN(SELECT S.channelId FROM USER AS U INNER JOIN SUBSCRIBE AS S ON U.id=S.subscriberId WHERE subscriberId=?)"
       db.query(q,[id],(err,data)=>{
         if(err)return res.status(500).json({success:false,message:err.message})
         return res.status(200).json(data);
       })
    }catch(err){
     return res.status(500).json({success:false,message:err.message});
    }
    
 }