import request from '../http/http';

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

const RegistrationService = {
    registerOnWorkshop,
    getAllRegistrations,
    getUserWorkshops,
    deleteRegistrations
}

export default RegistrationService;