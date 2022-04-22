describe('Workflow creation', () => {
    beforeEach(() => {
        cy.fixture('incontrol.json')
            .then((configuration) => {
            this.configuration = configuration
        
            cy.login()
        cy.viewport(1600, 1600) 

        cy.navigateToAdminPage('Event Types')

        cy.createEventType(this.configuration.eventTypeName, this.configuration.eventCategoryName)
        cy.getEventTypeTabList()
        cy.enableAllTabsForEventType()

        cy.navigateToAdminPage('Workflow Administration')
        })
    })

    it ("Can CRUD a workflow", () => {
        let workflowName = 'Automation Workflow 01' + Cypress.moment()
        cy.createWorkflow(workflowName)
        cy.addWorkflowApplicableTo(this.configuration.eventTypeName)

        cy.wait(500)
        cy.get('.alert.alert-danger').should('not.be.visible')
        
        cy.createWorkflowSteps()
        cy.linkWorkflowSteps()
        cy.wait(1000)

        // delete applicable to
        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowApplicableTo_ctl02_btnDelete').click()
        cy.wait(1000)
        cy.get(`#ctl00_ctl00_ctl00_body_body_body_chkIncludeInactiveSteps`).check()
        
        cy.wait(500)

        cy.unlinkWorkflowSteps()
        cy.deactivateWorkflowSteps()
        cy.deleteWorkflowSteps()

        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnDelete').click()

        cy.navigateToAdminPage('Event Types')
        cy.deleteEventType(this.configuration.eventTypeName)
    })
})
