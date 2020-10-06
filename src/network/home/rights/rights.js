import { request } from "../../request";

export function getRights() {
  return request({
    method: "get",
    url: "rights/" + "list",
  });
}
