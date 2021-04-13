import request from '../http/http';
import axios from 'axios';
import storageHelper from '../helpers/storageHelper';

const registerOnWorkshop = data => {
    return request({
        method: 'POST',
        url: '/registration/add',
        data: data
    });
}

const getAllRegistrations = () => {
    return request({
        method: 'GET',
        url: '/registration/getAll',
    });
}

const getUserWorkshops = userId => {
    return request({
        method: 'GET',
        url: `/registration/${userId}`,
    });
}

const deleteRegistrations = id => {
    return request({
        method: 'POST',
        url: `/registration/delete/${id}`,
    });
}

const checkoutUsers = data => {
    return axios.post("http://localhost:51928/registration/checkout-users", data, 
    {headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",'Authorization': `Bearer ${storageHelper.getToken()}`} 
});}


const RegistrationService = {
    registerOnWorkshop,
    getAllRegistrations,
    getUserWorkshops,
    deleteRegistrations,
    checkoutUsers
}

export default RegistrationService;