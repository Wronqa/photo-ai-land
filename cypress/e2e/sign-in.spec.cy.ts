describe('Sign in validation', () => {
  it('Ivalid data', () => {
    cy.visit('http://localhost:4200/auth');

    cy.wait(1000);

    cy.get('[placeholder="Email adress"]').type('test');
    cy.get('[placeholder="Password"]').eq(1).type('test');

    cy.get('button').then((przyciski) => {
      expect(przyciski).to.have.length.above(0);

      przyciski.each((index, przycisk) => {
        if (index === 1) cy.wrap(przycisk).click();
      });
    });

    cy.contains('Invalid email adress');
  });
  it('Valid data', () => {
    cy.visit('http://localhost:4200/auth');

    cy.wait(1000);

    cy.get('[placeholder="Email adress"]').type('liveindubai@gmail.com');
    cy.get('[placeholder="Password"]').eq(1).type('zaq1@WSX1');

    cy.get('button').then((przyciski) => {
      expect(przyciski).to.have.length.above(0);

      przyciski.each((index, przycisk) => {
        if (index === 1) cy.wrap(przycisk).click();
      });
    });
    cy.contains('Most popular blogs');
  });
});
