import axios from 'axios';

let base = '';
let config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const requestLogin = params => { return axios.post(`user/login`, params,config).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
export const getProductList = params => { return axios.get(`manage/product/list`, { params: params }); };