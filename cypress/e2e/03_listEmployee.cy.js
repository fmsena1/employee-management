describe('List Employee Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');
    cy.get('.q-notification').should('contain', 'Login realizado com sucesso!');
  });

  it('should display the employee list', () => {
    cy.intercept('GET', '**/employees').as('getEmployees');
    cy.visit('/');
    cy.wait('@getEmployees');
    cy.get('.q-page').should('be.visible');
    cy.get('table').should('be.visible');
  });

  it('should open the add employee dialog and add 5 employees', () => {
    for (let i = 0; i < 5; i++) {
      cy.get('button').contains('Adicionar Funcionário').click();
      cy.get('.q-dialog').should('be.visible');
      cy.get('.q-dialog .text-h4').should('contain', 'Adicionar Funcionário');

      const randomCPF = `${Cypress._.random(100, 999)}.${Cypress._.random(100, 999)}.${Cypress._.random(100, 999)}-${Cypress._.random(10, 99)}`;
      const randomEmail = `newuser${Cypress._.random(0, 1e6)}@example.com`;
      cy.get('input[aria-label="CPF*"]').type(randomCPF);
      cy.get('input[aria-label="Nome*"]').type(`John Doe ${i + 1}`);
      cy.get('input[aria-label="Email*"]').type(randomEmail);

      cy.get('.q-dialog').within(() => {
        cy.get('input[aria-label="Tamanho da Camisa*"]').click();
      });
      cy.get('.q-item').contains('M').click();
      cy.get('input[aria-label="Tamanho do Sapato*"]').type('42');

      cy.get('.q-dialog').should('be.visible');

      cy.get('.q-dialog').find('button').contains('Adicionar').click();

      cy.get('.q-notification').should('contain', 'Funcionário cadastrado com sucesso!');
    }
  });

  it('should search for employees', () => {
    cy.intercept('GET', '**/employees').as('getEmployees');
    cy.visit('/');
    cy.wait('@getEmployees');

    cy.get('table').should('be.visible');

    cy.get('[data-test-id="input-search"]').type('John Doe 1');
    cy.get('table tbody tr').first().should('contain', 'John Doe 1');

    cy.get('[data-test-id="input-search"]').clear();
    cy.get('table tbody tr').should('have.length.greaterThan', 1);
  });

  it('should open the edit employee dialog', () => {
    cy.get('table tbody tr').first().find('button').contains('edit').click();
    cy.get('.q-dialog').should('be.visible');
    cy.get('.q-dialog .text-h4').should('contain', 'Editar Funcionário');
    cy.get('input[aria-label="Nome*"]').clear();
    cy.get('input[aria-label="Nome*"]').type(`John Doe Edited`);
    cy.get('.q-dialog').find('button').contains('Editar').click();
    cy.get('.q-notification').should('contain', 'Funcionário editado com sucesso!');
  });

  it('should delete to all employees', () => {
    cy.intercept('GET', '**/employees').as('getEmployees');
    cy.visit('/');
    cy.wait('@getEmployees');
    cy.get('thead input[type="checkbox"]').check({ force: true });
    cy.get('button').contains('Deletar').click();
    cy.get('.q-notification').should('contain', 'Funcionário(s) excluído(s) com sucesso!');
  });
});
