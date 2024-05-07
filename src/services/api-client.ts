import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.weekday.technology/adhoc/getSampleJdJSON",
  headers: {
    "Content-Type": "application/json",
  },
});
