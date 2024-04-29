import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/request.type";

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
 
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "You have not singned in" });

  try {
    const result = jwt.verify(token, "jsonwebtokenaftabalam") as { id: number };

    if (!result)
      return res
        .status(401)
        .json({ success: false, message: "You are not Authenticated" });
    req.userId = result.id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Something went wrong" });
  }
};
