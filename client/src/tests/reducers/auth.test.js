import authReducer from '../../reducers/auth';

//the test to reducers are done to the state of redux
test('should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: '123s'
    };

    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test('should crear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    };

    const state = authReducer({ uid: '123s' }, action);
    expect(state).toEqual({});
});