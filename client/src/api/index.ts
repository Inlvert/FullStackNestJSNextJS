"use client";

import CONSTANTS from "@/constants";
import axios from "axios";

const httpClient = axios.create({
  baseURL: CONSTANTS.baseURL,
});

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshDto {
  refreshToken: string;
}

let accessToken: string | null = null;

export const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
};

httpClient.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      // config.headers = {
      //   ...config.headers,
      //   Authorization: `Bearer ${accessToken}`,
      // };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response?.data?.tokenPair) {
      console.log("there was tokens", response.data?.tokenPair);

      const { tokenPair } = response?.data;
      accessToken = tokenPair.accessToken;

      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);
    }
    return response;
  },
  async function onRejected(error) {
    const {
      response: { status },
    } = error;

    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshTokenFromLS && status === 419) {
      const {
        data: { tokenPair },
      } = await axios.post(`${CONSTANTS.baseURL}/auth/refresh`, {
        refreshToken: refreshTokenFromLS,
      });

      accessToken = tokenPair.accessToken;

      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);

      error.config.headers["Authorization"] = `Bearer ${accessToken}`;

      return httpClient.request(error.config);
    }

    return Promise.reject(error);
  }
);

export const login = (userData: LoginDto) =>
  httpClient.post("/auth/login", userData);

export const refresh = (refreshToken: string) =>
  httpClient.post("/auth/refresh", { refreshToken });
