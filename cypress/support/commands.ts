// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "cypress-ntlm-auth/dist/commands";
import 'cypress-iframe';
import 'cypress-wait-until';
import 'cypress-file-upload';

Cypress.Commands.add('selectFromWorkgroup', (selector: string, value: string): void => {
    cy.get(selector).within(() => {
        cy.get('input[class*="searchInput"]').type(value);
        cy.get('input[value="GO"]').click();
        cy.get('select[class*="lbxWorkgroups"]').select(value);
        cy.get('input[value="OK"][class*="selectorButton"]').click();
    });
});

Cypress.Commands.add('selectFromPeople', (selector: string, value: string): void => {
    cy.get(selector).within(() => {
        cy.get('input[class*="searchInput"][placeholder*="Search for"]').type(value);
        cy.get('button > i[class*="fa-search"]').click();
        cy.get('select[class="lbxPeople"]').select(value);
        cy.get('input[class*="selectorButton"][value="OK"]').filter(':visible').click();
    });
});

Cypress.Commands.add('selectFromEmployer', (selector: string, value: string): void => {
    cy.get(selector).within(() => {
        cy.get('input[class*="searchInput"]').filter(':visible').type(value);
        cy.waitUntil(() => cy.get(`td[title="${value}"]`).should('be.visible').click());
        cy.get('input[class*="selectorButton"][value="OK"]').filter(':visible').click();
    });
});

Cypress.Commands.add('selectFromRole', (selector: string, value: string): void => {
    cy.get(selector).within(() => {
        cy.get('input[id$="Name_txtSearchText"]').filter(':visible').type(value);
        cy.waitUntil(() => cy.get(`td[title="${value}"]`).should('be.visible').click());
        cy.get('input[class*="selectorButton"][value="OK"]').filter(':visible').click();
    });
});

Cypress.Commands.add('selectFromCompliance', (selector: string, value: string): void => {
    cy.get(selector).within(() => {
        cy.get('input[id$="Code_txtSearchText"]').filter(':visible').type(value);
        cy.wait(2000);
        cy.waitUntil(() => cy.get(`td[title="${value}"]`).should('be.visible').click());
        cy.get('input[class*="selectorButton"][value="OK"]').filter(':visible').click();
    });
});

Cypress.Commands.add('login', (account: string): void => {
    const accountName = (account || 'System Administrator').toLowerCase();
    const accountConfig = Cypress.env('userAccounts');

    //let foundAccount = Object.entries(accountConfig)
        //.find(([name, acc]) => acc.type.toLowerCase() === accountName || name === accountName);

    cy.ntlmReset();
    cy.ntlm("https://v515-daily-azure.inxdev.com", "tr10", "Training10", "inxdev", undefined, 2);
    //cy.ntlm(Cypress.config('baseUrl'), foundAccount[0], foundAccount[1].password, Cypress.env('userDomain'));
});

Cypress.Commands.add('navigateToAdminPage', (page: string): void => {
    cy.visit('/InControl');
    cy.get('#Administration-menu').click();
    cy.get('#ctl00_ctl00_body_body_ctlAdminHome_txtSearch').type(page);
    cy.contains(page).click();
    cy.server();
});

Cypress.Commands.add('createEventType', (name: string, category: string): void => {
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtName').type(name)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypeCategories').select(category)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDescription').type(name)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_chkIsImmediateNotificationToAssignedActioneeEnabled').parent().click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
});

Cypress.Commands.add('setEventTypeInactive', (name: string): void => {
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypes').select(name)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_chkActive').parent().click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
});

Cypress.Commands.add('getEventTypeTabList', (): void => {
    cy.route('POST', "**/incontrol/eventtype/geteventtypetablisting*").as('getTabList')
    cy.contains('Tabs').click()
    cy.wait('@getTabList', { timeout: 20000 })
});

