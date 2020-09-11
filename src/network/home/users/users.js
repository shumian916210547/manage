import {
  request
} from "../../request";

export function getUsers(query, pagenum, pagesize) {
  return request({
    method: "get",
    url: "users",
    params: {
      query,
      pagenum,
      pagesize
    }
  });
}