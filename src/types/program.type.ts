import { Organization } from "./organization.type";

export interface Program {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  organizationId?: number;
  organization?: Organization;
}

export interface ProgramTable {
  program: Program;
  totalUser: number;
}
