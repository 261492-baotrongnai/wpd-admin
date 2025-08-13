import { Admin } from "./admin.types";
import { Program } from "./program.type";

export interface Organization {
  id: number;
  thai_name: string;
  eng_name: string;
  code_name: string;
  createdAt: string;
  updatedAt: string;

  programs?: Program[];
  admins?: Admin[];
}

export interface OrganizationCreate {
  thai_name: string;
  eng_name: string;
}

