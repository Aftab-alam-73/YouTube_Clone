import { prisma } from "../connection.js";
import moment from "moment";

// ADDING COMMENT.
export const addComment=async(req,res)=>{
    // const {description,userId,videoId}=req.body;
 
    try{
       const newComment=await prisma.comments.create({data:req.body})
       return res.status(200).json({success:true,message:"commented successfully",newComment});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
    
}
// REMOVING COMMENT.
export const removeComment=async(req,res)=>{
    const {id}=req.query;
    try{
        const deletedComment=await prisma.comments.delete({where:{id:Number(id)}})
        return res.status(200).json({success:true,message:"comment deleted successfully",deletedComment});
      
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}
// GETING ALL THE COMMENTS FOR A SPECIFIC VIDEO.
export const getComment=async(req,res)=>{
    const {videoId}=req.params;
    
    try{
        const comments = await prisma.comments.findMany({
            select: {
              user: {
                select: {
                  username: true,
                  profile: true,
                }
              },
              id :true,
              description: true,
              createdAt: true,
              userId: true
            },
            where: {
              videoId: Number(videoId)
            },
            orderBy: {
              id: 'desc'
            }
          });
    //    const q="SELECT U.username,U.profile,C.id AS commentId,C.description,C.createdAt,C.userId FROM USER AS U INNER JOIN COMMENTS AS C ON U.id=C.userId WHERE C.videoId=? ORDER BY C.id DESC";
    
        return res.status(200).json(comments);

    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
    
}

