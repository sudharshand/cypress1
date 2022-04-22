import { should } from "chai"
import { contains } from "cypress/types/jquery"

describe('EventSubtypes', () => {
    beforeEach(() => {
        cy.fixture('incontrol.json')
            .then((configuration) => {
            this.configuration = configuration
            cy.login()
        cy.viewport(1600, 1600)
        })
    })
it('defaulttabs',() => {
    cy.navigateToAdminPage('Event Types')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypes').select('Incident').should('have.value','1')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
    cy.get('#Tabs').click()
    cy.wait(2000)
    cy.disableAllTabsForEventType()
})
    it('subtypwttabs',() => {
        cy.navigateToAdminPage('Event Types')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypes').select('Incident').should('have.value','1')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
        cy.get('#Tabs').click()
        cy.wait(500)
        cy.get('#EventSubTypeId').select('Environment').should('have.value','28')
        cy.wait(1000)
        cy.enableAlTabsForEventType()
        cy.wait(500)
        cy.get('#EventSubTypeId').select('Near Hit').should('have.value','32')
        cy.wait(1000)
        cy.enableATabsForEventType()
    })
    it('create an event-Environment',() => {
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
     cy.get(':nth-child(3) > .k-widget > .k-dropdown-wrap > .k-input').type('AIG');
     cy.wait(500)
     cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 40000 }).wait(3000).last().click({ force: true })
     cy.get('#submitButton').click();
})
it('create an event-nearhit',() => {
    cy.visit('/InControl/EventDetails');
    cy.wait(2000);
    cy.get('#EventTypeId').select('SHE - Incident');
    cy.get('#EventSubTypeId').select('Near Hit');
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
     cy.wait(7000)
    cy.get('#inx-tabs > .nav').contains('ul','Documents')
})
it('create an event-withoutsubtype',() => {
    cy.visit('/InControl/EventDetails');
    cy.wait(2000);
    cy.get('#EventTypeId').select('SHE - Incident');
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
     cy.wait(7000)
    cy.get('#EventActions > span').should('not.exist')
})
})









