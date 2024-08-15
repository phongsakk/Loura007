const number2Decimal = (num) => {
    const strVal = `${num ?? 0}`.replace(/,/g, "");
    const parsed = parseFloat(strVal);
    return parseFloat(parsed.toFixed(2));  // Round to 2 decimal places and convert to float
}

export default number2Decimal;