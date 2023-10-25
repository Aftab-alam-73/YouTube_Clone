import { db } from "../connection.js";

//  ADDING A LIKE.
export const like=(req,res)=>{
   const {userId,videoId}=req.body;
   
   try{
      const q="INSERT INTO LIKES (`userId`,`videoId`) VALUES(?)";
      const value=[userId,videoId];
      db.query(q,[value],(err)=>{
        if(err) return res.status(500).json({success:false,message:err.message})
        return res.status(200).json({success:true,message:"video has been liked successfully"});
      })
   }catch(err){
    return res.status(500).json({success:false,message:err.message});
   }

}

// REMOVING A LIKE (DISLIKING VIDEO)
export const dislike=(req,res)=>{
   const {userId,videoId}=req.query;
  
   try{
      const q="DELETE FROM LIKES WHERE userId=? AND videoId=?";
      
      db.query(q,[userId,videoId],(err,data)=>{
        if(err) return res.status(500).json({success:false,message:err.message})
        return res.status(200).json({success:true,message:"video disliked successfully"});
      })
   }catch(err){
    return res.status(500).json({success:false,message:err.message})
   }
}

// GETING ALL THE USER'S ID WHO HAS LIKED A SPECIFIC VIDEO.
export const getlikes=(req,res)=>{
    const {id}=req.params;
    try{
        const q="SELECT userId FROM LIKES WHERE videoId=?";
        db.query(q,[id],(err,data)=>{
            if(err) return res.status(500).json({success:false,message:err.message})
            const newdata= data.map((data)=>{
             return data.userId;
        })
            return res.status(200).json(newdata);
        })
    }catch(err){
    return res.status(500).json({success:false,message:err.message});
    }
}