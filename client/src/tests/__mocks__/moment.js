//https://jestjs.io/docs/en/manual-mocks

const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
};