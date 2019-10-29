import axios from 'axios';

let base = '';
let config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const requestLogin = params => { return axios.post(`MassController/login`, params,config).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addMass = params => { return axios.post(`MassController/insert`, params,config ).then(res => res.data); };
export const getProductList = params => { return axios.get(`MassController/selectMass`, { params: params }); };
export const selectUser = params => { return axios.get(`MassController/selectUser`, { params: params }); };
export const getMassUser = params => { return axios.post(`MassController/selectMassUser`, params,config ).then(res => res.data); };
export const editMass = params => { return axios.post(`MassController/update`, params,config ).then(res => res.data); };
export const delMass = params => { return axios.post(`MassController/update`, params,config ).then(res => res.data); };
export const getProductDetail = params => { return axios.post(`MassController/selectByPrimaryKey`, params,config ).then(res => res.data); };
export const uploadImage = params => { return axios.post(`MassController/upload`, params,config ).then(res => res.data); };