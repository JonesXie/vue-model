import { post, get } from "@/config/AxiosConfig.js";

export function xie(data, config) {
  return post("/api/homePage/index", data, config);
}

export function qi(data, config) {
  return get("/api/homePage/index", data, config);
}
