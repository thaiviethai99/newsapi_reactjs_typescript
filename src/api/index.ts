import axios, { AxiosRequestConfig } from "axios";

const BASE_API = {
  url: "https://newsapi.org/v2",
  headers: {
    "X-API-Key":'f35b45cd60c84a48bdbdc12d1ce71d4a',
    "Content-Type": "application/json"
  },
};
Object.seal(BASE_API);

const call = async (config: AxiosRequestConfig) => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchEverything = async () => {
  const response = await call({
    url: `${BASE_API.url}/top-headlines?country=us&pageSize=1`,
    headers: BASE_API.headers,
    method: "GET",
  });
  return response;
};

export const fetchTopHeadlines = async () => {
  const response = await call({
    url: `${BASE_API.url}/top-headlines?country=us&pageSize=10`,
    headers: BASE_API.headers,
    method: "GET",
  });
  return response;
};

export const fetchNewsWithCategory = async (_: string, category: string) => {
  const response = await call({
    url: `${BASE_API.url}/top-headlines?country=us&category=${category}&pageSize=3`,
    headers: BASE_API.headers,
    method: "GET",
  });
  return response;
}
