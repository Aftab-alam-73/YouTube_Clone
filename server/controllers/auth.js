import { prisma } from "../connection.js";
import bcrypt from 'bcryptjs'
import { getToken } from "../jwt.js";

// Signup

export const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user) {
      return res.json({ success: false, message: "User already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = await prisma.user.create({
        data: { ...req.body, password: hashPassword },
      });
      return res
        .status(200)
        .json({
          success: true,
          message: "User created successfully!",
          newUser,
        });
    }
  } catch (err) {
    return res
      .status(501)
      .json({ message: "Something went wrong", error: err });
  }
};

// Sign in with username and password

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      
      if (result) {
        const token = getToken(user);
        const { password, ...others } = user;
        return res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .json({
            success: true,
            message: "User signed in successfully",
            data: others,
          });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Password mismatch" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// SignIn With Google Account

export const googlesigning = async (req, res) => {
  const { username, email, profile } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
   
    if (user) {
      const token = getToken(user);
      const { password, email, ...others } = user;
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ success: true, data: others });
    }
    const newUser = await prisma.user.create({
      data: { username, email, profile },
    });
    const token = getToken(newUser);
    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ success: true, data: newUser });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Logout
export const signout = (req, res) => {
  //  console.log("cookie Before: ", req.cookies.access_token)
  res
    .clearCookie("access_token", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User logged out successfully");
};

// Setting profile picture
export const setProfile = async(req, res) => {
  const { id, profile } = req.body;
  try {
    const updatedProfile =await prisma.user.update({data:{profile: profile},where:{id:id}})
    return res.status(200).json({ success: true, message: "profile updated", updatedProfile });
   
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
