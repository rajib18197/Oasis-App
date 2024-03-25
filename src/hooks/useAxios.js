import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import axios from "axios";

export function useAxios() {
  const { authData, onAuthData } = useAuth();
  const authToken = authData?.token?.accessToken;

  useEffect(
    function () {
      const requestInterceptor = api.interceptors.request.use(
        (config) => {
          if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
          }

          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );

      const responseInterceptor = api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          if (
            (error.response.status === 401 || error.response.status === 403) &&
            !originalRequest._retry
          ) {
            originalRequest._retry = true;

            try {
              const refreshToken = authData?.token?.refreshToken;

              const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
                {
                  refreshToken,
                }
              );

              const newTokens = response.data;

              localStorage.removeItem("user-auth");

              const userData = {
                token: newTokens,
                user: authData.user,
              };
              localStorage.setItem("user-auth", JSON.stringify(userData));
              onAuthData(userData);
              originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
              return axios(originalRequest);
            } catch (err) {
              throw err;
            }
          }
        }
      );

      return () => {
        api.interceptors.request.eject(requestInterceptor);
        api.interceptors.response.eject(responseInterceptor);
      };
    },

    [authToken]
  );

  return { api };
}
