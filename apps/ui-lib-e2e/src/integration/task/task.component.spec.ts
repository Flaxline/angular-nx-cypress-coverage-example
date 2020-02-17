describe('ui-lib', () => {
  beforeEach(() => cy.visit('/iframe.html?id=task--default&knob-task'));

  it('should render the component', () => {
    cy.get('task-item').should('exist');
  });
  it('should click checkbox', () => {
    cy.get('task-item').get('#myCB').click();
  })

  context('archived', () => {
    beforeEach(() => cy.visit('/iframe.html?id=task--archived&knob-task'));
    it('should render the component', () => {
      cy.get('task-item').should('exist');
    })
    it('should check textbox content', () => {
      const ip = cy.get('task-item').get('.title').find('input');
      expect(ip).not.to.be.empty;
    })
  })

  context('knobbed', () => {
    beforeEach(() => cy.visit('/iframe.html?id=task--knobbed&knob-id=0&knob-title=Hello'));
    it('should render the component', () => {
      cy.get('task-item').should('exist');
      
    })
    it('should check textbox content', () => {   
      var ip = cy.get('task-item').get('#myTitle');
      expect(ip).not.to.be.empty;
      ip.should('have.value', 'Hello');
    })
    it('should insert into textbox', () => {
      var ip = cy.get('#myTitle'); //works fine as well
      ip.type('Goodbye');
      expect(ip).not.to.be.empty;
      ip.should('have.value', 'HelloGoodbye');
    })
    it('should uncheck checkbox', () => {
      var cb = cy.get('task-item').get('#myCB');
      cb.should('be.checked');
      cb.click();
      expect(cb).not.to.be.checked;
    })

  })

});
