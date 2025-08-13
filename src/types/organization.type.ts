export interface Organization {
  id: number;
  thai_name: string;
  eng_name: string;
  code_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationCreate {
  thai_name: string;
  eng_name: string;
}
