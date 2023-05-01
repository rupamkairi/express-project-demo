import { Response } from "express";
import { Request } from "../../types";
import { roles } from "../../roles";

export function readAllPostsAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};

    // if (req.user?.roles?.includes(roles.admin)) {
    //   filter = { ...filter };
    // } else if (req.user?.roles?.includes(roles.user)) {
    //   filter = { ...filter, user: req.user._id };
    // } else {
    // }

    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}

export function readPostAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};
    filter = { ...filter, _id: req.params.id };
    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}

export function updatePostAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};

    if (req.user?.roles?.includes(roles.admin)) {
      filter = { ...filter, _id: req.params.id };
    } else if (req.user?.roles?.includes(roles.user)) {
      filter = { ...filter, _id: req.params.id, user: req.user._id };
    } else {
    }

    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}

export function deletePostAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};
    filter = { ...filter, _id: req.params.id, user: req.user?._id };
    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}
