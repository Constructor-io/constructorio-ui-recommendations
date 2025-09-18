/**
 * Basic setup test to ensure Jest is working and prevent "no tests found" error
 * TODO: Remove this file once actual tests are added
 */
describe('Project Setup', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true);
  });

  it('should have access to testing utilities', () => {
    expect(expect).toBeDefined();
    expect(describe).toBeDefined();
    expect(it).toBeDefined();
  });
});
