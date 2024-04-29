import { prisma } from "../lib/db.connection";
import { Request,Response } from "express";
import moment from "moment";

class Comment{

  // ADDING COMMENT.
   AddComment = async (req:Request, res:Response) => {
    // const {description,userId,videoId}=req.body;
  
    try {
      const newComment = await prisma.comments.create({ data: req.body });
      return res
        .status(200)
        .json({ success: true, message: "commented successfully", newComment });
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  // REMOVING COMMENT.
   RemoveComment = async (req:Request, res:Response) => {
    const { id } = req.query;

    try {
      const deletedComment = await prisma.comments.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({
        success: true,
        message: "comment deleted successfully",
        deletedComment,
      });
    } catch (err: any) {  
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  // GETING ALL THE COMMENTS FOR A SPECIFIC VIDEO.
 GetComments = async (req:Request, res:Response) => {
    const { videoId } = req.params;
  
    try {
      const comments = await prisma.comments.findMany({
        select: {
          user: {
            select: {
              username: true,
              profile: true,
            },
          },
          id: true,
          description: true,
          createdAt: true,
          userId: true,
        },
        where: {
          videoId: Number(videoId),
        },
        orderBy: {
          id: "desc",
        },
      });
  
      return res.status(200).json(comments);
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
}

export const comment=new Comment();