import { db } from "../connection.js";
import moment from "moment";

// ADDING COMMENT.
export const addComment=(req,res)=>{
    const {description,userId,videoId}=req.body;
 
    try{
       const q="INSERT INTO COMMENTS (`description`,`createdAt`,`userId`,`videoId`) VALUES(?)";
       const value=[description,moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),userId,videoId];
       db.query(q,[value],(err,data)=>{
       if(err)  return res.status(500).json({success:false,message:err.message});
       return res.status(200).json({success:true,message:"commented successfully",data});
        
       });
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
    
}
// REMOVING COMMENT.
export const removeComment=(req,res)=>{
    const {id}=req.query;
    
    try{
        const q="DELETE FROM COMMENTS WHERE id=?";
        db.query(q,[id],(err,data)=>{
            if(err)  return res.status(500).json({success:false,message:err.message});
            return res.status(200).json({success:true,message:"comment deleted successfully",data});
        })
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}
// GETING ALL THE COMMENTS FOR A SPECIFIC VIDEO.
export const getComment=(req,res)=>{
    const {id}=req.params;
    try{
       const q="SELECT U.username,U.profile,C.id AS commentId,C.description,C.createdAt,C.userId FROM USER AS U INNER JOIN COMMENTS AS C ON U.id=C.userId WHERE C.videoId=? ORDER BY C.id DESC";
       db.query(q,[id],(err,data)=>{
        if(err)  return res.status(500).json({success:false,message:err.message});
        return res.status(200).json(data);
       })
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
    
}