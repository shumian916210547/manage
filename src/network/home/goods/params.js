import { request } from "../../request";

export function getCateList() {
  return request({
    method: "get",
    url: "categories",
  });
}

export function getParamsData(id, sel) {
  return request({
    method: "get",
    url: "categories/" + id + "/attributes",
    params: {
      sel,
    },
  });
}

export function addParams(id, attr_name, attr_sel) {
  return request({
    method: "post",
    url: "categories/" + id + "/attributes",
    data: {
      attr_name,
      attr_sel,
    },
  });
}

export function showEditDialog(id, attrId, attr_sel) {
  return request({
    method: "get",
    url: "categories/" + id + "/attributes/" + attrId,
    params: {
      attr_sel,
    },
  });
}

export function editParams(id, attrId, attr_name, attr_sel) {
  return request({
    method: "put",
    url: "categories/" + id + "/attributes/" + attrId,
    data: {
      attr_name,
      attr_sel,
    },
  });
}

export function removeParams(id, attrId) {
  return request({
    method: "delete",
    url: "categories/" + id + "/attributes/" + attrId,
  });
}

export function saveAttrVals(id, attrId, attr_name, attr_sel, attr_vals) {
  return request({
    method: "put",
    url: "categories/" + id + "/attributes/" + attrId,
    data: {
      attr_name,
      attr_sel,
      attr_vals,
    },
  });
}
