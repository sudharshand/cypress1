describe('Event User Security', () => {
    const options = {
        timeout: 5000
    };

    beforeEach(function() {
        cy.fixture('incontrol.json')
            .then((configuration) => {
                this.configuration = configuration
                cy.login();
                cy.viewport(1600, 800);
            });
    });

    it ('Can navigate to Event User Security from admin menu', function() {
        cy.navigateToAdminPage('Event User Security');
        cy.get('.page-header').should('contain.text', 'Event User Security');
    });

    it ('Can copy and bulk delete person security', function() {
        cy.visit('/InControl/EventUserSecurity');
        cy.get('#formEventUserSecurity table tbody')
            .find('tr td:first-child input')
            .first()
            .check();
        cy.get('#copy-section > .k-widget > .k-dropdown-wrap > .k-input').type('inxdev\\TR1');
        cy.get('#CopyToPerson_listbox').contains('inxdev\\TR1').then(($el) => $el.click());
        cy.get('#btnCopy').click();
        cy.get('#statusLabel').should('contain.text', 'Event User Security profile(s) copied successfully.');
        cy.get(':nth-child(5) > .k-widget > .k-dropdown-wrap > .k-input').type('inxdev\\TR1');
        cy.get('#person-search_listbox').contains('inxdev\\TR1').then(($el) => $el.click());
        cy.get('#btnSearch').click();
        cy.get('#formEventUserSecurity table tbody tr', options)
            .should('have.length', 1);
        cy.get('tbody > tr > :nth-child(3)').should('contain.text', 'inxdev\\TR1');
        cy.get('tbody > tr > :nth-child(4)').should('contain.text', 'MineSite');
        cy.get('tbody > tr > :nth-child(5)').should('contain.text', 'Event Report Manager');
        cy.get('tbody > tr > :nth-child(6)').should('be.empty');
        cy.get('tbody > tr > :nth-child(7)').should('be.empty');
        cy.get('tbody > tr > :nth-child(8)').should('be.empty');
        cy.get('tbody > tr > :nth-child(9)').should('be.empty');
        cy.get('tbody > tr > :nth-child(10)').should('contain.text', 'Yes');
        cy.wait(1000);
        cy.get('.select-box > .k-checkbox').check();
        cy.get('#btnDelete').click();
        cy.get('#statusLabel').should('contain.text', 'Event User Security profile(s) deleted successfully.');
        cy.get('#formEventUserSecurity table tbody tr').should('not.exist');

        cy.get(':nth-child(5) > .k-widget > .k-dropdown-wrap > .k-input').clear();
        cy.get('#btnSearch').click();
        cy.wait(1000);
        cy.get('#formEventUserSecurity table tbody', options)
            .find('tr:nth-child(1n):not(:nth-last-child(-n+5)) td:first-child')
            .each($el => cy.wrap($el).find('input').check());

        cy.get('#copy-section > .k-widget > .k-dropdown-wrap > .k-input').clear().type('inxdev\\TR1');
        cy.get('#CopyToPerson_listbox').contains('inxdev\\TR1').then(($el) => $el.click());
        cy.get('#btnCopy').click();
        cy.get('#statusLabel').should('contain.text', 'Event User Security profile(s) copied successfully.');
        cy.get(':nth-child(5) > .k-widget > .k-dropdown-wrap > .k-input').clear().type('inxdev\\TR1');
        cy.get('#person-search_listbox').contains('inxdev\\TR1').then(($el) => $el.click());
        cy.get('#btnSearch').click();
        cy.get('#formEventUserSecurity table tbody tr', options)
            .should('have.length', 4);

        cy.get('input[aria-label="Select all rows"]').check();
        cy.get('#copy-section > .k-widget > .k-dropdown-wrap > .k-input').clear().type('inxdev\\TR1');
        cy.get('#CopyToPerson_listbox').contains('inxdev\\TR1').then(($el) => $el.click());
        cy.get('#btnCopy').click();
        cy.get('#formEventUserSecurity table tbody tr', options)
            .should('have.length', 4);

        cy.get('input[aria-label="Select all rows"]').check();
        cy.get('#btnDelete').click();
        cy.get('#statusLabel').should('contain.text', 'Event User Security profile(s) deleted successfully.');
    });

    it ('Can add and search', function () {
        cy.visit('/InControl/EventUserSecurity');
        cy.get('#btnAssignSecurity').click();
        cy.get('#btnAdd').click();
        cy.get('#WorkflowRoleIdsSelected-error').should('be.visible').and('contain.text', 'Workflow Role is required');
        cy.get('#ClassValueId-error').should('be.visible').and('contain.text', 'Company Level is required');
        cy.get(':nth-child(1) > .field-validation-valid').should('be.visible').and('contain.text', 'Person is required');

        cy.get(':nth-child(1) > :nth-child(1) > .k-widget > .k-multiselect-wrap', options).click();
        cy.get('#WorkflowRoleIdsSelected_listbox', options).contains('Event Reader').then(($el) => $el.click());
        cy.get(':nth-child(2) > :nth-child(1) > .k-widget > .k-multiselect-wrap').click();
        cy.get('#PersonSelected_listbox').contains('AUBIN, Gary').then(($el) => $el.click());
        cy.get('#addForm > .panel-body > :nth-child(1) > .form-group.inx-container > .class-value-selector-container > :nth-child(1) > .control-form-group > .input-group > .input-group-btn > .btn > .fa').click();
        cy.get('.class-value-search-dialog .search-textbox').first().type('1.05');
        cy.wait(1000);
        cy.get('.class-value-name').click();
        cy.get('#addForm > .panel-body > :nth-child(1) > .form-group.inx-container > .class-value-selector-container > :nth-child(1) > .modal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
        cy.get(':nth-child(3) > .k-widget > .k-multiselect-wrap').click();
        cy.get('#EventTypeIdsSelected-list').contains('Incident').then(($el) => $el.click());
        cy.get(':nth-child(4) > .k-widget > .k-multiselect-wrap').click();
        cy.get('#EventSubTypeIdsSelected_listbox').contains('Near Hit').then(($el) => $el.click());
        cy.get(':nth-child(2) > .k-widget > .k-multiselect-wrap').click();
        cy.get('#RiskAssessmentIdsSelected_listbox').contains('Moderate').then(($el) => $el.click());
        cy.get('#Sequence').type('99');
        cy.get('#btnAdd').click();
        cy.get('#statusLabel').should('contain.text', 'Record updated successfully.');

        cy.get('#event-type-search').select('Incident');
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody tr').should('have.length', 1);
        cy.get('#event-subtype-search').select('Environment');
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody').should('be.empty');
        cy.get('#event-subtype-search').select('Near Hit');
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody tr').should('have.length', 1);
        cy.get('#workflow-role-search').select('Action Approver');
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody').should('be.empty');
        cy.get('#workflow-role-search').select('Event Reader');
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody tr').should('have.length', 1);
        cy.get('#risk-assessment-search').select('Low');
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody').should('be.empty');
        cy.get('#risk-assessment-search').select('Moderate');
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody tr').should('have.length', 1);
        cy.get(':nth-child(5) > .k-widget > .k-dropdown-wrap > .k-input').clear().type('Verena');
        cy.wait(1000);
        cy.get('#person-search_listbox > .k-virtual-item').click();
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody').should('be.empty');
        cy.get(':nth-child(5) > .k-widget > .k-dropdown-wrap > .k-input').clear().type('AUBIN, Gary');
        cy.wait(1000);
        cy.get('#person-search_listbox > .k-virtual-item').click();
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody tr').should('have.length', 1);

        cy.get('#searchFilters > .panel-body > :nth-child(1) > .form-group.inx-container > .class-value-selector-container > :nth-child(1) > .control-form-group > .input-group > .input-group-btn > .btn').click();
        cy.get('.class-value-search-dialog .search-textbox').last().type('1.04');
        cy.wait(1000);
        cy.get('.class-value-name').last().click();
        cy.get('#searchFilters > .panel-body > :nth-child(1) > .form-group.inx-container > .class-value-selector-container > :nth-child(1) > .modal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody').should('be.empty');

        cy.get('#searchFilters > .panel-body > :nth-child(1) > .form-group.inx-container > .class-value-selector-container > :nth-child(1) > .control-form-group > .input-group > .input-group-btn > .btn').click();
        cy.get('.class-value-search-dialog .search-textbox').last().type('1.05');
        cy.get('.search-button').last().click();
        cy.wait(1000);
        cy.get('.class-value-name').last().click();
        cy.get('#searchFilters > .panel-body > :nth-child(1) > .form-group.inx-container > .class-value-selector-container > :nth-child(1) > .modal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
        cy.get('#btnSearch').click();
        cy.get('#gridEventUserSecurity table tbody tr').should('have.length', 1);
        cy.wait(1000);

        cy.get('tbody > tr > :nth-child(3)').should('contain.text', 'AUBIN, Gary');
        cy.get('tbody > tr > :nth-child(4)').should('contain.text', '1.05 IT');
        cy.get('tbody > tr > :nth-child(5)').should('contain.text', 'Event Reader');
        cy.get('tbody > tr > :nth-child(6)').should('contain.text', 'Incident');
        cy.get('tbody > tr > :nth-child(7)').should('contain.text', 'Near Hit');
        cy.get('tbody > tr > :nth-child(8)').should('contain.text', 'Moderate');
        cy.get('tbody > tr > :nth-child(9)').should('contain.text', '99');
        cy.get('tbody > tr > :nth-child(10)').should('contain.text', 'Yes');

        cy.get('.select-box > .k-checkbox').check();

        cy.once('window:confirm', () => false);
        cy.get('#btnDelete').click();
        cy.get('#gridEventUserSecurity table tbody tr').should('have.length', 1);
        cy.get('#btnDelete').click();
        cy.get('#gridEventUserSecurity table tbody').should('be.empty');
        cy.get('#statusLabel').should('contain.text', 'Event User Security profile(s) deleted successfully.');
    });
});
