import { prisma } from "../lib/db.connection";
import { Request,Response } from "express";

class Like{

  //  ADDING A LIKE.
 AddLike = async (req:Request, res:Response) => {
    const { userId, videoId } = req.body;
    try {
      const newLike = await prisma.likes.create({ data: { userId, videoId } });
      return res.status(200).json({
        success: true,
        message: "video has been liked successfully",
        data: newLike,
      });
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // REMOVING A LIKE (DISLIKING VIDEO)
 RemoveLike = async (req:Request, res:Response) => {
    const { userId, videoId } = req.query;
    const data = {
      userId: Number(userId),
      videoId: Number(videoId),
    };
  
    try {
      await prisma.likes.deleteMany({ where: data });
      return res
        .status(200)
        .json({ success: true, message: "video disliked successfully" });
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // GETING ALL THE USER'S ID WHO HAS LIKED A SPECIFIC VIDEO.
  Getlikes = async (req:Request, res:Response) => {
    const { videoId } = req.params;
    try {
      const allLikes = await prisma.likes.findMany({
        where: { videoId: Number(videoId) },
      });
      const data = allLikes.map((like) => like.userId);
      return res.status(200).json(data);
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
}

export const like=new Like();