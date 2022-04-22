const Url = '/InControl/TableDetails.aspx?id=83'
const PageTitle = 'Status Reasons'

describe('Printer Friendly Actions', function () {
    it ('Printer friendly window opens', function () {
        cy.login();
        cy.visit(Url, {
            onBeforeLoad(win) {
                cy.stub(win, 'open')
            }
        })
        cy.get('.page-header').should('contain.text', PageTitle)
        cy.get('.printer-friendly').click()
        cy.window().its('open').should('be.called')
    })
})

describe('Navigation', function () {
    it ('Can navigate to page from the Administration page', function () {
        cy.login();
        cy.visit('/InControl')
        cy.get('#Administration-menu').click()
        cy.get('#ctl00_ctl00_body_body_ctlAdminHome_txtSearch').type(PageTitle)
        cy.get('[style=""] > [style="width: 275px"] > a').click()
        cy.get('.page-header').should('contain.text', PageTitle)
    })
})

describe('Status Reason CRUD', function () {
    const LongNameField = 'This is a very long string of text used to demonstrate that the name of a field cannot exceed 100 characters'
    const ExpectedNameField = LongNameField.substring(0, 100)
    const LongSequenceField = '9999999999'
    const ExpectedSequenceField = LongSequenceField.substring(0, 9)
    const LongDescriptionField = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.'
    const ExpectedDescriptionField = LongDescriptionField.substring(0, 250).trim();

    beforeEach(() => {
        cy.login();
        cy.visit(Url)
        cy.get('.page-header').should('contain.text', PageTitle)
    })

    it ('Status Reasons appear sequentially', function () {
        const $rows = cy.get('tbody > tr')
        $rows.should('have.length', 3)
        let expected = 1
        $rows.each($row => {
            cy.wrap($row).within(() => {
                expect($row.find(':nth-child(5)').text()).to.equal(expected.toString())
                ++expected
            })
        })
    })

    it ('Unable to create a status reason without filling in mandatory fields', function () {
        cy.get('.k-plus').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_btnAdd').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_alertPanel_alert[class*="alert-danger"]').should('be.visible')
        cy.get('tbody tr:nth-child(4)').should('not.exist')
    })

    it ('Creates a new status reason', function () {
        cy.get('.k-plus').click()
        cy.get('.inx-grid-footer').within(() => {
            cy.get(':nth-child(3) > .inx-add-record-control > .form-control').type(LongNameField)
            cy.get(':nth-child(4) > .inx-add-record-control > .form-control').type('Test Description')
            cy.get(':nth-child(5) > .inx-add-record-control > .form-control').type(LongSequenceField)
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_ctl04').check()
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_ctl05').uncheck()
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_btnAdd').click()
        })
        cy.get(':nth-child(4) > :nth-child(3)').should('contain.text', ExpectedNameField)
        cy.get(':nth-child(4) > :nth-child(4)').should('contain.text', 'Test Description')
        cy.get(':nth-child(4) > :nth-child(5)').should('contain.text', ExpectedSequenceField)
        cy.get(':nth-child(4) > :nth-child(6)').should('contain.text', 'Yes')
        cy.get(':nth-child(4) > :nth-child(7)').should('contain.text', 'No')
    })

    it ('Creates a duplicate status reason', function () {
        cy.get('.k-plus').click()
        cy.get('.inx-grid-footer').within(() => {
            cy.get(':nth-child(3) > .inx-add-record-control > .form-control').type(LongNameField)
            cy.get(':nth-child(4) > .inx-add-record-control > .form-control').type('Test Description')
            cy.get(':nth-child(5) > .inx-add-record-control > .form-control').type(LongSequenceField)
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl07_ctl04').check()
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl07_ctl05').uncheck()
            cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl07_btnAdd').click()
        })

        cy.get(':nth-child(5) > :nth-child(3)').should('contain.text', ExpectedNameField)
        cy.get(':nth-child(5) > :nth-child(4)').should('contain.text', 'Test Description')
        cy.get(':nth-child(5) > :nth-child(5)').should('contain.text', ExpectedSequenceField)
        cy.get(':nth-child(5) > :nth-child(6)').should('contain.text', 'Yes')
        cy.get(':nth-child(5) > :nth-child(7)').should('contain.text', 'No')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl07_btnDelete').click()
        cy.wait(2000);
    })

    it ('Updates a status reason', function () {
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_btnEdit').click()
        cy.get(':nth-child(3) > .form-control').clear().type('Updated Name')
        cy.get(':nth-child(4) > .form-control').clear().type(LongDescriptionField)
        cy.get(':nth-child(5) > .form-control').clear().type('5')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_ctl04').uncheck()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_ctl05').check()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_btnUpdate').click()
        cy.get(':nth-child(4) > :nth-child(3) > span').should('contain.text', 'Updated Name')
        cy.get(':nth-child(4) > :nth-child(4) > span').should('contain.text', ExpectedDescriptionField)
        cy.get(':nth-child(4) > :nth-child(5)').should('contain.text', '5')
        cy.get(':nth-child(4) > :nth-child(6)').should('contain.text', 'No')
        cy.get(':nth-child(4) > :nth-child(7)').should('contain.text', 'Yes')
    })

    it ('Does not delete a status reason if prompt is cancelled', function () {
        cy.on('window:confirm', () => false)
        cy.get('tbody tr:nth-child(4)')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_btnDelete').click()
        cy.get('tbody tr:nth-child(4)').should('exist')
    })

    it ('Does not delete a referenced status reason', function () {
        cy.get('tbody tr:nth-child(1)')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl03_btnDelete').click()
        cy.get(':nth-child(1) > :nth-child(3)').should('contain.text', 'Under Investigation')
    })

    it ('Deletes a non-referenced status reason', function () {
        cy.get('tbody tr:nth-child(4)')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_tblDetails_dgTableDetails_ctl06_btnDelete').click()
        cy.get('tbody tr:nth-child(4)').should('not.exist')
    })
})
