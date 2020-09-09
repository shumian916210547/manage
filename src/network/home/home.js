import {
  request
} from "../request";

export function getMenulist() {
  return request({
    method: "get",
    url: "menus"
  });
}