import  Jwt  from "jsonwebtoken";

export const getToken=(user)=>{
    const token=Jwt.sign({id:user.id},"jsonwebtokenaftabalam")
    return token;
}

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    // console.log("Token: ",req.cookies.access_token)
    if(!token) return res.status(401).json({success:false,message:"You have not singned in"});

    try{
        const result=Jwt.verify(token,"jsonwebtokenaftabalam")
        // console.log("After verification : ",result)
        if(!result) return res.status(401).json({success:false,message:"You are not Authenticated"});
        req.id=result.id;
        next();
    }catch(err){
        return res.status(401).json({success:false,message:"Something went wrong"})
    }

}