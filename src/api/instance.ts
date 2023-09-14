import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/AndyLotte`,
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },

  (error) => {
    console.log(error);
  },
);

export const videoInstance = axios.create({
  baseURL: `${process.env.REACT_APP_VIDEO_API_URL}`,
});

videoInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },

  (error) => {
    console.log(error);
  },
);
