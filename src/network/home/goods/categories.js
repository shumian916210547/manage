import { request } from "../../request";

export function getCateList(queryInfo) {
  return request({
    method: "get",
    url: "categories",
    params: {
      queryInfo,
    },
  });
}

export function getParentCateList() {
  return request({
    method: "get",
    url: "categories",
    params: {
      type: 2,
    },
  });
}

export function addCate(cat_pid, cat_name, cat_level) {
  return request({
    method: "post",
    url: "categories",
    data: {
      cat_pid,
      cat_name,
      cat_level,
    },
  });
}

export function removeCate(id) {
  return request({
    method: "delete",
    url: "categories/" + id,
  });
}

export function eidtCate(id, cat_name) {
  return request({
    method: "put",
    url: "categories/" + id,
    data: {
      cat_name,
    },
  });
}

export function showEditCateDialog(id) {
  return request({
    method: "get",
    url: "categories/" + id,
  });
}
