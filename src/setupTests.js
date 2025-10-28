import jasmineDOM from 'jasmine-dom';

beforeAll(() => {
  jasmine.getEnv().addMatchers(jasmineDOM);
});