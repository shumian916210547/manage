import { request } from "../../request";

export function getUsers(query, pagenum, pagesize) {
  return request({
    method: "get",
    url: "users",
    params: {
      query,
      pagenum,
      pagesize,
    },
  });
}

export function addUsers(username, password, email, mobile) {
  return request({
    method: "post",
    url: "users",
    data: {
      username,
      password,
      email,
      mobile,
    },
  });
}

export function queryUserinfo(id) {
  return request({
    method: "get",
    url: "users/" + id,
  });
}

export function alterUserinfo(id, email, mobile) {
  return request({
    method: "put",
    url: "users/" + id,
    data: {
      email,
      mobile,
    },
  });
}

export function changeUserstate(uId, type) {
  return request({
    method: "put",
    url: "users/" + uId + "/state/" + type,
  });
}

export function deleteUser(id) {
  return request({
    method: "delete",
    url: "users/" + id,
  });
}

export function getRoles() {
  return request({
    method: "get",
    url: "roles",
  });
}

export function newRoles(id, rid) {
  return request({
    method: "put",
    url: "users/" + id + "/role",
    data: {
      rid,
    },
  });
}
