import { Admin } from "./admin.types";
import { Organization } from "./organization.type";
import { User } from "./user.types";

export interface Program {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  organizationId?: number;
  organization?: Organization;
  users?: User[];
  admin?: Admin[];
}

export interface ProgramTable {
  program: Program;
  totalUser: number;
}
