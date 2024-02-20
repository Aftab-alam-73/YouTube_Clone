import {db} from '../connection.js'

// SUBSCRIBE THE CHANNEL
export const subscribe=(req,res)=>{
    
    const {subscriberId,channelId} = req.body;
    try{
        if(subscriberId===channelId){
            return res.status(400).json({success:false,message:"You can not subscribe your own channel"});
        }
        const q="INSERT INTO SUBSCRIBE(`subscriberId`,`channelId`) VALUES(?)";
        const value=[subscriberId,channelId];
        db.query(q,[value],(err,data)=>{
            if(err) return res.status(500).json({success:false,message:err.message});
            return res.status(200).json({success:true,message:"channel subscribed successfully"});
        })
    }catch(err){
       return res.status(500).json({success:false,message:err.message})
    }
    
}
// UNSUBSCRIBE THE CHANNEL 
export const unsubscribe=(req,res)=>{
  const {subscriberId,channelId} = req.query;
  try{
     const q="DELETE FROM SUBSCRIBE WHERE subscriberId=? AND channelId=?";
     db.query(q,[subscriberId,channelId],(err,data)=>{
        if(err) return res.status(500).json({success:false,message:err.message});
        return res.status(200).json({success:true,message:"unsubscribed successfully",data});
     })
  }catch(err){
    return res.status(500).json({success:false,message:err.message});
  }

}
// LIST OF SUBSCRIBERS OF A SPECFIC CHANNEL.
export const getsubscriber=(req,res)=>{
    const {channelId}=req.params;
    try{
      const q="SELECT subscriberId FROM SUBSCRIBE WHERE channelId=?";
      db.query(q,[channelId],(err,data)=>{
        if(err) return res.status(500).json({success:false,message:err.message})
        const newdata= data.map((data)=>{
        return data.subscriberId;
    })
        return res.status(200).json(newdata);
      })
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}
// Get all the channels details that a user has subscribed to.
export const getSubscribedChannels=(req,res)=>{
  const channelId=req.id
  console.log(channelId)
  try{
    const q="SELECT id ,username,profile FROM USER WHERE id IN(SELECT S.channelId FROM USER AS U INNER JOIN SUBSCRIBE AS S ON U.id=S.subscriberId  WHERE S.subscriberId=?)"
    db.query(q,[channelId],(err,data) => {
      if(err) return res.status(500).json({success:false, message:err.message});
      return  res.status(200).json(data);
  });
  }catch(err){
    return res.status(500).json({success:false, message:err.message});
  }
}

