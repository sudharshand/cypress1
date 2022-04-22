describe('Event Report Notification', () => {
    beforeEach(() => {
        cy.login()
        cy.viewport(1600, 1600) 
        cy.navigateToAdminPage('Event Report Notification')
        cy.wait(1000)
    })

    it ("Assign Notification section collapsed", () => {

        cy.contains('Event Report Notification Details').should('not.be.visible')

        cy.get('#btnAdd').click()
        cy.contains('Event Report Notification Details').should('be.visible')

    })
})

describe('Event Report Notification Sending', () => {
    beforeEach(() => {
        cy.login();
        cy.viewport(1600, 1600);
        cy.visit('/InControl/EventEmailConfigurationAdmin.aspx');
        cy.get('table tbody').find('tr').then(listing => {
            const length = Cypress.$(listing).length;
            for (let i = 0; i < length - 1; ++i) {
                cy.get('.k-delete').first().click();
            }
        });
    });

    it ('Can send an event report notification', () => {
        // Add custom email configuration.
        cy.visit('/InControl/EventEmailConfigurationAdmin.aspx');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnAddNew').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventType').select('Incident');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventSubType').select('Near Hit');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtSubject').type('InControl Test Notification Event {Event Type} {Event Sub Type} {Event Date}', { parseSpecialCharSequences: false });
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtBody').clear().type(`
            <span style="color: #00000,"><font size="3"><font face="Arial">
                Event ID: {Event ID}
                <br />
                Reference: {Reference}
                <br />
                Event Type: {Event Type}
                <br />
                Event Sub Type: {Event Sub Type}
                <br />
                Event Date: {Event Date}
                <br />
                Workgroup: {Workgroup}
                <br />
                Short Description: {Short Description}
                <br />
                Long Description: {Long Description}
                <br />
                Consequence: {Consequence}
                <br />
                Potential Consequence: {Potential Consequence}
                <br />
                Potential Likelihood: {Likelihood}
                <br />
                Risk: {Risk}
                <br />
                Immediate Action Taken: {Immediate Action}
                <br />
                Location: {Location}
                <br />
                Reported By: {Reported By}
                <br />
                Responsible Organisation: {Organisation}
                <br />
                Report Date: {Reported Date}
                <br />
                Event Link: {Event Link}
            `, { parseSpecialCharSequences: false });
        cy.get('#ctl00_ctl00_ctl00_body_body_body_chkActive').check();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnAdd').click();

        // Enable notifications on submitted step.
        cy.visit('/InControl/SiteDetails.aspx');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_lstEventStatus').select('Submitted');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click();

        // Enable notification emails.
        cy.visit('/InControl/WorkflowAdministration.aspx');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_rdbCopyOrEdit_1').check();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_lstWorkflowTemplateEdit').select('InControl Default');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSelectWorkflowTemplate').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_chkNotificationEmails', { timeout: 5000 }).check();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click();

        // Enable communications tab.
        cy.visit('/InControl/EventTypeMaintenance.aspx');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypes').select('Incident');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_refreshButton').click();
        cy.get('#Tabs').click();
        cy.wait(2000);
        cy.contains('td', 'Communications').parent().within(() => {
            cy.get('a').click();
            cy.get('#IsDisplayed').check();
            cy.get('.k-primary').click();
        });

        // Create the event report notification.
        cy.visit('/InControl/EventReportNotifications');
        cy.wait(2000);
        cy.get('#btnAdd').click();
        cy.wait(2000);
        cy.get('#EventTypeId').select('Incident');
        cy.get('#EventSubTypeId').select('Near Hit');
        cy.get('#Email').type('tr10@inxdev.com');
        cy.get('#ActualAssessmentCodeId').select('Low');
        cy.get("#_ClassValueId").clear().type('MineSite');
        cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true });
        cy.get('#btnSave').click();
        cy.get('#statusLabel').should('contain.text', 'Saved successfully.');

        // Create the event.
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
        cy.get(':nth-child(3) > .k-widget > .k-dropdown-wrap > .k-input').type('AIG');
        cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 40000 }).wait(2000).click({ force: true });
        cy.get('#submitButton').click();

        // Check the communications tab.
        cy.get('#EventCommunications').click();
        cy.get('tbody > tr > [data-field="NotificationType"]').should('contain.text', `InControl Test Notification Event Incident Near Hit ${Cypress.moment().format('DD-MMM-YY')}`);
        cy.get('tbody > tr > [data-field="NotificationDate"]').should('contain.text', `${Cypress.moment().format('DD-MMM-YYYY')}`);
        cy.get('tbody > tr > [data-field="Email"]').should('contain.text', 'tr10@inxdev.com');
        cy.get('tbody > tr > [data-field="Status"]').should('contain.text', 'Email sent successfully');
        cy.get('.k-button').click();
        cy.wait(2000);
        cy.screenshot();
    });
});

describe('Event Report Notification Inactive selections', () => {
    before(() => {
        cy.fixture('incontrol.json')
        .then((configuration) => {
            this.configuration = configuration
    
            cy.login()
            cy.viewport(1600, 1600) 

            // create new category
            cy.navigateToAdminPage('Event Type Categories')
            cy.get('.k-icon.k-plus.inx-add-record').click()

            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails > tfoot > tr.inx-grid-footer > td:nth-child(3) > div > input').type(this.configuration.inactiveEventCategoryName)
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails > tfoot > tr.inx-grid-footer > td:nth-child(4) > div > input').type(this.configuration.inactiveEventCategoryName)
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails > tfoot > tr.inx-grid-footer > td:nth-child(5) > div > input').type('4')
            
            cy.get('[title="Accept"]').click()

            cy.navigateToAdminPage('Event Types')

            cy.createEventType(this.configuration.inactiveEventTypeName, this.configuration.inactiveEventCategoryName)

            // create inactive sub type
            cy.navigateToAdminPage('Event SubTypes')
            cy.get('.k-icon.k-plus.inx-add-record').click()

            cy.get('.inx-grid-footer > td:nth-child(3) select').select(this.configuration.inactiveEventTypeName)
            cy.get('.inx-grid-footer > td:nth-child(4) input').type(this.configuration.inactiveEventSubTypeName)
            cy.get('.inx-grid-footer > td:nth-child(6) input').uncheck()
            
            cy.get('.inx-grid-footer > td:nth-child(1) .t-footer a:first').click()

            cy.navigateToAdminPage('Event Types')

            cy.setEventTypeInactive(this.configuration.inactiveEventTypeName)

            // make the category inactive
            cy.navigateToAdminPage('Event Type Categories')
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_btnEdit').click()
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_ctl04').uncheck()
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_btnUpdate').click()

            cy.navigateToAdminPage('Event Report Notification')
            cy.wait(1000)
    })

})

    it ("has the inactive selections on search", () => {
        cy.get('#event-category-search').should('contain.text', this.configuration.inactiveEventCategoryName)
        cy.get('#event-type-search').should('contain.text', this.configuration.inactiveEventTypeName)
        cy.get('#event-type-search').select(this.configuration.inactiveEventTypeName)
        cy.get('#event-subtype-search').should('contain.text', this.configuration.inactiveEventSubTypeName)      
    })
    it ("does not have the inactive selections on add", () => {
        cy.get('#btnAdd').click()
        cy.get('#EventCategoryId').should('not.contain.text', this.configuration.inactiveEventCategoryName)
        cy.get('#EventTypeId').should('not.contain.text', this.configuration.inactiveEventTypeName)
        cy.get('#EmailFrequencyId')
            .should('contain.text', 'Immediate')
            .should('contain.text', 'Daily')
            .should('contain.text', 'Weekly - Sunday')
            .should('contain.text', 'Weekly - Monday')
            .should('contain.text', 'Weekly - Tuesday')
            .should('contain.text', 'Weekly - Wednesday')
            .should('contain.text', 'Weekly - Thursday')
            .should('contain.text', 'Weekly - Friday')
            .should('contain.text', 'Weekly - Saturday')
            .should('contain.text', 'Weekly - Sunday')

        cy.get('#WorkflowStatusCodeId')
            .should('contain.text', 'Submitted')
            .should('contain.text', 'InProgress')
            .should('contain.text', 'Pending')
            .should('contain.text', 'Closed')
            .should('contain.text', 'Cancelled')
        
        cy.get('#ActualAssessmentCodeId').should('be.visible')
        cy.get('#ActualConsequenceCodeId').should('be.visible')
        cy.get('#PotentialConsequenceCodeId').should('be.visible')
        cy.get('#PotentialLikelihoodCodeId').should('be.visible')
        cy.get('#PotentialAssessmentCodeId').should('be.visible')
        cy.get('#_ClassValueId').should('be.visible')
    })

    it ("does the cancel", () => {
        cy.get('#btnAdd').click()
       
        cy.get('#EventTypeId').select('Audit')
        cy.get('#btnCancel').click()
        cy.contains('Event Report Notification Details').should('not.be.visible')

    })

    it ("does the validations", () => {
        cy.get('#btnAdd').click()
        cy.get('#btnSave').click()   
       
        cy.get('#EventCategoryId-error').should('contain.text', 'Please fill at least 1 of these fields.')
        cy.get('#EventTypeId-error').should('contain.text', 'Please fill at least 1 of these fields.')
        cy.get('#ActualAssessmentCodeId-error').should('contain.text', 'Please fill at least 1 of these fields.')
        cy.get('#PotentialConsequenceCodeId-error').should('contain.text', 'Please fill at least 1 of these fields.')
        cy.get('#PotentialLikelihoodCodeId-error').should('contain.text', 'Please fill at least 1 of these fields.')
        cy.get('#ClassValueId-error').should('contain.text', 'Company Level is required')
        cy.get('#Email-error').should('contain.text', 'Email(s) is required')

        cy.get('#btnCancel').click()
    })
    
    it ("adds a record", () => {
        cy.get('#btnAdd').click()
        cy.get('#EventTypeId').select('Audit')
        cy.get('#ActualAssessmentCodeId').select('Low')
        cy.get('#WorkflowStatusCodeId').select('Submitted')
        cy.wait(2000);
        cy.get("#_ClassValueId").clear().type('MineSite');
        cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 4000 }).click({ force: true })
        cy.get("#Email").clear().type('automated@automation.com')
        
        cy.get('#btnSave').click()   
        cy.get('#statusLabel').should('contain.text', 'Saved successfully.')
    })

    it ("validates too many characters in email field", () => {
        cy.wait(2000)
        cy.get('#btnAdd').click()
        cy.wait(2000)
        cy.get('#EventTypeId').select('Audit')
        cy.get('#ActualAssessmentCodeId').select('Low')
        cy.get('#WorkflowStatusCodeId').select('Submitted')
        cy.get("#_ClassValueId").clear().type('MineSite')
        cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true })
        let str = new Array(1000 + 1).join('name');
        cy.get("#Email").clear().type(str + '@domain.com')
        
        cy.get('#btnSave').click()   
        cy.get('#Email-error').should('contain.text', 'Please enter a valid list of email addresses separated by')
    })

    

    after(() => {
        cy.navigateToAdminPage('Event SubTypes')

        cy.wait(500)

        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_txtSearch').type(this.configuration.inactiveEventSubTypeName)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_btnRefresh').click()

        cy.wait(1000)

        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl03_btnDelete').click()
        
        cy.navigateToAdminPage('Event Types')
        cy.deleteEventType(this.configuration.inactiveEventTypeName)

        cy.navigateToAdminPage('Event Type Categories')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_btnDelete').click()

    })
})
