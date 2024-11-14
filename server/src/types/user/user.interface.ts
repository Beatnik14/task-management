import { Document } from "mongoose";

interface UserInterface {
  email: string;
  password: string;
  username: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface UserDocumentInterface extends UserInterface, Document {
  validatePassword(param1: string): Promise<boolean>;
}
