describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display the register form', () => {
    cy.get('.register-page').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should navigate to the login page', () => {
    cy.contains('a', 'Login').click();
    cy.url().should('include', '/login');
  });

  it('should register successfully with valid credentials', () => {
    const randomEmail = `newuser${Cypress._.random(0, 1e6)}@example.com`;
    const randomPassword = `validpassword${Cypress._.random(0, 1e6)}`;

    cy.get('input[type="email"]').type(randomEmail);
    cy.get('input[type="password"]').type(randomPassword);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/register');
    cy.get('.q-notification').should('contain', 'Cadastro realizado com sucesso!');
  });
});
