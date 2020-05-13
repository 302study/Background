import axios from 'axios';

let base = '';
let config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
var api='http://47.100.242.234:8080/'
export const requestLogin = params => { return axios.post( api+`MassController/login`, params,config).then(res => res.data); };

export const selectAllUser = params => { return axios.get( api+`UserController/selectAll`, { params: params }); };
export const updateUser = params => { return axios.post( api+`UserController/updateUser`, params,config ).then(res => res.data); };
export const selectUserById = params => { return axios.post( api+`UserController/selectById`, params,config ).then(res => res.data); };
export const selectActivity = params => { return axios.get( api+`ActivityController/selectActivity`, { params: params }); };
export const updateActivaty = params => { return axios.post( api+`ActivityController/updateByPrimaryKeySelective`, params,config ).then(res => res.data); };
export const getActivityDetail = params => { return axios.post( api+`ActivityController/selectById`, params,config ).then(res => res.data); };
export const getActivityDetailByName = params => { return axios.post( api+`ActivityController/selectByName`, params,config ).then(res => res.data); };
export const updateAcvitity = params => { return axios.post( api+`ActivityController/updateByPrimaryKeySelective`, params,config ).then(res => res.data); };
export const addAcvitity = params => { return axios.post( api+`ActivityController/insert`, params,config ).then(res => res.data); };
export const addMass = params => { return axios.post( api+`MassController/insert`, params,config ).then(res => res.data); };
export const getAllMass = params => { return axios.get( api+`MassController/selectMass`, { params: params }); };
export const getAllMassApply = params => { return axios.get( api+`MassController/selectMassApply`, { params: params }); };
export const updateMassApply = params => { return axios.get( api+`MassController/updateMassApply`, { params: params }); };
export const selectMassByName = params => { return axios.post( api+`MassController/selectByName`, params,config ).then(res => res.data); };
export const selectUser = params => { return axios.get( api+`MassController/selectUser`, { params: params }); };
export const getMassUser = params => { return axios.post( api+`MassController/selectMassUser`, params,config ).then(res => res.data); };
export const editMass = params => { return axios.post( api+`MassController/update`, params,config ).then(res => res.data); };
export const getProductDetail = params => { return axios.post( api+`MassController/selectByPrimaryKey`, params,config ).then(res => res.data); };
export const uploadImage = params => { return axios.post( api+`MassController/upload`, params,config ).then(res => res.data); };