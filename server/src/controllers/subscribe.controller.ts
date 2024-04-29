import { prisma } from "../lib/db.connection";
import { Request,Response } from "express";
import { CustomRequest } from "../types/request.type";

class Subscribe {

  // SUBSCRIBE THE CHANNEL
 Subscribe = async (req:Request, res:Response) => {
    const { subscriberId, channelId } = req.body;
    try {
      if (subscriberId === channelId) {
        return res.status(400).json({
          success: false,
          message: "You can not subscribe your own channel",
        });
      }
      await prisma.subscribe.create({ data: { subscriberId, channelId } });
      return res
        .status(200)
        .json({ success: true, message: "channel subscribed successfully" });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  // UNSUBSCRIBE THE CHANNEL
  Unsubscribe = async (req:Request, res:Response) => {
    const { subscriberId, channelId } = req.query;
    const data = {
      subscriberId: Number(subscriberId),
      channelId: Number(channelId),
    };
    try {
      await prisma.subscribe.deleteMany({ where: data });
      return res
        .status(200)
        .json({ success: true, message: "unsubscribed successfully" });
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  // LIST OF SUBSCRIBERS OF A SPECFIC CHANNEL.
 Getsubscriber = async (req:Request, res:Response) => {
    const { channelId } = req.params;
    try {
      const subscriberIds = await prisma.subscribe.findMany({
        where: { channelId: Number(channelId) },
      });
      const data = subscriberIds.map((subscriber) => subscriber.subscriberId);
      return res.status(200).json(data);
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  // Get all the channels details that a user has subscribed to.
 GetSubscribedChannels = async (req:CustomRequest, res:Response) => {
    const channelId = req.userId;
    try {
      const subscribedChannels = await prisma.subscribe.findMany({
        select: {
          channelId: true,
        },
        where: { subscriberId: channelId },
      });
      const channelIds = subscribedChannels.map((channel) => channel.channelId);
      const allChannels = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          profile: true,
        },
        where: { id: { in: channelIds } },
      });
      return res.status(200).json(allChannels);
  
  
    } catch (err:any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

}

export const subscribe=new Subscribe();