describe('template spec', () => {
  it('Open page', () => {
    cy.visit('http://localhost:4200/auth');

    cy.wait(1000);

    cy.get('button').then((przyciski) => {
      expect(przyciski).to.have.length.above(0);

      przyciski.each((index, przycisk) => {
        if (index === 3) cy.wrap(przycisk).click();
      });
    });
    cy.wait(2000);

    cy.get('[placeholder="Email address"]').type('test');
    cy.get('[placeholder="Username"]').type('test');
    cy.get('[placeholder="Password"]').eq(0).type('test');
    cy.get('[placeholder="Confirm password"]').type('test2');

    cy.contains('Invalid email adress');
    cy.contains(
      'Password should be between 8-12 letters and should include 1 number and 1 alpha character'
    );
    cy.contains('Passwords are not the same');
  });
});
