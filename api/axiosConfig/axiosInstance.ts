import axios from 'axios';

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_RICK_AND_MORTY_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
  },
};

export const axiosInstance = axios.create(config);
