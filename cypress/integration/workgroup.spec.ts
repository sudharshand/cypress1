describe('workgroup admin', () => {
    beforeEach(() => {
        cy.login()
        cy.navigateToAdminPage('Workgroup Details')
    })

    it ("has elements and validation", () => {
        cy.get('#refreshButton').should('contain.text', 'Search')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_lnkInvalidWorkgroups').should('contain.text', ' Invalid Workgroups')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_chkActive').should('be.checked')
        
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_btnSave').click()

        cy.get('#valName').should('have.text', 'Please enter a name')
        cy.get('#valDescription').should('have.text', 'Please enter a description')
        cy.get('#valLocation').should('have.text', 'Please select a location')
        cy.get('#valMineType').should('have.text', 'Please enter a mine type')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_txtName').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1234')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_txtName').should('have.value', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1')



        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_txtDescription').type('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd1234')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_txtDescription').should('have.value', 'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd1')

        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_lstLocation').select('Surface')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_lstMineType').select('Mine')

        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_btnSave').click()

        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_btnDelete').should('be.visible')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_btnNewRootClass').should('be.visible')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_alertPanel_statusLabel').should('have.text', 'Workgroup details updated successfully.')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_lblConsolidationPercent').should('have.text', '100')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_ctrlClassHierarchyEditorTree_classGrid').should('be.visible')

        const stub = cy.stub()  
        cy.on ('window:confirm', stub)

        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlRootClassValues_btnDelete').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Are you sure you wish to delete this record?')      
        }) 
    })
})
