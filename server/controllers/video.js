import { prisma } from "../connection.js";


export const addvideo=async(req,res)=>{
    const {videoUrl,imageUrl,videoTitle,videoDesc,userId}=req.body;
    
    try{
        const data={title:videoTitle,videoUrl:videoUrl,imgUrl:imageUrl,description:videoDesc,userId:Number(userId)}
     
        const newVideo=await prisma.video.create({data:data});
        return res.status(200).json({success:true,message:"video successfully uploaded",newVideo})
   
    }catch(e){
        return res.status(500).json(e.message)
    }
}
export const getAllVideos=async(req,res)=>{
   
    try{
        const allVideos=await prisma.video.findMany({select:{
            id:true,
            title:true,
            imgUrl:true,
            createdAt:true,
            user:{select:{

                username:true,
                profile:true
            }
            }
        },
        orderBy:{id:"desc"}
    })
    return res.status(200).json(allVideos);
    //    const q="SELECT U.username,U.profile,V.id,V.title,V.imgUrl,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id = V.userId ORDER BY V.id DESC";
  
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}
export const getSuggestionvideos=async(req,res)=>{
     const {VID}=req.params
    
    try{
        const videos = await prisma.video.findMany({
            select: {
              user: {
                select: {
                  username: true
                }
              },
              id: true,
              title: true,
              imgUrl: true,
              createdAt: true
            },
            where: {
              id: {
                not: Number(VID) 
              }
            }
          });
          
          // Shuffle the array to achieve random ordering
          videos.sort(() => Math.random() - 0.5);
          
          // Limit the results to 10
          const randomVideos = videos.slice(0, 10);
          return res.json(randomVideos)
    //    const q="SELECT U.username,V.id AS videoId,V.title,V.imgUrl,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id = V.userId WHERE V.id!=? ORDER BY RAND ( )   limit 10";
   
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}
export const getSingleVideo=async(req,res)=>{
     const {id}=req.params
     
    try{
        const video=await prisma.video.findUnique({select:{
            id:true,
            title:true,
            videoUrl:true,
            imgUrl:true,
            description:true,
            createdAt:true,
            user:{select:{
                id:true,
                username:true,
                profile:true
            }}
        },where:{id:Number(id)}})
        return res.status(200).json(video);
    //     const q="SELECT U.id as userId, U.username,U.profile,V.id,V.title,V.videoUrl,V.descriptions,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id = V.userId WHERE V.id=?" ;
    
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}
export const deletevideo=async(req,res)=>{
    const {id}=req.params
    try{
       const deletedVideo=await prisma.video.delete({where:{id:Number(id)}})
       return res.status(200).json({success:true,message:"Video deleted successfully",data:deletedVideo});
     
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const getSpecificChannelVideos=async(req,res)=>{
    const {id}=req.params
    try{
        const videos=await prisma.video.findMany({select:{
            id:true,
            title:true,
            imgUrl:true,
            createdAt:true,
            user:{
                select:{
                   username:true,
                   profile:true
                }
            },
        },where:{userId:Number(id)}})
    //    const q="SELECT U.profile,U.username,V.id,V.title,V.imgUrl,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id = V.userId WHERE V.userId =?"
   
        return res.status(200).json(videos);
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const subscriptionvideos=async(req,res)=>{
    const id=req.id;
    try{
        const SubscribedChannelIds = await prisma.subscribe.findMany({
            where: {
              subscriberId: Number(id) 
            },
            select: {
              channelId: true
            }
          });
        const channelIds=SubscribedChannelIds.map(channel=>channel.channelId)
       
          const videosData = await prisma.video.findMany({
            select: {
                id:true,
                title:true, 
                imgUrl:true,
                createdAt:true,
              user:{
                select:{
                   username:true,
                   profile:true,
                }
              }
            },where:{userId:{in:channelIds}}
          });
          
          return res.status(200).json(videosData);
          
    //    const q="SELECT U.username,U.profile, V.id,V.title,V.imgUrl,V.createdAt FROM USER AS U INNER JOIN VIDEO AS V ON U.id=V.userId WHERE U.id IN(SELECT S.channelId FROM USER AS U INNER JOIN SUBSCRIBE AS S ON U.id=S.subscriberId WHERE subscriberId=?)"
  
    }catch(err){
     return res.status(500).json({success:false,message:err.message});
    }
    
 }

 