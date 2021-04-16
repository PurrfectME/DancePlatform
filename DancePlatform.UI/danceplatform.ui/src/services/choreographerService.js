import request from '../http/http';

const getAll = () => {
    return request({
        method: 'GET',
        url: '/choreographer/getAll/',
    });
}

const create = data => {
    return request({
        method: 'POST',
        url: '/choreographer/add',
        data: data
    });
}

const deleteChoreographer = id => {
    return request({
        method: 'POST',
        url: `/choreographer/delete/${id}`,
    });
}

const ChoreographerService = {
    getAll,
    create,
    deleteChoreographer
}

export default ChoreographerService;