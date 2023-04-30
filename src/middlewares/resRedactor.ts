import { NextFunction, Response } from "express";
import { Request } from "../types";

export default async function redact(body: any, req: Request, res: Response) {
  try {
    console.log("body", body);

    res.json(body);
  } catch (error) {
    console.log("error", error, body);

    res.json(body);
  }
}

export async function modify(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("modify");

    res.json = (body: any) => {
      return body;
    };

    next();
  } catch (error) {
    console.log("modify", error);
  }
}