Cypress.Commands.add('enableAllTabsForEventType', (): void => {

    let UpdateTabSetting = (tabName: string) => {
        cy.get('tr').contains('td', tabName).parent().within(() => {
            cy.waitUntil(() => cy.get('.grid-command-cell > .k-button').should('be.visible').click())
            cy.get('#IsDisplayed').check()
            cy.get('.k-primary').click()
            cy.wait(2000)
        })
    }

    cy.get('#EventTypeTabGrid').within(() => {
        UpdateTabSetting('Actions')
        UpdateTabSetting('Checklist')
        UpdateTabSetting('Communications')
        UpdateTabSetting('Costs')
        UpdateTabSetting('Documents')
        UpdateTabSetting('Environmental')
        UpdateTabSetting('Equipment')
        UpdateTabSetting('Findings')
        UpdateTabSetting('Fire/Explosion')
        UpdateTabSetting('Forms')
        UpdateTabSetting('Injury')
        UpdateTabSetting('Insurance')
        UpdateTabSetting('Investigations')
        UpdateTabSetting('Items')
        UpdateTabSetting('Keywords')
        UpdateTabSetting('Marine')
        UpdateTabSetting('MotorVehicle')
        UpdateTabSetting('Notifications')
        UpdateTabSetting('Obligation Conditions')
        UpdateTabSetting('Participants')
        UpdateTabSetting('Related Events')
        UpdateTabSetting('Risk Register')
        UpdateTabSetting('Risk Review')
        UpdateTabSetting('Root Causes')
        UpdateTabSetting('Weather')
    })
});
Cypress.Commands.add('disableAllTabsForEventType', (): void => {

    let UpdateTabSetting = (tabName: string) => {
        cy.get('tr').contains('td', tabName).parent().within(() => {
            cy.waitUntil(() => cy.get('.grid-command-cell > .k-button').should('be.visible').click())
            cy.get('#IsDisplayed').uncheck()
            cy.get('.k-primary').click()
            cy.wait(2000)
        })
    }

    cy.get('#EventTypeTabGrid').within(() => {
        UpdateTabSetting('Actions')
        UpdateTabSetting('Checklist')
        UpdateTabSetting('Communications')
        UpdateTabSetting('Costs')
        UpdateTabSetting('Documents')
        UpdateTabSetting('Environmental')
        UpdateTabSetting('Equipment')
        UpdateTabSetting('Findings')
        UpdateTabSetting('Fire/Explosion')
        UpdateTabSetting('Forms')
        UpdateTabSetting('Injury')
        UpdateTabSetting('Insurance')
        UpdateTabSetting('Investigations')
        UpdateTabSetting('Items')
        UpdateTabSetting('Keywords')
        UpdateTabSetting('Marine')
        UpdateTabSetting('MotorVehicle')
        UpdateTabSetting('Notifications')
        UpdateTabSetting('Obligation Conditions')
        UpdateTabSetting('Participants')
        UpdateTabSetting('Related Events')
        UpdateTabSetting('Risk Register')
        UpdateTabSetting('Risk Review')
        UpdateTabSetting('Root Causes')
        UpdateTabSetting('Weather')
    })
});
Cypress.Commands.add('enableAlTabsForEventType', (): void => {

    let UpdateTabSetting = (tabName: string) => {
        cy.get('tr').contains('td', tabName).parent().within(() => {
            cy.waitUntil(() => cy.get('.grid-command-cell > .k-button').should('be.visible').click())
            cy.get('#IsDisplayed').check()
            cy.get('.k-primary').click()
            cy.wait(2000)
        })
    }

    cy.get('#EventTypeTabGrid').within(() => {
        UpdateTabSetting('Actions')
        UpdateTabSetting('Checklist')
        UpdateTabSetting('Communications')
        
    })
});
Cypress.Commands.add('enableATabsForEventType', (): void => {

    let UpdateTabSetting = (tabName: string) => {
        cy.get('tr').contains('td', tabName).parent().within(() => {
            cy.waitUntil(() => cy.get('.grid-command-cell > .k-button').should('be.visible').click())
            cy.get('#IsDisplayed').check()
            cy.get('.k-primary').click()
            cy.wait(2000)
        })
    }

    cy.get('#EventTypeTabGrid').within(() => {
        UpdateTabSetting('Costs')
        UpdateTabSetting('Documents')
        UpdateTabSetting('Environmental')
        
    })
});

const BaseBodySelector = '#ctl00_ctl00_ctl00_body_body_body'

