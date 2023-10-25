import { db } from "../connection.js";


export const addview=(req,res)=>{
    const {userId,videoId}=req.body;
    console.log(userId,videoId);
    try{
        const q1="SELECT * FROM VIEWS WHERE userId=? AND videoId=?"
        db.query(q1,[userId,videoId],(err,data)=>{
            if(err) return res.status(500).json({success:false,message:err.message});
            if(data.length > 0){
                return res.json("User already viewed this video")
            }else{
                  const q="INSERT INTO VIEWS(`userId`,`videoId`) VALUES(?)";
                  const value=[userId,videoId];
                  db.query(q,[value],(err)=>{
                     if(err) return res.status(500).json({success:false,message:err.message});
                    return res.status(200).json({success:true,message:"view saved successfully"});
        })
            }
        })
      
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const getview=(req,res)=>{
  const {id}=req.params;
   try{
        const q="SELECT * FROM VIEWS WHERE videoId=?";
        db.query(q,[id],(err,data)=>{
            if(err) return res.status(500).json({success:false,message:err.message});
            const newData=data.map((result)=>{
                return result.userId;
            })
            return res.status(200).json(newData);
        })
   }catch(err){
    return res.status(500).json({success:false,message:err.message});
   }
}