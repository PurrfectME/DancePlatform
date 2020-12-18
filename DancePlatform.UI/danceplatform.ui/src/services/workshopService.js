import request from '../http/http';

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
} 

const WorkshopService = {
    getAllWorkshops,
    getAvailableWorkshopsForUser
}

export default WorkshopService;