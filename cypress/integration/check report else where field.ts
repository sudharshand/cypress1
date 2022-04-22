describe('create event with reportelsewhere field',() => {
    beforeEach(function() {
                cy.login();
                cy.viewport(1600, 800);
            });
it('create an event-audit',() => {
    cy.visit('/InControl/EventDetails');
    cy.wait(2000);
    cy.get('#EventTypeId').select('Quality - Audit');
    //cy.get('#EventSubTypeId').select('Environment');
    cy.get('#ShortObservation').type('This is a short observation');
    cy.get('#DetailedObservation').type('This is a detailed observation');
    cy.get('#Location').type('My Location');
    cy.get('#_ClassValueId').type('1.00 General Management');
    cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true });
    cy.get('#_ReportedElsewhereClassValueId').type('6.00 Exploration Management');
        cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true });
    //cy.get('#MatrixCell_25').click();
    cy.get('[name="CustomFieldValues[0].Value_input"]').type('Site Administration Office');
    cy.get('#Suggestion').type('Suggestive action');
    cy.get('[data-target="#ReportedToId_PersonSelectorContainer .person-search-dialog"]', { timeout: 20000 }).click({ force: true });
    cy.get('#ReportedToId_PersonSelectorContainer').within(() => {
        cy.get('input[placeholder="Enter the person search text"]').type('tr10');
        cy.get('button[title="Search"]').click();
        cy.get('[data-person-name*="TR10"]', { timeout: 20000 }).click({ force: true });
        cy.get('.ok-button').click();
        cy.wait(2000)
    })
    cy.get('#submitButton').click();
})
 it('disable reportelsewhere tab',() =>{
    cy.navigateToAdminPage('Event Types')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypes').select('Audit')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
    cy.wait(500)
    cy.get(':nth-child(17) > .inx-checkbox > .dirtiable > .toggle > .toggle-group > .btn-primary').click()
    cy.wait(500)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
})
it('check reportelsewhere in eventdetails',() =>{
    cy.visit('Incontrol/Events.aspx')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
    cy.get(':nth-child(1) > :nth-child(2) > .grid-link').click()
    cy.get('#_ReportedElsewhereClassValueId').should('not.be.visible')
    cy.navigateToAdminPage('Event Types')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypes').select('Audit')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
    cy.wait(500)
    cy.get(':nth-child(17) > .inx-checkbox > .dirtiable > .toggle > .toggle-group > .active').click()
    cy.wait(500)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
})
it('check reportelsewhere in eventdetails',() =>{
    cy.visit('Incontrol/Events.aspx')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
    cy.get(':nth-child(1) > :nth-child(2) > .grid-link').click()
    cy.get('#_ReportedElsewhereClassValueId').should('be.visible')
})
})