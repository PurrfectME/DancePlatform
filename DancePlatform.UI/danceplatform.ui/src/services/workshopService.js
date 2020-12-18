import request from '../http/http';
import axios from 'axios';
import storageHelper from '../helpers/storageHelper';

const getAllWorkshops = () => {
    return request({
        method: 'GET',
        url: '/workshop/getAll'
    });
}

const getAvailableWorkshopsForUser = userId => {
    return request({
        method: 'GET',
        url: `/workshop/available/${userId}`
    });
};

const createWorkshop = data => {
    return axios.post("https://localhost:44328/workshop/add", data, 
    {headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",'Authorization': `Bearer ${storageHelper.getToken()}`} 
});}

const editWorkshop = data => {
    console.log('DATA',data);
    return axios.post("https://localhost:44328/workshop/update", data, 
    {headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",'Authorization': `Bearer ${storageHelper.getToken()}`} 
});}

const WorkshopService = {
    getAllWorkshops,
    getAvailableWorkshopsForUser,
    createWorkshop,
    editWorkshop
}

export default WorkshopService;