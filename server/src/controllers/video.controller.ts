import { prisma } from "../lib/db.connection";
import { Request, Response } from "express";
import { VideoInputData } from "../types/video.type.js";
import { CustomRequest } from "../types/request.type.js";

class Video {

  // Add a video
  AddVideo = async (req: Request, res: Response) => {
    const { title, videoUrl, imgUrl, description, userId } =
      req.body as VideoInputData;
    try {
      const newVideo = await prisma.video.create({
        data: { title, videoUrl, imgUrl, description, userId },
      });
      return res.status(200).json({
        success: true,
        message: "video successfully uploaded",
        newVideo,
      });
    } catch (err: any) {
      return res.status(500).json(err.message);
    }
  };

  // Fetches all videos
  GetVideos = async (req: Request, res: Response) => {
    try {
      const videos = await prisma.video.findMany({
        select: {
          id: true,
          title: true,
          imgUrl: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              profile: true,
            },
          },
        },
        orderBy: { id: "desc" },
      });
      return res.status(200).json(videos);
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  // Fetches a Single Video
  GetVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const video = await prisma.video.findUnique({
        select: {
          id: true,
          title: true,
          videoUrl: true,
          imgUrl: true,
          description: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              profile: true,
            },
          },
        },
        where: { id: Number(id) },
      });
      return res.status(200).json(video);
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  // Delete a video
  DeleteVideo = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    try {
      const deletedVideo = await prisma.video.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({
        success: true,
        message: "Video deleted successfully",
        data: deletedVideo,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // Fetches suggestions videos.
  GetSuggestionvideos = async (req:Request, res:Response) => {
    const { videoId } = req.params;
  
    try {
      const videos = await prisma.video.findMany({
        select: {
          user: {
            select: {
              username: true,
            },
          },
          id: true,
          title: true,
          imgUrl: true,
          createdAt: true,
        },
        where: {
          id: {
            not: Number(videoId),
          },
        },
      });
  
      // Shuffle the array to achieve random ordering
      videos.sort(() => Math.random() - 0.5);
  
      // Limit the results to 10
      const randomVideos = videos.slice(0, 10);
      return res.json(randomVideos);
     
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

 // Fetches all the videos of a specific channel. 
 GetSpecificChannelVideos = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
      const videos = await prisma.video.findMany({
        select: {
          id: true,
          title: true,
          imgUrl: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              profile: true,
            },
          },
        },
        where: { userId: Number(id) },
      });
      
      return res.status(200).json(videos);
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

 // Fetches all the channels videos that a user has subscribed to. 
 GetSubscriptionVideos = async (req:CustomRequest, res:Response) => {

    const id = req.userId;
    try {
      const SubscribedChannelIds = await prisma.subscribe.findMany({
        where: {
          subscriberId: Number(id),
        },
        select: {
          channelId: true,
        },
      });
      const channelIds = SubscribedChannelIds.map((channel) => channel.channelId);
  
      const videosData = await prisma.video.findMany({
        select: {
          id: true,
          title: true,
          imgUrl: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              profile: true,
            },
          },
        },
        where: { userId: { in: channelIds } },
      });
  
      return res.status(200).json(videosData);
  
     
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
}



export const video = new Video();
