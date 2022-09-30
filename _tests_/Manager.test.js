const Manager = require('../lib/manager');

describe('Manager', () => {
  describe('Initialization', () => {
    it('create an object with the properties of the manager role', () => {
      const newManager = new Manager('Cannon', 1, 'fake@gmail.com', 1);
      expect(newManager.name).toEqual('Cannon')
    });
    it('getRole() is used to get the manager role', () => {
      const newManager = new Manager('Cannon', 1, 'fake@gmail.com', 1);
      expect(newManager.getRole()).toEqual('Manager')
    })
  })
})