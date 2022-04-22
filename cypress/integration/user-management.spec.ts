let Person = { firstName: 'Roy', lastName: 'Batty'}
let oneRecordMessage = '1 - 1 of 1 items'
let noRecordMessage = 'No items to display'

const createPerson = (person : any) => {
    cy.visit('/InControl/PersonDetails.aspx')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPort').select('DEV - DEV')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstGender').select('Unknown')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtFirstName').clear().type(person.firstName)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLastName').clear().type(person.lastName)

    if(person.networkUsername)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').clear().type(person.networkUsername)
    
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_btnWorkgroups > .fa').click()
    cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_wgrp_pnlSelector', '1.00 General Management')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click()
}

describe('User Management', () => {
    before(() => {
        Person.lastName += Cypress.moment()
        createPerson(Person)
})
    beforeEach(() => {
        cy.login()
        cy.viewport(1600, 800) 

        cy.navigateToAdminPage('User Management')
        
        cy.wait(1000)
})

    it ("has mandatory fields with the right validation messages", () => {
        cy.get('.btn.btn-sm.btn-primary.k-grid-add').click()
        cy.get(`#UserName`).should('have.class', 'mandatory')
        cy.get(`#LookupName`).should('have.class', 'mandatory')
        cy.get(`#ContactEmail`).should('not.have.class', 'mandatory')
        cy.get(`#UserInformation`).should('not.have.class', 'mandatory')
        cy.get(`#_ReferencePerson`).should('not.have.class', 'mandatory')
        cy.get(`#Active`).should('be.checked')
        cy.get(`.k-button.k-button-icontext.k-primary.k-grid-update`).click()
        cy.get(`span[data-valmsg-for='UserName']`).should('contain.text', 'User Name is required')
        cy.get(`span[data-valmsg-for='LookupName']`).should('contain.text', 'Lookup Name is required')
    })

    it("can create a record not linked to a person", () => { 
        cy.get('.btn.btn-sm.btn-primary.k-grid-add').click()
        cy.server()
        cy.route('POST', '**/incontrol/security/savesecurityuser**').as('postData')

        cy.get(`#UserName`).type('Automation Username' + Cypress.moment())
        let lookupName = '_Automation Lookup name' + Cypress.moment()
        cy.get(`#LookupName`).type(lookupName)

        cy.get(`.k-button.k-button-icontext.k-primary.k-grid-update`).click()

        cy.wait('@postData').then((xhr) => {
            expect(xhr.response.body.Data[0].ReferencePersonId).to.be.empty
            expect(xhr.response.body.Data[0].LookupName).to.equal(lookupName)
            expect(xhr.response.body.Errors).to.equal(null)
        })
    })

    it("can filter", () => {
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[data-bind="value:filters[0].value"]`).focus().type('_automation', { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
    })

    it("can create a record linked to a person", () => { 
        cy.get('.btn.btn-sm.btn-primary.k-grid-add').click()
        cy.server()
        cy.route('POST', '**/incontrol/security/savesecurityuser**').as('postData')

        cy.get(`#UserName`).type('Automation Username' + Cypress.moment())
        let lookupName = '_Automation Lookup name' + Cypress.moment()
        cy.get(`#LookupName`).type(lookupName)
        cy.get(`input#_ReferencePerson`).type(`${Person.lastName}, ${Person.firstName}`)
        cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true })

        const stub = cy.stub()  
        cy.on ('window:confirm', stub)

        cy.get(`.k-button.k-button-icontext.k-primary.k-grid-update`).click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Once the security user record has been linked against a person, the record will not be able to be unlinked unless it is deleted.\n\nAre you sure you want to link the security user record?')      
        }) 
       
        cy.wait('@postData').then((xhr) => {
            expect(xhr.response.body.Data[0].ReferencePersonId).not.to.be.empty
            expect(xhr.response.body.Data[0].LookupName).to.equal(lookupName)
            expect(xhr.response.body.Errors).to.equal(null)
        })
    })
})

