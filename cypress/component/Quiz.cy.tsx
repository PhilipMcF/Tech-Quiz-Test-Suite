import Quiz from "../../client/src/components/Quiz";


describe('Quiz.cy.tsx', () => {
  it('should render the start quiz button', () => {
    cy.mount(<Quiz />)

    // start quiz button
    cy.get('button').should('exist').should('have.text', 'Start Quiz')
  });

  it('should render start quiz button, then render sameple question', () => {
    cy.mount(<Quiz />)

    // start quiz button
    cy.get('button').should('exist').should('have.text', 'Start Quiz').click()

    // question card + h2 with question mark
    cy.get('.card.p-4').should('exist')
      .find('h2').should('include.text', '?').should('exist')

    // question card with 4 buttons
    cy.get('.card.p-4').should('exist')
      .find('.mt-3').should('exist')
      .find('.d-flex.align-items-center.mb-2').should('exist')
      .find('.btn.btn-primary').should('have.length', 4).should('exist')
      .should('not.be.empty')

    // question card with 4 answers
    cy.get('.card.p-4').should('exist')
      .find('.mt-3').should('exist')
      .find('.d-flex.align-items-center.mb-2').should('exist')
      .find('.alert.alert-secondary.mb-0.ms-2.flex-grow-1').should('have.length', 4).should('exist')
      .should('not.be.empty')
  });
})