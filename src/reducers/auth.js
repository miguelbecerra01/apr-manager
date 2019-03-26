//handle the action of loggin in and logged out
export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};