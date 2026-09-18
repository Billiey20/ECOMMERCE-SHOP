describe('Storefront Checkout Flow', () => {
  it('should allow a user to view a product, add to cart, and checkout', () => {
    // 1. Visit the storefront homepage
    cy.visit('http://localhost:5173');

    // 2. Click on a product (assuming there's a product card)
    // Note: Use a more specific selector in a real app, e.g., data-cy="product-card"
    cy.get('.product-card').first().click();

    // 3. Verify we are on the Product Detail Page (PDP)
    cy.url().should('include', '/product/');
    cy.get('button').contains('Add to Cart').should('be.visible');

    // 4. Add to cart
    cy.get('button').contains('Add to Cart').click();

    // 5. Open Cart/Checkout
    cy.get('.cart-icon').click(); // Adjust selector as needed
    cy.get('button').contains('Checkout').click();

    // 6. Fill out checkout form
    cy.get('input[name="email"]').type('test@lumora.com');
    cy.get('input[name="firstName"]').type('Jane');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="address"]').type('123 Test Street');
    cy.get('input[name="city"]').type('London');
    cy.get('button').contains('Place Order').click();

    // 7. Verify order success
    cy.contains('Order Confirmation').should('be.visible');
  });
});
