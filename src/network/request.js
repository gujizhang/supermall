import axios from 'axios'
export function request(config) {
  //1.创建axois的的实例
  const instance = axios.create({
    timeout: 5000,

  })
  //拦截器
  instance.interceptors.request.use(config =>{
    // console.log(config);
    return config
  },err =>{
      console.log(err)
  })
  //响应拦截
  instance.interceptors.response.use(res =>{
    // console.log(res);
    return res.data
  },err =>{
    console.log(err)
  })
  //发送网络请求
  return instance(config)
}

