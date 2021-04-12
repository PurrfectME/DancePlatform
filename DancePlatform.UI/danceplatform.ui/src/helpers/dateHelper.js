function normalizeDate(sharpDate) {
    const date = new Date(Date.parse(sharpDate));

    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDay()}`;
};

function normalizeTime(sharpDate) {
    const date = new Date(Date.parse(sharpDate));

    return `${date.getHours()}:${date.getMinutes()}`;
};


const timeHelper = {
    normalizeDate,
    normalizeTime,
}

export default timeHelper;