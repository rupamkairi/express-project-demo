import { Response } from "express";
import { Request } from "../../../types";

export async function createCommentAccess(req: Request, res: Response) {
  try {
    // anyone
  } catch (error) {
    throw error;
  }
}

export async function readCommentAccess(req: Request, res: Response) {
  try {
    // anyone
  } catch (error) {
    throw error;
  }
}

export async function deleteCommentAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};
    filter = { ...filter, _id: req.params.id, user: req.user?._id };
    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}
