import { post, get } from "@/config/AxiosConfig.js";

export function Post(data, config) {
  return post("/api/homePage/index", data, config);
}

export function Get(data, config) {
  return get("/api/homePage/index", data, config);
}
