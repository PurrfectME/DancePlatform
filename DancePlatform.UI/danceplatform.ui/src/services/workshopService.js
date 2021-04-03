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
    return axios.post("http://localhost:51928/workshop/add", data, 
    {headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",'Authorization': `Bearer ${storageHelper.getToken()}`} 
});}

const editWorkshop = data => {
    return axios.post("http://localhost:51928/workshop/update", data, 
    {headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",'Authorization': `Bearer ${storageHelper.getToken()}`} 
});}

const deleteWorkshop = id => {
    return request({
        method: 'POST',
        url: `/workshop/delete/${id}`
    });
}

const getRegisteredUsersOnWorkshop = id => {
    return request({
        method: 'GET',
        url: `/workshop/registered-users/${id}`
    });
};

const WorkshopService = {
    getAllWorkshops,
    getAvailableWorkshopsForUser,
    createWorkshop,
    editWorkshop,
    deleteWorkshop,
    getRegisteredUsersOnWorkshop,
}

export default WorkshopService;