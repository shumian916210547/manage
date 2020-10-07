import { request } from "../../request";

export function getGoodsList(query, pagenum, pagesize) {
  return request({
    method: "get",
    url: "goods",
    params: {
      query,
      pagenum,
      pagesize,
    },
  });
}
