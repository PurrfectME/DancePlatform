import moment from 'moment';

function normalizeDate(sharpDate) {
    const date = moment(sharpDate);
    
    const y = date.year();
    const m = date.month();
    const d = date.date();
    return date.format('YYYY-MM-DD');
};

function normalizeTime(sharpDate) {
    const date = moment(sharpDate);
    

    const h = date.hours();
    const m = date.minutes();
    return date.format('HH:mm');
};


const timeHelper = {
    normalizeDate,
    normalizeTime,
}

export default timeHelper;