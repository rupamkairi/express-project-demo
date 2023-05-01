import { Response } from "express";
import { Request } from "../../types";
import { roles } from "../../roles";

export function readAllTodosAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};
    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}

export function readTodoAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};
    filter = { ...filter, _id: req.params.id };
    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}

export function updateTodoAccess(req: Request, res: Response) {
  try {
    let filter = req?.mongodb?.query?.filter ?? {};
    filter = { ...filter, _id: req.params.id, user: req.user?._id };
    req.mongodb = { query: { filter } };
  } catch (error) {
    throw error;
  }
}

export const deleteTodoAccess = updateTodoAccess;
