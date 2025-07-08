import authReducer, { login, register, logout } from '../store/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle logout', () => {
    const state = {
      user: { id: '1', email: 'test@example.com' },
      token: 'test-token',
      loading: false,
      error: null,
    };

    const newState = authReducer(state, logout());
    expect(newState.user).toBeNull();
    expect(newState.token).toBeNull();
  });

  it('should handle login.pending', () => {
    const action = { type: login.pending.type };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle login.fulfilled', () => {
    const payload = { token: 'test-token', user: { id: '1' } };
    const action = { type: login.fulfilled.type, payload };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.token).toBe('test-token');
  });
});