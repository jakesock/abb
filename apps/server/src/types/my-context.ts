import DataLoader from "dataloader";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { User } from "../entity";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: string };
  };
  res: Response;
  redis: Redis;
  userLoader: DataLoader<string, User>;
};
