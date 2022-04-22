describe('Event Type CRUD', () => {
    beforeEach(() => {
        cy.fixture('incontrol.json')
            .then((configuration) => {
                //@ts-ignore
            this.configuration = configuration
        })
        cy.viewport(1600,1600)    
        cy.login()
        cy.navigateToAdminPage('Event Types')
    })

    it ("Can create an EventType",  () => {
        cy.createEventType(this.configuration.eventTypeName , this.configuration.eventCategoryName)
        cy.getEventTypeTabList()
        cy.enableAllTabsForEventType()
    })

    it ("Can delete an EventType",  () => {
        
        cy.deleteEventType(this.configuration.eventTypeName)
    })

    it ("displays validation for duplicates", () => {
        
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtName').type('Incident')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEventTypeCategories').select('SHE')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDescription').type('Incident')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_lblNameError').should('be.visible').and('contains.text', 'Save failed. Name must be unique.')
    })
})
