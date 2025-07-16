import apiClient from "../services/api.service";

export type Program = {
  name: string;
  hospitalName: string;
  code: string;
};

export function getPrograms() {
  const response = apiClient.get("/program/info");
  return response;
}

export function createProgram(program: Program) {
  const response = apiClient.post("/program/create", program);
  return response;
}
