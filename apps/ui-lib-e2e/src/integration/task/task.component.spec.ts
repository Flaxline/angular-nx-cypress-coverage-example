describe('ui-lib', () => {
  beforeEach(() => cy.visit('/iframe.html?id=task--default&knob-task'));

  it('should render the component', () => {
    cy.get('task-item').should('exist');
  });
});
