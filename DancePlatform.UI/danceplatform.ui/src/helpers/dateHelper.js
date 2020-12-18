export default function normalizeDate(sharpDate) {
    const date = new Date(Date.parse(sharpDate));

    return date.toString();
}