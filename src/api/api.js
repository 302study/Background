import axios from 'axios';

let base = '';
let config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const requestLogin = params => { return axios.post(`MassController/login`, params,config).then(res => res.data); };


export const selectActivity = params => { return axios.get(`ActivityController/selectActivity`, { params: params }); };
export const updateActivaty = params => { return axios.post(`ActivityController/updateByPrimaryKeySelective`, params,config ).then(res => res.data); };
export const addMass = params => { return axios.post(`MassController/insert`, params,config ).then(res => res.data); };
export const getProductList = params => { return axios.get(`MassController/selectMass`, { params: params }); };
export const selectUser = params => { return axios.get(`MassController/selectUser`, { params: params }); };
export const getMassUser = params => { return axios.post(`MassController/selectMassUser`, params,config ).then(res => res.data); };
export const editMass = params => { return axios.post(`MassController/update`, params,config ).then(res => res.data); };
export const getProductDetail = params => { return axios.post(`MassController/selectByPrimaryKey`, params,config ).then(res => res.data); };
export const uploadImage = params => { return axios.post(`MassController/upload`, params,config ).then(res => res.data); };