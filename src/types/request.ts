import { Request as ExpressRequest } from "express";
import { FilterQuery, MongooseQueryOptions, Schema } from "mongoose";
import { roles } from "../roles";

export interface Request extends ExpressRequest {
  user?: {
    _id?: Schema.Types.ObjectId | string;
    roles?: roles[];
  };
  mongodb?: {
    query?: {
      filter:
        | {
            _id?: Schema.Types.ObjectId | string;
          }
        | any;
    };
  };
}
