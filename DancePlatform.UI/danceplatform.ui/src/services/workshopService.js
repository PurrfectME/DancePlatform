import request from '../http/http';

const getAllWorkshops = () => {
    return request({
        method: 'GET',
        url: '/workshop/getAll'
    });
}

const WorkshopService = {
    getAllWorkshops,
}

export default WorkshopService;