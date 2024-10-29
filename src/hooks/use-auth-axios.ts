import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

import { routes } from "@/constants/route";
import { authAxios } from "@/http/api";
import useTokenStore from "@/store";

export interface TAxiosRequestWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const useAuthAxios = () => {
  const navigate = useNavigate();
  const { token, clearToken } = useTokenStore(); // Retrieve token from store

  // Memoized navigate to prevent unnecessary re-renders
  const memoizedNavigate = React.useCallback(navigate, []);

  React.useEffect(() => {
    // Request interceptor to add Authorization header if token exists
    const axiosRequest = authAxios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!token) {
          memoizedNavigate(routes.LOGIN);
          return Promise.reject(
            new Error("No token found, redirecting to login")
          );
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error) // Handle request error
    );

    // Response interceptor to handle authentication errors (401/418)
    const axiosResponse = authAxios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const originalRequest = error?.config as TAxiosRequestWithRetry;
        const errorResponse = error?.response as AxiosResponse;

        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error("Axios error: ", error);
        }

        if (
          errorResponse?.status === 401 && // Unauthorized error
          !originalRequest?._retry // Prevent infinite loops
        ) {
          originalRequest._retry = true;
          clearToken(); // Clear token on 401 error
          memoizedNavigate(routes.LOGIN); // Redirect to login
        }

        if (errorResponse?.status === 418 && !originalRequest?._retry) {
          originalRequest._retry = true;
          memoizedNavigate(routes.LOGIN);
        }

        return Promise.reject(error); // Reject the error after handling
      }
    );

    // Clean up interceptors on unmount or token/navigation change
    return () => {
      authAxios.interceptors.request.eject(axiosRequest);
      authAxios.interceptors.response.eject(axiosResponse);
    };
  }, [token, memoizedNavigate, clearToken]);

  return authAxios;
};
