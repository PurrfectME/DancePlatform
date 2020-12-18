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

const RegistrationService = {
    registerOnWorkshop,
    getAllRegistrations,
}

export default RegistrationService;