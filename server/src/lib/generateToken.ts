import  Jwt  from "jsonwebtoken";

export const getToken=(userId:number)=>{
    const token=Jwt.sign({id:userId},"jsonwebtokenaftabalam")
    return token;
}