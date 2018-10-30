import configureStore from './configureStore'

describe('configureStore', () => {

  it('should configure a store', () => {
    expect.assertions(3)
    const store = configureStore()

    expect(store).toHaveProperty('getState')
    expect(store).toHaveProperty('dispatch')
    expect(store).toHaveProperty('subscribe')
  });
  
});