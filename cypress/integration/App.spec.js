/* eslint-disable no-undef */
describe('Dashboard Application', () => {
  it('Shows Dashboard app', () => {
    cy.visit('/');
    cy.contains('Dashboard');
  });
});
