import { Response } from "express";
import { roles } from "../../roles";
import { Request } from "../../types";

export function readAllUsersAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};

    if (req.user?.roles?.includes(roles.admin)) {
      filter = { ...filter };
    } else if (req.user?.roles?.includes(roles.user)) {
      filter = { ...filter, _id: req.user._id };
    } else {
    }

    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}

export function readUserAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};

    if (req.user?.roles?.includes(roles.admin)) {
      filter = { ...filter, _id: req.params.id };
    } else if (req.user?.roles?.includes(roles.user)) {
      if (req.params.id === req.user?._id) {
        filter = { ...filter, _id: req.params.id };
      } else {
        res.status(403);
      }
    } else {
    }

    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}

export const updateUserAccess = readUserAccess;

export function deleteUserAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};

    if (req.params.id === req.user?._id) {
      filter = { ...filter, _id: req.params.id };
    } else {
      res.status(403);
    }

    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}

export function canDoSomethingElse() {
  console.log("this also runs");
}
