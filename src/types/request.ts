import { Request as ExpressRequest } from "express";

export interface Request extends ExpressRequest {
  user?: {
    _id?: string;
  };
}
