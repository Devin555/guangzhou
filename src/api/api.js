import axios from 'axios';
// import Mock from '../mock/mock'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const http = {
  get(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(function (data) {
        resolve(data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error)
      })
    })
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(function (data) {
        resolve(data);
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
