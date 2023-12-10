describe('template spec', () => {
  it('passes', () => {
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
    cy.contains('Profile').click();
    cy.contains('Add post').click();

    cy.wait(2000);

    cy.get('input').then((przyciski) => {
      expect(przyciski).to.have.length.above(0);

      przyciski.each((index, przycisk) => {
        if (index === 3) cy.wrap(przycisk).type('test');
        if (index === 4) cy.wrap(przycisk).type('test');
      });
    });
    cy.get('.ql-editor').type('test');
    cy.get('.p-button-raised').then((przyciski) => {
      expect(przyciski).to.have.length.above(0);

      przyciski.each((index, przycisk) => {
        if (index === 0) cy.wrap(przycisk).click();
      });
    });
    cy.contains('Post created');
  });
});