Cypress.Commands.add('createWorkflow', (workflowName: string): void => {
    cy.get(`${BaseBodySelector}_btnAddWorkflow`).click()
    cy.waitUntil(() => cy.get(`${BaseBodySelector}_txtWorkflowName`).should('be.visible').clear())
    cy.get(`${BaseBodySelector}_txtWorkflowName`).type(workflowName)
    cy.wait(500)
    cy.get(`${BaseBodySelector}_txtWorkflowDescription`).clear()
    cy.get(`${BaseBodySelector}_txtWorkflowDescription`).type(workflowName)
    cy.get(`${BaseBodySelector}_chkERMNotified`).check()
    cy.get(`${BaseBodySelector}_chkIsActive`).check()
    cy.get(`${BaseBodySelector}_btnSave`).click()
});

Cypress.Commands.add('addWorkflowApplicableTo', (eventTypeName: string): void => {
    cy.wait(500)
    cy.waitUntil(() => cy.get('.k-icon.k-plus.inx-add-record').should('be.visible').click())
    cy.get(`${BaseBodySelector}_dgWorkflowApplicableTo_ctl02_ddlEventType`).select(eventTypeName)
    cy.get(`${BaseBodySelector}_dgWorkflowApplicableTo_ctl02_btnAdd`).click()
});

Cypress.Commands.add('createWorkflowSteps', (): void => {

    let CreateWorkflowStep = (rowSelector: string, value: string) => {
        cy.wait(500)
        cy.waitUntil(() => cy.get(`${BaseBodySelector}_btnAddStep`).should('be.visible').click())

        cy.waitUntil(() => cy.get(`${rowSelector}_btnEdit`).should('be.visible').click())

        cy.get(`${rowSelector}_txtName`).clear()
        cy.get(`${rowSelector}_txtName`).type(value)
        cy.get('.k-icon.k-update:visible').click()
    }

    CreateWorkflowStep(`${BaseBodySelector}_dgWorkflowSteps_ctl02`, 'SUBMITTED')
    CreateWorkflowStep(`${BaseBodySelector}_dgWorkflowSteps_ctl03`, 'ASSIGNED')
    CreateWorkflowStep(`${BaseBodySelector}_dgWorkflowSteps_ctl04`, 'FINALREVIEW')
    CreateWorkflowStep(`${BaseBodySelector}_dgWorkflowSteps_ctl05`, 'CLOSED')
    CreateWorkflowStep(`${BaseBodySelector}_dgWorkflowSteps_ctl06`, 'CANCELLED')
});

Cypress.Commands.add('linkWorkflowSteps', (): void => {

    cy.wait(500)
    // link 1st step
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_btnEdit`).click()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_ddlDestination1`).select('ASSIGNED')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_chkValidateTransition1`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_chkValidateTransition2`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_chkRequireActionsApproved`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_chkRequireActionsReleased`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_chkRequireActionsComplete`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_chkRequireComment`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_chkRequireEventApproval`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_chkRequireMandatoryTabsCompleted`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_chkRequireEventDueDateSet`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_ddlResponsibleRole`).select('Moderator')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_txtDest1Label`).type('Assign to ERM')
    cy.get('.k-icon.k-update:visible').click()

    cy.wait(500)
    // link 2nd step
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_btnEdit`).click()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_ddlDestination1`).select('SUBMITTED')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_ddlDestination2`).select('FINALREVIEW')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_chkPermitReassign`).check()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_chkPermitAdditionalAssignee`).check()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_chkRequireActionsComplete`).check()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_ddlResponsibleRole`).select('Event Report Manager')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_ddlWorkflowStatusCode`).select('InProgress')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_txtDest1Label`).type('Return Event To Moderator')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_txtDest2Label`).type('Return For Final Review')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_chkValidateTransition1`).uncheck()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_chkValidateTransition2`).check()
    cy.get('.k-icon.k-update:visible').click()

    cy.wait(500)
    // link 3rd step
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_btnEdit`).click()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_ddlDestination1`).select('CLOSED')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_ddlDestination2`).select('ASSIGNED')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_chkRequireActionsComplete`).check()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_ddlResponsibleRole`).select('Moderator')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_ddlWorkflowStatusCode`).select('Pending')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_txtDest1Label`).type('Close Event')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_txtDest2Label`).type('Re-Assign To ERM')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_chkValidateTransition1`).check()
    cy.get('.k-icon.k-update:visible').click()

    cy.wait(500)
    // link 4th step
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl05_btnEdit`).click()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl05_ddlDestination1`).select('SUBMITTED')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl05_ddlResponsibleRole`).select('Moderator')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl05_ddlWorkflowStatusCode`).select('Closed')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl05_txtDest1Label`).type('Re-Open Event')
    cy.get('.k-icon.k-update:visible').click()

    cy.wait(500)
    // link 5th step
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl06_btnEdit`).click()
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl06_ddlDestination1`).select('SUBMITTED')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl06_ddlResponsibleRole`).select('Moderator')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl06_ddlWorkflowStatusCode`).select('Cancelled')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl06_txtDest1Label`).type('Re-Open Event')
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl06_chkRequireComment`).check()
    cy.get('.k-icon.k-update:visible').click()
});

Cypress.Commands.add('deleteEventType', (name: string): void => {
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypes').select(name)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnDelete').click()
});

Cypress.Commands.add('unlinkWorkflowSteps', (): void => {
    let unlinkWorkflowStep = (rowIndex: string) => {
        cy.wait(1000)
        cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl${rowIndex}_btnEdit`).click()
        cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl${rowIndex}_ddlDestination1`).select('')
        cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl${rowIndex}_txtDest1Label`).clear()
        cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl${rowIndex}_ddlDestination2`).select('')
        cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl${rowIndex}_txtDest2Label`).clear()
        cy.get('.k-icon.k-update:visible').click()
    }

    // unlink each step
    unlinkWorkflowStep('06')
    unlinkWorkflowStep('05')
    unlinkWorkflowStep('04')
    unlinkWorkflowStep('03')
    unlinkWorkflowStep('02')
});

