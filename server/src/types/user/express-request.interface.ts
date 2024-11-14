import { Request } from "express";
import { UserDocumentInterface } from "./user.interface";

export interface ExpressRequestInterface extends  Request{
  user?: UserDocumentInterface;
}
