import { request } from "../../request";

export function getCateList() {
  return request({
    method: "get",
    url: "categories",
  });
}

export function tabClicked(Id, sel) {
  return request({
    method: "get",
    url: "categories/" + Id + "/attributes",
    params: {
      sel,
    },
  });
}

export function addGoods(
  goods_name,
  goods_cat,
  goods_price,
  goods_number,
  goods_weight,
  goods_introduce,
  pics,
  attrs
) {
  return request({
    method: "post",
    url: "goods",
    data: {
      goods_name,
      goods_cat,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics,
      attrs,
    },
  });
}
