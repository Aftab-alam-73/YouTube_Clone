import { db } from "../connection.js";
import bcrypt from 'bcrypt'
import { getToken } from "../jwt.js";


// Signup

export const signup = async(req, res) => {
  
  const { username, email, password } = req.body;
  try {
          
    const q1 = "SELECT * FROM USER WHERE username=?";
    db.query(q1, [username], (err, result) => {
      if (err) return res.json({success:false, message: "Something went wrong", error: err });
      // console.log(result);
      if (result.length>0) {
        return res.json({success:false,message:"User already exists"});
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const q ="INSERT INTO USER (`username`, `email`, `password`) VALUES(?)";
        const value = [username, email, hashPassword];
        db.query(q, [value], (errs, data) => {
          if (errs)return res.json({success:false, message: "Something went wrong", error: errs });
          return res.json({success: true, message:"User created successfully!",data})
        });
      }
    });
  } catch (err) {
    res.json({ message: "Something went wrong", error: err });
  }
};

// Sign in with username and password

export const signin =(req, res) => {
  const {username, password} = req.body;
  
  try{
    const q="SELECT * FROM USER WHERE username=?";
    db.query(q,[username],async (err, data) => {
       if(err) return res.status(500).json({success:false,message:"something went wrong"})
      else if(data.length>0){
        if(data[0].password===null){
          return res.status(400).json({success:false,message:"Incorrect password"});
        }
         const result= await bcrypt.compare(password, data[0].password)
        //  console.log(result)
         if(result){
          const user=data[0];
           const token=getToken(user)
            const{password,...others}=user
          return res.status(200).cookie("access_token", token,{httpOnly:true}).json({success:true,message:"User signed in successfully",data:others})
         }else{
           return res.status(500).json({success:false,message:"Password mismatch"})
         }
       }else{
         return res.status(404).json({success:false,message:"User not found"})
       }
    })
  }catch(err){
    return res.json({success: false, message: err.message});
  }
};

// SignIn With Google Account

export const googlesigning = (req, res) => {
    const {username,email,profile}=req.body;
    try{
       const q="SELECT * FROM USER WHERE username=?"
       db.query(q,[username],(err,data) => {
         if(err) return res.status(500).json({success:false,message:"something went wrong", error:err.message})
         else if(data.length>0){
          const user=data[0];
          const {password,email,...others}=user;
          const token=getToken(user);
          return res.status(200).cookie("access_token",token,{httpOnly:true}).json({success:true,data:others})

        }else{
          const q2="INSERT INTO USER (`username`, `email`, `profile`) VALUES(?)";
          const value=[username,email,profile]
          db.query(q2,[value],(err,result)=>{
             if(err) return res.status(500).json({success:false,message:"Something went wrong",error:err.message})
             const user={id:result.insertId,username,profile};
             const token=getToken(user);
             return res.status(200).cookie("access_token",token,{httpOnly:true}).json({success:true,data:user})
          })
        }
       })
    }catch(err){
      return res.json({success: false, message: err.message});
    }
};

// Logout
export const signout = (req, res) => {
  //  console.log("cookie Before: ", req.cookies.access_token)
   res.clearCookie("access_token",{
    secure:true,
    sameSite:'none'
   }).status(200).json("User logged out successfully")
  
};

// Setting profile picture
export const setProfile=(req,res)=>{
  const {id,profile}=req.body;
  console.log(id,profile);
  try{
     const q="UPDATE USER SET profile=? WHERE id=?";
     db.query(q,[profile,id],(err,data)=>{
      if(err) return res.status(500).json({success:false,message:err.message});
      return res.status(200).json({success:true,message:"profile updated",data});
     })
  }catch(err){
      return res.status(500).json({success:false,message:err.message});
  }
}