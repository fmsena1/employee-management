// describe('Login Page', () => {
//   beforeEach(() => {
//     cy.visit('/login');
//   });

//   it('should display the login form', () => {
//     cy.get('.login-page').should('be.visible');
//     cy.get('input[type="email"]').should('be.visible');
//     cy.get('input[type="password"]').should('be.visible');
//     cy.get('button[type="submit"]').should('be.visible');
//   });

//   it('should show an error message for invalid login', () => {
//     cy.get('input[type="email"]').type('invalid@example.com');
//     cy.get('input[type="password"]').type('admin123');
//     cy.get('button[type="submit"]').click();
//     cy.get('.error-message').should('contain', 'Email ou senha inválida');
//   });

//   it('should navigate to the register page', () => {
//     cy.contains('a', 'Registrar').click();
//     cy.url().should('include', '/register');
//   });

//   it('should login successfully with valid credentials', () => {
//     cy.get('input[type="email"]').type('admin@example.com');
//     cy.get('input[type="password"]').type('admin123');
//     cy.get('button[type="submit"]').click();
//     cy.url().should('not.include', '/login');
//     cy.get('.q-notification').should('contain', 'Login realizado com sucesso!');
//   });
// });
