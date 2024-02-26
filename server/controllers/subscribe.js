import {prisma} from '../connection.js'

// SUBSCRIBE THE CHANNEL
export const subscribe=async(req,res)=>{
    const {subscriberId,channelId} = req.body;
    try{
        if(subscriberId===channelId){
            return res.status(400).json({success:false,message:"You can not subscribe your own channel"});
        }
        await prisma.subscribe.create({data:{subscriberId,channelId}})
        return res.status(200).json({success:true,message:"channel subscribed successfully"});
    }catch(err){
       return res.status(500).json({success:false,message:err.message})
    }
    
}
// UNSUBSCRIBE THE CHANNEL 
export const unsubscribe=async(req,res)=>{
  const {subscriberId,channelId} = req.query;
  const  data={
    subscriberId:Number(subscriberId),
    channelId:Number(channelId)
  }
  try{
     await prisma.subscribe.deleteMany({where:data})
     return res.status(200).json({success:true,message:"unsubscribed successfully"});
   }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }

}
// LIST OF SUBSCRIBERS OF A SPECFIC CHANNEL.
export const getsubscriber=async(req,res)=>{
    const {channelId}=req.params;
    try{
      const subscriberIds=await prisma.subscribe.findMany({where:{channelId:Number(channelId)}})
      const data=subscriberIds.map(subscriber=>subscriber.subscriberId)
      return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}
// Get all the channels details that a user has subscribed to.
export const getSubscribedChannels=async(req,res)=>{
  const channelId=req.id
  try{
     const subscribedChannels = await prisma.subscribe.findMany({select:{
       channelId:true,
     },where:{subscriberId:channelId}}) 
     const channelIds=subscribedChannels.map(channel=>channel.channelId)
     const allChannels = await prisma.user.findMany({
      select:{
        id:true,
        username:true,
        profile:true,
      },where:{id:{in:channelIds}}
     })
      return res.status(200).json(allChannels)
    
    // const q="SELECT id ,username,profile FROM USER WHERE id IN(SELECT channelId FROM SUBSCRIBE WHERE subscriberId=?)"
    // db.query(q,[channelId],(err,data) => {
    //   if(err) return res.status(500).json({success:false, message:err.message});
    //   return  res.status(200).json(data);
  // });
  }catch(err){
    return res.status(500).json({success:false, message:err.message});
  }
}

