export default function normalizeDate(sharpDate) {
    const date = new Date(sharpDate);

    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
};