import { Request } from 'express';

export type Body = {
  password?: string;
  displayId?: string;
  userName?: string;
};

export type Query = {};

export interface CustomReq extends Request {
  query: Query;
  body: Body;
}