Cypress.Commands.add('deactivateWorkflowSteps', (): void => {
    let deactivateWorkflowStep = (rowIndex: string) => {
        cy.wait(1000)
        cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl${rowIndex}_btnEdit`).click()
        cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl${rowIndex}_chkIsActive`).uncheck()
        cy.get('.k-icon.k-update:visible').click()
        cy.wait(1000)
    }

    deactivateWorkflowStep('06')
    deactivateWorkflowStep('05')
    deactivateWorkflowStep('04')
    deactivateWorkflowStep('03')
    deactivateWorkflowStep('02')
});

Cypress.Commands.add('deleteWorkflowSteps', (): void => {
    cy.wait(1000)
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl06_btnDelete`).click()
    cy.wait(1000)
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl05_btnDelete`).click()
    cy.wait(1000)
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl04_btnDelete`).click()
    cy.wait(1000)
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl03_btnDelete`).click()
    cy.wait(1000)
    cy.get(`${BaseBodySelector}_dgWorkflowSteps_ctl02_btnDelete`).click()
});

export { };

// see more example of adding custom commands to Cypress TS interface
// in https://github.com/cypress-io/add-cypress-custom-command-in-typescript
// add new command to the existing Cypress interface
declare global {
    namespace Cypress {
        interface Chainable {
            selectFromWorkgroup(selector: string, value: string): Chainable<any>,
            selectFromPeople(selector: string, value: string): Chainable<any>,
            selectFromEmployer(selector: string, value: string): Chainable<any>,
            selectFromRole(selector: string, value: string): Chainable<any>,
            selectFromCompliance(selector: string, value: string): Chainable<any>,
            login(account?: string): Chainable<any>
            navigateToAdminPage(page: string): Chainable<any>
            createEventType(name: string, category: string): Chainable<any>
            setEventTypeInactive(name: string): Chainable<any>
            getEventTypeTabList(): Chainable<any>
            enableAllTabsForEventType(): Chainable<any>
            disableAllTabsForEventType(): Chainable<any>
            enableAlTabsForEventType(): Chainable<any>
            enableATabsForEventType(): Chainable<any>
            createWorkflow(workflowName: string): Chainable<any>
            addWorkflowApplicableTo(eventTypeName: string): Chainable<any>
            createWorkflowSteps(): Chainable<any>
            linkWorkflowSteps(): Chainable<any>
            deleteEventType(name: string): Chainable<any>
            unlinkWorkflowSteps(): Chainable<any>
            deactivateWorkflowSteps(): Chainable<any>
            deleteWorkflowSteps(): Chainable<any>
        }     
        
    }
    namespace globalThis {
        var configuration: any
    }
}
