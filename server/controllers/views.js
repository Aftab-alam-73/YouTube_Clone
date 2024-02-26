import {prisma } from "../connection.js";


export const addview=async(req,res)=>{
    const {userId,videoId}=req.body;
    console.log(userId,videoId);
    try{
        await prisma.views.create({data:{userId,videoId}});
        return res.status(200).json({success:true,message:"view saved successfully"});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const getview=async(req,res)=>{
  const {id}=req.params;
   try{
        const views=await prisma.views.findMany({where:{videoId:Number(id)}});
        const viewerIds=views.map(view=>view.userId)
        return res.status(200).json(viewerIds);
       
   }catch(err){
    return res.status(500).json({success:false,message:err.message});
   }
}

