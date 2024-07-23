export default (num) => {
    const numStr = `${num}`;
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    if (regex.test(numStr)) {
        return parseFloat(numStr).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }

    return `${num}`;
}