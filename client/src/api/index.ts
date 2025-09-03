import CONSTANTS from "@/constants";
import axios from "axios";

const httpClient = axios.create({
  baseURL: CONSTANTS.baseURL,
});

export interface LoginDto {
  email: string;
  password: string;
}

export const login = (userData: LoginDto) =>
  httpClient.post("/auth/login", userData);
