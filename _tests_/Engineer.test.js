const Engineer = require('../lib/engineer');

describe('Engineer', () => {
  describe('Initialization', () => {
    it('create an object with the properties of the engineer role', () => {
      const newEngineer = new Engineer('Cannon', 1, 'fake@gmail.com', 'clbult');
      expect(newEngineer.name).toEqual('Cannon')
    });
    it('getRole() is used to get the engineer role', () => {
      const newEngineer = new Engineer('Cannon', 1, 'fake@gmail.com', 'clbult');
      expect(newEngineer.getRole()).toEqual('Engineer')
    })
  })
})