import axios from 'axios';

let base = '';
let config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const requestLogin = params => { return axios.post(`MassController/login`, params,config).then(res => res.data); };

export const selectAllUser = params => { return axios.get(`UserController/selectAll`, { params: params }); };
export const updateUser = params => { return axios.post(`UserController/updateUser`, params,config ).then(res => res.data); };
export const selectUserById = params => { return axios.post(`UserController/selectById`, params,config ).then(res => res.data); };
export const selectActivity = params => { return axios.get(`ActivityController/selectActivity`, { params: params }); };
export const updateActivaty = params => { return axios.post(`ActivityController/updateByPrimaryKeySelective`, params,config ).then(res => res.data); };
export const getActivityDetail = params => { return axios.post(`ActivityController/selectById`, params,config ).then(res => res.data); };
export const getActivityDetailByName = params => { return axios.post(`ActivityController/selectByName`, params,config ).then(res => res.data); };
export const updateAcvitity = params => { return axios.post(`ActivityController/updateByPrimaryKeySelective`, params,config ).then(res => res.data); };
export const addAcvitity = params => { return axios.post(`ActivityController/insert`, params,config ).then(res => res.data); };
export const addMass = params => { return axios.post(`MassController/insert`, params,config ).then(res => res.data); };
export const getAllMass = params => { return axios.get(`MassController/selectMass`, { params: params }); };
export const selectMassByName = params => { return axios.post(`MassController/selectByName`, params,config ).then(res => res.data); };
export const selectUser = params => { return axios.get(`MassController/selectUser`, { params: params }); };
export const getMassUser = params => { return axios.post(`MassController/selectMassUser`, params,config ).then(res => res.data); };
export const editMass = params => { return axios.post(`MassController/update`, params,config ).then(res => res.data); };
export const getProductDetail = params => { return axios.post(`MassController/selectByPrimaryKey`, params,config ).then(res => res.data); };
export const uploadImage = params => { return axios.post(`MassController/upload`, params,config ).then(res => res.data); };