import { prisma } from "../lib/db.connection";
import { Request,Response } from "express";

class View {

  Addview = async (req:Request, res:Response) => {
    const { userId, videoId } = req.body;
   
    try {
      await prisma.views.create({ data: { userId, videoId } });
      return res
        .status(200)
        .json({ success: true, message: "view saved successfully" });
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
  Getview = async (req:Request, res:Response) => {
    const { videoId } = req.params;
    try {
      const views = await prisma.views.findMany({
        where: { videoId: Number(videoId) },
      });
      const viewerIds = views.map((view) => view.userId);
      return res.status(200).json(viewerIds);
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
}


export const view=new View();