let personForRole: any = null;
beforeEach(() => {
    cy.fixture('person.json')
        .then((personData: any) => {
            personForRole = personData;
            cy.login('System Administrator');
            cy.viewport(1600, 1600);
            deletePersonIfExistsForRole(personForRole.lookupName);
            deletePersonIfExistsForRole(`copy of `+ personForRole.lookupName);
        });
});

const fillMandatoryFieldsForRole = () => {
    cy.visit('/InControl/PersonDetails.aspx')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPort').select(personForRole.firstPort);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstGender').select(personForRole.gender);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLookupName').clear().type(personForRole.lookupName);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_btnWorkgroups > .fa').click();
    cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_wgrp_pnlSelector', personForRole.defaultCompanyLevel);
}

const deletePersonIfExistsForRole = (name: string) => {    
    cy.visit('/InControl/Persons.aspx');
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_txtWorkgroup').clear();
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtSearch').type(name);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnRefresh').click();
    cy.get('.page-header').invoke('text').then((headerText) => {
        if (headerText.search('Person Details') !== -1) {
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnDelete').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('be.visible')
                .and('contain.text', 'Person and related security records were successfully deleted');
        }
    });
}



describe ('Roles', () => {
    const userAccounts: string[] = ['Administrator', 'System Administrator', 'Editor', 'Reader'];
    userAccounts.forEach((account) => {
        it (`Can add, edit and delete roles with ${account}`, () => {
            cy.login(account);
            fillMandatoryFieldsForRole();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
            cy.get('#Roles-tab').click();

            // Add role 1
            cy.get('#add-role').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_btnAdd').click();
            cy.get('#valAddRole').should('contain.text', 'Please choose a role').and('be.visible');
            cy.get('#valAddStartDate').should('contain.text', 'Please enter a date').and('be.visible');

            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_insAddRole_btnOpenSearch').click();
            cy.selectFromRole('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_insAddRole_insearch_pnlSelector', 'Admin - Manager');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_txtAddAppointedBy_btnPeople').click();
            cy.selectFromPeople('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_txtAddAppointedBy_pnlSelector', 'Aaron, Xavier');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_ctrlAddStartDate__txtDate').type('11-May-2010');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_btnAdd').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_alertPanel_alert').should('contain.text', 'Role history added successfully');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2 > tbody > tr:first-child').within(() => {
                cy.get('td:nth-child(2)').should('contain.text', 'Admin - Manager');
                cy.get('td:nth-child(3)').should('contain.text', 'Corporate');
                cy.get('td:nth-child(4)').should('contain.text', 'Aaron, Xavier');
                cy.get('td:nth-child(5)').should('contain.text', '11-May-2010');
                cy.get('td:nth-child(6) > span').should('be.empty');
            });

            // Updated role 1
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_btnEdit').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_insRole_btnOpenSearch').click();
            cy.selectFromRole('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_insRole_insearch_pnlSelector', 'Admin - HSE Manager');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_txtAppointedBy_btnPeople').click();
            cy.selectFromPeople('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_txtAppointedBy_pnlSelector', 'ADAMS, Rick');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_ctrlStartDate__txtDate').clear().type('14-May-2010');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_ctrlEndDate__txtDate').clear().type('15-May-2010');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_btnUpdate').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_alertPanel_alert').should('contain.text', 'Role history updated successfully');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2 > tbody > tr:first-child').within(() => {
                cy.get('td:nth-child(2)').should('contain.text', 'Admin - HSE Manager');
                cy.get('td:nth-child(3)').should('contain.text', 'Corporate');
                cy.get('td:nth-child(4)').should('contain.text', 'ADAMS, Rick');
                cy.get('td:nth-child(5)').should('contain.text', '14-May-2010');
                cy.get('td:nth-child(6) > span').should('contain.text', '15-May-2010');
            });

            // Add duplicate record.
            cy.wait(2000);
            cy.get('#add-role').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_insAddRole_btnOpenSearch').click();
            cy.selectFromRole('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_insAddRole_insearch_pnlSelector', 'Admin - HSE Manager');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_txtAddAppointedBy_btnPeople').click();
            cy.selectFromPeople('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_txtAddAppointedBy_pnlSelector', 'ADAMS, Rick');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_ctrlAddStartDate__txtDate').type('14-May-2010');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_btnAdd').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_alertPanel_alert').should('contain.text', 'Role already exists');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2 > tbody').find('tr').should('have.length', 1);

            // Add duplicate record with end date.
            cy.wait(2000);
            cy.get('#add-role').click();
            cy.wait(2000);
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_insAddRole_btnOpenSearch').click();
            cy.selectFromRole('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_insAddRole_insearch_pnlSelector', 'Admin - HSE Manager');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_txtAddAppointedBy_btnPeople').click();
            cy.selectFromPeople('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_txtAddAppointedBy_pnlSelector', 'ADAMS, Rick');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_ctrlAddStartDate__txtDate').type('14-May-2010');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_ctrlAddEndDate__txtDate').type('15-May-2010');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_btnAdd').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_alertPanel_alert').should('contain.text', 'Role already exists');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2 > tbody').find('tr').should('have.length', 1)

            // Add role 2
            cy.wait(2000);
            cy.get('#add-role').click();
            cy.wait(2000);
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_insAddRole_btnOpenSearch').click();
            cy.wait(2000);
            cy.selectFromRole('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_insAddRole_insearch_pnlSelector', 'Mine - Operations Manager');
            //cy.wait(2000);
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_txtAddAppointedBy_btnPeople').click();
            cy.wait(6000);
            cy.selectFromPeople('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_txtAddAppointedBy_pnlSelector', 'Alvarez, Dwayne');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_ctrlAddStartDate__txtDate').type('19-May-2010');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_btnAdd').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_alertPanel_alert').should('contain.text', 'Role history added successfully');

            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2 > tbody > tr:first-child').within(() => {
                cy.get(':nth-child(5)').should('contain.text', '19-May-2010');
                cy.get('td:nth-child(2)').should('contain.text', 'Mine - Operations Manager');
            });
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2 > tbody > tr:nth-child(2)').within(() => {
                cy.get(':nth-child(5)').should('contain.text', '14-May-2010');
                cy.get(':nth-child(2)').should('contain.text', 'Admin - HSE Manager');
            });

            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_btnDelete').click();
            cy.once('window:confirm', () => false);
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2 > tbody').find('tr').should('have.length', 2)
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl03_btnDelete').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_alertPanel_alert').should('be.visible').and('contain.text', 'Role history deleted successfully.');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2 > tbody').find('tr').should('have.length', 1)
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_dg2_ctl02_btnDelete').click()
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_alertPanel_alert').should('be.visible').and('contain.text', 'Role history deleted successfully.');
        });
    });
});