import { Organization } from "./organization.type";
import { Program } from "./program.type";

export interface Admin {
  id: number;
  internalId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  organizations?: Organization[];
  programs?: Program[];
}
export interface AdminCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  internalId?: string; // Optional for creation, can be set later
}
