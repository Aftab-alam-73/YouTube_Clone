import { prisma} from "../connection.js";

//  ADDING A LIKE.
export const like=async(req,res)=>{
   const {userId,videoId}=req.body;
   try{
      const newLike=await prisma.likes.create({data:{userId,videoId}});
         return res.status(200).json({success:true,message:"video has been liked successfully",data:newLike});
   }catch(err){
    return res.status(500).json({success:false,message:err.message});
   }

}

// REMOVING A LIKE (DISLIKING VIDEO)
export const dislike=async(req,res)=>{
   const {userId,videoId}=req.query;
    const data={
      userId:Number(userId),
      videoId:Number(videoId)
    }
    
   try{
      await prisma.likes.deleteMany({where:data})
      return res.status(200).json({success:true,message:"video disliked successfully"});
     
   }catch(err){
    return res.status(500).json({success:false,message:err.message})
   }
}

// GETING ALL THE USER'S ID WHO HAS LIKED A SPECIFIC VIDEO.
export const getlikes=async(req,res)=>{
    const {id}=req.params;
    try{
      const allLikes=await prisma.likes.findMany({where:{videoId:Number(id)}})
     const data= allLikes.map(like => like.userId)
      return res.status(200).json(data);
    
    }catch(err){
    return res.status(500).json({success:false,message:err.message});
    }
}

