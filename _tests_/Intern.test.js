const Intern = require('../lib/intern');

describe('Intern', () => {
  describe('Initialization', () => {
    it('create an object with the properties of the intern role', () => {
      const newIntern = new Intern('Cannon', 1, 'fake@gmail.com', 'North Central State College');
      expect(newIntern.name).toEqual('Cannon')
    });
    it('getRole() is used to get the intern role', () => {
      const newIntern = new Intern('Cannon', 1, 'fake@gmail.com', 'North Central State College');
      expect(newIntern.getRole()).toEqual('Intern')
    })
  })
})