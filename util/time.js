const time = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return now.toLocaleDateString(undefined, options);
}

module.exports = {
    time,
}