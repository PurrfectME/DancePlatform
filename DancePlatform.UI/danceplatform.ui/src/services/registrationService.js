import request from '../http/http';

const registerOnWorkshop = data => {
    console.log(data);
    return request({
        method: 'POST',
        url: '/registration/add',
        data: data
    });
}

const RegistrationService = {
    registerOnWorkshop,
}

export default RegistrationService;