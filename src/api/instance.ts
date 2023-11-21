import axios from "axios";

export const LogenInstance = axios.create({
  baseURL: `${process.env.REACT_APP_CHART_API_URL}/AndyLogen`,
});

LogenInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },

  (error) => {
    console.log(error);
  },
);

export const LotteInstance = axios.create({
  baseURL: `${process.env.REACT_APP_LOTTE_API_URL}/AndyLotte`,
});

LotteInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },

  (error) => {
    console.log(error);
  },
);

export const HanjinInstance = axios.create({
  baseURL: `${process.env.REACT_APP_HANJIN_API_URL}/AndyHanjin`,
});

HanjinInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },

  (error) => {
    console.log(error);
  },
);

export const HandexInstance = axios.create({
  baseURL: `${process.env.REACT_APP_HANDEX_API_URL}/AndyHandex`,
});

HandexInstance.interceptors.response.use(
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
