describe('Workflow steps validation', () => {
    beforeEach(() => {
        cy.fixture('incontrol.json')
            .then((configuration) => {
            this.configuration = configuration

            cy.login()
            cy.viewport(1600, 800) 
    
            cy.navigateToAdminPage('Event Types')
    
            cy.createEventType(this.configuration.eventTypeName, 'SHE')
    
            cy.navigateToAdminPage('Workflow Administration')

        })
    })

    it ("Can create a workflow with no steps, but doesn't attach to event", () => {
        let workflowName = 'Automation Workflow 01' + Cypress.moment()
        cy.createWorkflow(workflowName)
        cy.addWorkflowApplicableTo(this.configuration.eventTypeName)

        cy.wait(1000)
        cy.get('.alert.alert-danger').should('not.be.visible')
                
        cy.visit('/InControl/EventDetails')
        cy.get('#EventTypeId').select(`${this.configuration.eventCategoryName} - ${this.configuration.eventTypeName}`)
    
        cy.get('#ShortObservation').type("I noticed a strong gravitational pull towards the big can")
        cy.get('#DetailedObservation').type("The can is so large it's starting to exhibit behaviour similar to the sun in terms of gravity and radiation not its ability to sustain life")

        cy.get("#_ClassValueId").clear().type('1.01 Administration')
        cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true })
    
        cy.get('#eventCustomFields > .form-group > .k-widget > .k-dropdown-wrap > .k-input', { timeout: 20000 }).type('Site Administration Office')
    
        cy.get('#submitButton').click()

        cy.get('#workflowErrors').should('have.text', 'No workflow is attached to the event\n')

        cy.get('#deleteButton').click()

        // clean up
        cy.navigateToAdminPage('Workflow Administration')

        cy.get('#ctl00_ctl00_ctl00_body_body_body_rdbCopyOrEdit_1').check()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_lstWorkflowTemplateEdit').select(workflowName)

        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSelectWorkflowTemplate').click()
        
        // delete applicable to
        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowApplicableTo_ctl02_btnDelete').click()
        
        cy.get(`#ctl00_ctl00_ctl00_body_body_body_chkIncludeInactiveSteps`).wait(500).check()
       
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnDelete').click()

        cy.navigateToAdminPage('Event Types')
        cy.deleteEventType(this.configuration.eventTypeName)
    })
})

describe ('Workflow validation', () => {
    beforeEach(() => {
        cy.fixture('incontrol.json')
            .then((configuration) => {
            this.configuration = configuration

            cy.login()
            cy.viewport(1600, 800) 

        })
    })

    it ("Can function with special characters", () => {
        let specialCharacters = '~`!@#$%^&*()_+-={}|\\][:";<>?/.,\''

        cy.navigateToAdminPage('Event Types')
    
        cy.createEventType(specialCharacters, 'SHE')

        cy.navigateToAdminPage('Workflow Administration')

        let workflowName = 'Automation Workflow 01' + Cypress.moment()
        cy.createWorkflow(workflowName)
        cy.addWorkflowApplicableTo(specialCharacters)
        cy.createWorkflowSteps()
        cy.linkWorkflowSteps()

        cy.visit('/InControl/EventDetails')
        cy.get('#EventTypeId').select(`${this.configuration.eventCategoryName} - ${specialCharacters}`)
    
        cy.get('#ShortObservation').type("I noticed a strong gravitational pull towards the big can")
        cy.get('#DetailedObservation').type("The can is so large it's starting to exhibit behaviour similar to the sun in terms of gravity and radiation not its ability to sustain life")
        cy.get("#_ClassValueId").clear().type('1.01 Administration')
        cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true })
    
        cy.get('#eventCustomFields > .form-group > .k-widget > .k-dropdown-wrap > .k-input', { timeout: 20000 }).type('Site Administration Office')
    
        cy.get('#submitButton').click()

        cy.get('#deleteButton').click()

        // we could transition before deleting as per practitest, but I don't see the value

        cy.navigateToAdminPage('Workflow Administration')

        cy.get('#ctl00_ctl00_ctl00_body_body_body_rdbCopyOrEdit_1').check()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_lstWorkflowTemplateEdit').select(workflowName)

        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSelectWorkflowTemplate').click()

        // delete applicable to
        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowApplicableTo_ctl02_btnDelete').click()
        
        cy.get(`#ctl00_ctl00_ctl00_body_body_body_chkIncludeInactiveSteps`).wait(500).check()
        
        cy.wait(500)

        cy.unlinkWorkflowSteps()
        cy.deactivateWorkflowSteps()
        cy.deleteWorkflowSteps()

        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnDelete').click()

        cy.navigateToAdminPage('Event Types')
        cy.deleteEventType(specialCharacters)
    })
})

describe ('Workflow validation view mode', () => {
    beforeEach(() => {
        cy.login()
        cy.viewport(1600, 800) 
    })

    it ("has the things editable", () => {
        cy.navigateToAdminPage('Workflow Administration')

        // view mode checks
        cy.get('#ctl00_ctl00_ctl00_body_body_body_rdbCopyOrEdit_0').check()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_lstWorkflowTemplateCopy').select('InControl Default')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSelectWorkflowTemplate').click()

        cy.get('.halflings.halflings-copy').should('be.visible') 
        cy.get('.halflings.halflings-floppy-disk').should('not.be.visible') 
        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowApplicableTo_ctl02_btnEdit').should('be.visible') 
        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowApplicableTo_ctl02_btnDelete').should('be.visible') 

        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowSteps_ctl02_btnEdit').should('not.be.visible') 

        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowSteps_ctl02_imgSecurityLink').should('be.visible')      
        
        // edit mode checks
        cy.get('#ctl00_ctl00_ctl00_body_body_body_rdbCopyOrEdit_1').check()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_lstWorkflowTemplateEdit').select('InControl Default')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSelectWorkflowTemplate').click()

        cy.get('.halflings.halflings-copy').should('not.be.visible') 
        cy.get('.halflings.halflings-floppy-disk').should('be.visible') 
        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowApplicableTo_ctl02_btnEdit').should('be.visible') 
        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowApplicableTo_ctl02_btnDelete').should('be.visible') 

        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowSteps_ctl02_btnEdit').should('be.visible') 

        cy.get('#ctl00_ctl00_ctl00_body_body_body_dgWorkflowSteps_ctl02_imgSecurityLink').should('be.visible')    
        
    })
})