describe('People in User Management', () => {
    before(() => {
        cy.login()
        cy.viewport(1600, 800) 
    })
    it("can create person without a user", () => {
        let testPerson = { firstName: 'Leon', lastName: 'Kowalski' + Cypress.moment() }
        createPerson(testPerson)
        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
        cy.get(`.k-pager-info.k-label`).should('have.text', noRecordMessage)
    })  

    it("can create person with a user", () => {
        let testPerson = { firstName: 'Leon', lastName: 'Kowalski' + Cypress.moment(), networkUsername: 'icanlogin\\Kowalski' + Cypress.moment() }
        createPerson(testPerson)
        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
        cy.get(`.k-pager-info.k-label`).should('have.text', oneRecordMessage)
    })    

    it("persists changes made to user with person", () => {
        let testPerson = { firstName: 'Pris', lastName: 'Stratton' + Cypress.moment(), networkUsername: 'icanlogin\\Stratton' + Cypress.moment() }
        let changedTestPerson = { firstName: 'Rachael ', lastName: 'Tyrell' + Cypress.moment(), networkUsername: 'icanlogin\\Tyrell' + Cypress.moment() }
        createPerson(testPerson)
        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
        cy.get(`.k-pager-info.k-label`).should('have.text', oneRecordMessage)
        cy.get(`.k-button.k-button-icontext.k-grid-edit`).click()
        cy.get(`#UserName`).clear().type(changedTestPerson.networkUsername)
        cy.get(`#LookupName`).clear().type(`${changedTestPerson.lastName}, ${changedTestPerson.firstName}`)
        cy.get(`#ContactEmail`).clear().type(`name@domain.com`)
        cy.get(`#ContactNumber`).clear().type(`12345`)
        cy.get(`.k-grid-update:visible`).click()
        cy.visit('/InControl/Persons.aspx')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtSearch').clear().type(changedTestPerson.lastName)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnRefresh').click()
        cy.wait(1000)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').should('have.value', changedTestPerson.networkUsername)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLookupName').should('have.value', `${changedTestPerson.lastName}, ${changedTestPerson.firstName}`)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtEmail').should('have.value', 'name@domain.com')
    })   
    
    it("can Delete a Person record with no linked records except User Management record", () => {
        let testPerson = { firstName: 'Taffey', lastName: 'Lewis' + Cypress.moment(), networkUsername: 'icanlogin\\lewis' + Cypress.moment() }
        createPerson(testPerson)

        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
        cy.get(`.k-pager-info.k-label`).should('have.text', oneRecordMessage)

        cy.visit('/InControl/Persons.aspx')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtSearch').clear().type(testPerson.lastName)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnRefresh').click()
        cy.wait(1000)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').should('have.value', testPerson.networkUsername)
        cy.get(`#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnDelete`).click()
        cy.wait(1000)

        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
        cy.get(`.k-pager-info.k-label`).should('have.text', noRecordMessage)
    })
    
    it("can Delete a record linked to a person record", () => {
        let testPerson = { firstName: 'Zhora', lastName: 'Salome' + Cypress.moment(), networkUsername: 'icanlogin\\salome' + Cypress.moment() }
        createPerson(testPerson)
        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
        cy.get(`.k-pager-info.k-label`).should('have.text', oneRecordMessage)
        cy.get(`.k-button.k-button-icontext.k-grid-delete`).click()
        cy.get(`.k-pager-info.k-label`).should('have.text', noRecordMessage)

        cy.visit('/InControl/Persons.aspx')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtSearch').clear().type(testPerson.lastName)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnRefresh').click()
        cy.wait(1000)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').should('have.value', testPerson.networkUsername)
    })
    
    it("can Edit a Person record - Remove Network Username ", () => {
        let testPerson = { firstName: 'Rick', lastName: 'Deckard' + Cypress.moment(), networkUsername: 'icanlogin\\deckard' + Cypress.moment() }
        createPerson(testPerson)
        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
        cy.get(`.k-pager-info.k-label`).should('have.text', oneRecordMessage)

        cy.visit('/InControl/Persons.aspx')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtSearch').clear().type(testPerson.lastName)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnRefresh').click()
        cy.wait(1000)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').should('have.value', testPerson.networkUsername)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').clear()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click()
        cy.wait(1000)
        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
        cy.get(`.k-pager-info.k-label`).should('have.text', noRecordMessage)
    })

    it("can Delete a record linked to a person record and remove Username from person record", () => {
        let testPerson = { firstName: 'JF', lastName: 'Sebastian' + Cypress.moment(), networkUsername: 'icanlogin\\Sebastian' + Cypress.moment() }
        createPerson(testPerson)
        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })
        cy.get(`.k-pager-info.k-label`).should('have.text', oneRecordMessage)
        cy.get(`.k-button.k-button-icontext.k-grid-delete`).click()
        cy.get(`.k-pager-info.k-label`).should('have.text', noRecordMessage)

        cy.visit('/InControl/Persons.aspx')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtSearch').clear().type(testPerson.lastName)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnRefresh').click()
        cy.wait(1000)
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').clear()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click()
        cy.wait(1000)

        cy.navigateToAdminPage('User Management')
        cy.wait(1000)
        cy.get(`th[data-field="LookupName"]`).find('span.k-icon.k-i-filter').click({ force: true })
        cy.get(`input[title="Value"]`).focus().type(testPerson.lastName, { force: true })
        cy.get(`button[title="Filter"].k-button.k-primary`).focus().click({ force: true })

        cy.get(`.k-pager-info.k-label`).should('have.text', noRecordMessage)
    }) 
})