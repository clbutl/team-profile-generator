const Employee = require('../lib/employee');

describe('Employee', () => {
  describe('Initialization', () => {
    it('create an object with the properties of the employee role', () => {
      const newEmployee = new Employee('Cannon', 1, 'fake@gmail.com');
      expect(newEmployee.name).toEqual('Cannon');
      expect(newEmployee.id).toEqual(1);
      expect(newEmployee.email).toEqual('fake@gmail.com');
    });
    it('returns the name', () => {
      const newEmployee = new Employee('Cannon', 1, 'fake@gmail.com');
      expect(newEmployee.getName()).toEqual('Cannon')
    });
    it('returns the id', () => {
      const newEmployee = new Employee('Cannon', 1, 'fake@gmail.com');
      expect(newEmployee.getId()).toEqual(1)
    });
    it('returns the email', () => {
      const newEmployee = new Employee('Cannon', 1, 'fake@gmail.com');
      expect(newEmployee.getEmail()).toEqual('fake@gmail.com')
    });
    it('returns the "Employee" role', () => {
      const newEmployee = new Employee('Cannon', 1, 'fake@gmail.com');
      expect(newEmployee.getRole()).toEqual('Employee')
    })
  })
})