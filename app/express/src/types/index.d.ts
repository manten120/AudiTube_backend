import { Request } from 'express';

export type Body = {
  password?: string;
  displayId?: string;
  userName?: string;
  oldPassword?: string;
  newPassword?: string;
  newPasswordForCheck?: string;
  userId?: string;
  videoId?: string;
  channelId?: string;
};

export type Query = {
  userId?: string;
};

export interface CustomReq extends Request {
  query: Query;
  body: Body;
}

export type PriorityValue = 0 | 1 | 2 | 3;
