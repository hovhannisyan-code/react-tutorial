export default function DateYMD(date) {
    return new Date(date).toISOString().slice(0, 10);
}