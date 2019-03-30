
export const getApiHost = () => {
    const host = window.location.protocol + "//" + window.location.hostname;
    const port = process.env.PORT || 3009;
    const address = host + ':' + port;
    return address;
};
