describe('Quiz User Journey', () => {
  it('A user can visit the page to start the quiz', () => {
    cy.visit('http://localhost:3001/')
  });

  it('A user can start the quiz, click any of the 4 answers, see following questions, and get a final score', () => {
    // intercepting get request with fixture data
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuizData');
    // visit quiz page
    cy.visit('http://localhost:3001/')
    // start quiz
    cy.get('button').should('exist').should('have.text', 'Start Quiz').click();
    // Wait for the intercepted API call to complete
    cy.wait('@getQuizData');
    // click answers through the questions
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(0).click();
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(2).click();
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(1).click();
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(3).click();
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(1).click();
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(2).click();
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(0).click();
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(3).click();
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(3).click();
    cy.get('.mt-3')
      .find('.btn.btn-primary').eq(0).click();

    // should see quiz completed, score, and button to take new quiz
    cy.get('.card.p-4.text-center').should('exist')
      .find('h2').should('exist').and('include.text', 'Quiz Completed');

    cy.get('.card.p-4.text-center')
      .find('.alert.alert-success').should('exist').and('include.text', 'Your score:');
    
    // clicking take new quiz button
    cy.get('.card.p-4.text-center')
      .find('button').should('exist').and('have.text', 'Take New Quiz').click();

    // should see first questions and 4 answers
    cy.get('.card.p-4').should('exist')
      .find('h2').should('include.text', '?').should('exist');
    cy.get('.card.p-4').should('exist')
      .find('.mt-3').should('exist')
      .find('.d-flex.align-items-center.mb-2').should('exist').should('have.length', 4);
  });
})