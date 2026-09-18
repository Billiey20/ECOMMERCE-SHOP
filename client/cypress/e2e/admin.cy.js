describe('Admin Order Fulfillment Flow', () => {
  it('should allow an admin to log in and fulfill an order', () => {
    // 1. Visit admin login
    cy.visit('http://localhost:5173/admin/login');

    // 2. Login
    cy.get('input[name="email"]').type('admin@lumoraskin.com');
    cy.get('input[name="password"]').type('admin');
    cy.get('button[type="submit"]').click();

    // 3. Verify successful login and redirect to dashboard
    cy.url().should('include', '/admin/dashboard');

    // 4. Navigate to Orders
    cy.get('.sidebar-link').contains('Orders').click();
    cy.url().should('include', '/admin/orders');

    // 5. Select the first processing order
    cy.contains('Processing').first().click();

    // 6. Mark as shipped
    cy.get('button').contains('Mark as Shipped').click();

    // 7. Verify status change
    cy.contains('Shipped').should('be.visible');
  });
});
