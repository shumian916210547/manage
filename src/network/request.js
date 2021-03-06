import axios from "axios";


export function request(config) {
  const instance = axios.create({
    baseURL: "https://www.liulongbin.top:8888/api/private/v1/",
    timeout: "5000",
  });

  //请求拦截
  instance.interceptors.request.use(
    (config) => {
      if (window.sessionStorage.getItem('token')) {
        config.headers.Authorization = window.sessionStorage.getItem('token');
      }
      return config;
    },
    (err) => {
      console.log("err");
    }
  );

  //响应拦截
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
    }
  );


  return instance(config);
}