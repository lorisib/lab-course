import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // për refresh cookie
});

// REQUEST → shton access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });

  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        localStorage.setItem("token", newToken);

        api.defaults.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;