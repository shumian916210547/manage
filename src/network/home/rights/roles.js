import { request } from "../../request";

export function getRoles() {
  return request({
    method: "get",
    url: "roles",
  });
}

export function delpower(roleId, rightId) {
  return request({
    method: "delete",
    url: "roles/" + roleId + "/rights/" + rightId,
  });
}

export function getAllrights() {
  return request({
    method: "get",
    url: "rights/" + "tree",
  });
}

export function roleAuth(roleId, rids) {
  return request({
    method: "post",
    url: "roles/" + roleId + "/rights",
    data: {
      rids,
    },
  });
}

export function delroles(id) {
  return request({
    method: "delete",
    url: "roles/" + id,
  });
}
