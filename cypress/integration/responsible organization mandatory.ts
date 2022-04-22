describe('responsible orgnization mandat',() => {
    beforeEach(function() {
                cy.login();
                cy.viewport(1600, 800);
            });
it('make responsible org mandatory',() =>{
    cy.navigateToAdminPage('Event Types')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypes').select('Incident')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
    cy.wait(500)
    cy.get(':nth-child(18) > .inx-checkbox > .dirtiable > .toggle > .toggle-group > .active').click()
    cy.wait(500)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
})
it('create an event-Environment',() => {
    cy.login()
    cy.visit('/InControl/EventDetails');
    cy.wait(2000);
    cy.get('#EventTypeId').select('SHE - Incident');
    cy.get('#EventSubTypeId').select('Environment');
    cy.get('#ShortObservation').type('This is a short observation');
    cy.get('#DetailedObservation').type('This is a detailed observation');
    cy.get('#Location').type('My Location');
    cy.get('#_ClassValueId').type('1.00 General Management');
    cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true });
    cy.get('#MatrixCell_25').click();
    cy.get('[name="CustomFieldValues[0].Value_input"]').type('Site Administration Office');
    cy.get('#Suggestion').type('Suggestive action');
    cy.get('[data-target="#ReportedToId_PersonSelectorContainer .person-search-dialog"]', { timeout: 20000 }).click({ force: true });
    cy.get('#ReportedToId_PersonSelectorContainer').within(() => {
        cy.get('input[placeholder="Enter the person search text"]').type('tr10');
        cy.get('button[title="Search"]').click();
        cy.get('[data-person-name*="TR10"]', { timeout: 20000 }).click({ force: true });
        cy.get('.ok-button').click();
    });
    cy.get('#submitButton').click();
    cy.get('[data-valmsg-summary="true"] > ul > li').should('have.text','Please specify the Responsible Organisation')
    cy.get(':nth-child(3) > .k-widget > .k-dropdown-wrap > .k-input').type('AAMI');
      cy.wait(500)
      cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 40000 }).wait(3000).last().click({force: true })
      cy.get('#submitButton').click();
    })
    it('disable responsible org mandatory',() =>{
        cy.navigateToAdminPage('Event Types')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypes').select('Incident')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
    cy.wait(500)
    cy.get(':nth-child(18) > .inx-checkbox > .dirtiable > .toggle > .toggle-group > .btn-primary').click()
    cy.wait(500)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_statusLabel').should('have.text','Save successful.')
    })
})