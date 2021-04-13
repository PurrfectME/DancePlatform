import request from '../http/http';

const createPlace = data => {
    return request({
        method: 'POST',
        url: '/place/add',
        data: data
    });
}

const getAllPlaces = () => {
    return request({
        method: 'GET',
        url: '/place/getAll',
    });
}

const updatePlace = data => {
    return request({
        method: 'POST',
        url: '/place/update',
        data: data
    });
}

const deletePlace = id => {
    return request({
        method: 'POST',
        url: `/place/delete/${id}`,
    });
}


const PlaceService = {
    createPlace,
    getAllPlaces,
    updatePlace,
    deletePlace,
}

export default PlaceService;