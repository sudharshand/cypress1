const uuid = () => Cypress._.random(0, 1e6)

describe("Competency", function () {
  it('Create competency, adds prerequisites and practical/theory elements', function () {
    cy.login();
    cy.visit('/InTuition')
    cy.get(".security-link").should("have.text", "cubeconsulting\\TR10")

    cy.get('#Competencies-expander').click()
    cy.get(`#${CSS.escape('Add New Competency-submenu')}`).click()


    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCompetencyCode').type('competency-code')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCompetencyName').type(`Competency-${uuid()}`)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnWorkgroups').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnSearch').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_lbxWorkgroups').select('1.01 Administration')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnOK').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_lstCompetencyType').select('Certification')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_lstCompetencyClass').select('Skills')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDurationHours').type('8')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtTrainingCost').type('500')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtExpiryYears').type('1')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtEmail').type('expiry@email.com')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_chkAutoGen').check()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_chkOnlineTest').check()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtPassScore').type('50')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDescription').type('A short competency description')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtComments').type('Some competency comments')

    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert')

    cy.get(`#${CSS.escape('Advanced Details-tab')}`).click() // blocked by iFrame!!!
    cy.get(`#${CSS.escape('Elements-tab')}`).click()

    cy.get('#add-competency-element').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtAddElement').type('Practical')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtAddSequence').type('2')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnAdd').click()

    cy.get('#add-competency-element').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl03_txtAddElement').type('Theory')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl03_txtAddSequence').type('1')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl03_btnAdd').click()
  })
})

describe("Compliance", function () {
  it('Creates compliance and adds prerequisites', function () {
    cy.login();
    cy.visit('/InTuition')
    cy.get(".security-link").should("have.text", "cubeconsulting\\TR10")

    cy.get('#Compliances-expander').click()
    cy.get(`#${CSS.escape('Add New Compliance-submenu')}`).click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_txtComplianceName').type(`compliance-${uuid()}`)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_ctrlWorkgroup_btnWorkgroups').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_ctrlWorkgroup_btnSearch').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_ctrlWorkgroup_lbxWorkgroups').select('1.01 Administration')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_ctrlWorkgroup_btnOK').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_lstComplianceClass').select('General')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_txtExpiryYears').type('1')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_txtEmail').type('expiry@email.com')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_txtDescription').type('A short compliance description')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_txtComments').type('Some compliance comments')

    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_btnSave').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ComplianceDetails_alertPanel_alert')

    cy.get(`#${CSS.escape('Advanced Details-tab')}`).click()

    cy.get('[id$=_dgPrerequisite]').find('[id$=_linkAdd]').click()
    cy.frameLoaded('.modal-dialog-iframe')
    cy.enter().then(getBody => {
      getBody().find('#add-advanced-compliance-dialog').click()
      getBody().find('#ctl00_ctl00_body_body_dgEditCompliance_ctl02_cubeComplianceSearch_btnOpenSearch').click()
      getBody().find('#ctl00_ctl00_body_body_dgEditCompliance_ctl02_cubeComplianceSearch_tblResults').within(() => {
        cy.get('td').first().click()
      })
      getBody().find('#ctl00_ctl00_body_body_dgEditCompliance_ctl02_cubeComplianceSearch_btnOK').click()
      getBody().find('#ctl00_ctl00_body_body_dgEditCompliance_ctl02_btnAdd').click()
    })
    cy.wait(1000)
    cy.get('#btnSaveModal').click()
  })
})

describe("Procedures", function () {
  it('Creates procedure', function () {
    cy.login();
    cy.visit('/InTuition')
    cy.get(".security-link").should("have.text", "cubeconsulting\\TR10")

    cy.get('#Procedures-expander').click()
    cy.get(`#${CSS.escape('Add New Procedure-submenu')}`).click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_txtProcedureCode').type('procedure-code')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_txtProcedureName').type(`procedure-${uuid()}`);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_lstProcedureType').select('Safe Work Procedures')

    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_ctrlWorkgroup_btnWorkgroups').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_ctrlWorkgroup_btnSearch').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_ctrlWorkgroup_lbxWorkgroups').select('1.01 Administration')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_ctrlWorkgroup_btnOK').click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_txtEmail').type('expiry@email.com')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_txtValidityPeriod').type('1')

    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_txtDescription').type('A short procedure description')

    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_btnSave').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ProcedureDetails_alertPanel_alert')
  })


})

describe("Roles", function () {
  it('Creates role, adds competency, adds compliance, adds procedure and assigns to person', function () {
    cy.ntlm('https://master-daily.inxdev.com', 'tr10', 'Training10', 'cubeconsulting')
    cy.visit('/InTuition')
    cy.get(".security-link").should("have.text", "cubeconsulting\\TR10")

    cy.get('#Roles-expander').click()
    cy.contains('Add New Role').should('be.visible').click()

    const roleid = uuid()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_RoleDetails_txtRoleName').type(`Astronaut-${roleid}`)
    cy.get('#ctl00_ctl00_ctl00_body_body_body_RoleDetails_txtDescription').type('An enterprise professional who can orbit around the can')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_RoleDetails_ctrlWorkgroup_txtWorkgroup').type('5.02 Maintenance Shift 1')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_RoleDetails_lstRoleClass').select('Statutory')

    cy.contains('Save').click()
    cy.contains('Role updated successfully.').should('be.visible')

    cy.get('#Competencies-tab').click()
    cy.get('#add-role-competency').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddCompetencySearch_btnOpenSearch').click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddCompetencySearch_tblResults').within(() => {
      cy.get('tr').first().get('td').first().click()
    })

    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddCompetencySearch_btnOK').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddLevelRequired').select('Must have, statutory training')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnAdd').click()

    cy.get('#Compliances-tab').click()
    cy.get('#add-role-compliance').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeComplianceSearch_btnOpenSearch').click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeComplianceSearch_tblResults').within(() => {
      cy.get('tr').first().get('td').first().click()
    })

    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeComplianceSearch_btnOK').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnAdd').click()

    cy.get('#Procedures-tab').click()
    cy.get('#add-role-procedure').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddProcedureSearch_btnOpenSearch').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddProcedureSearch_tblResults').within(() => {
      cy.get('tr').first().get('td').first().click()
    })
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddProcedureSearch_btnOK').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnAdd').click()

    cy.get('#People-menu').click()
    cy.get('.button-row > .btn').click()
    cy.get('tbody > :nth-child(1) > :nth-child(3)').click()
    cy.get('#Roles-tab').click()
    cy.get('#add-role').click()

    cy.get('[id$=_insAddRole_btnOpenSearch').click()

    cy.get('[id$=_insAddRole_dvResults').find('tbody').within(() => {
      cy.contains('td', `Astronaut-${roleid}`).dblclick()
    })

    const today = Cypress.moment();
    cy.get('[id$=_ctrlAddStartDate__txtDate').type(today.format('DD-MMM-YYYY'))
    cy.get('[id$=_ctrlAddEndDate__txtDate').type(today.add(2, 'years').format('DD-MMM-YYYY'))

    cy.get('[id$=_btnAdd').click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonRoleHistory_alertPanel_statusLabel').should('have.text', 'Role history added successfully.')
  })
})

describe("Training Event", function () {
  it('Book training event with CCPs, nominate trainees, process training event and apply CCPs to person profile', function () {
    cy.ntlm('https://master-daily.inxdev.com', 'tr10', 'Training10', 'cubeconsulting')
    cy.visit('/InTuition')
    cy.get(".security-link").should("have.text", "cubeconsulting\\TR10")

    cy.get('#Courses-expander').click()
    cy.get(`#${CSS.escape('Add Course-submenu')}`).click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCourseName').type(`onsite-course-${uuid()}`)

    cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnWorkgroups').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnSearch').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_lbxWorkgroups').select('5.02 Maintenance Shift 1')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnOK').click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_lstType').select('Underground')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDurationHours').type('8')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCapacity').type('5')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCost').type('500')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCostPerAttendee').type('100')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtLocation').type('small training room')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlProvider').select('Internal')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDescription').type('A short onsite course description')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtComments').type('A short onsite course comment')

    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('be.visible')

    // add competency
    cy.get('#Competencies-tab').click()
    cy.get('#add-course-competency').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_grdCourseCompetencies_ctl03_cubeAddCompetencySearch_btnOpenSearch').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_grdCourseCompetencies_ctl03_cubeAddCompetencySearch_tblResults').within(() => {
      cy.get('tr').first().get('td').first().click()
    })
    cy.get('#ctl00_ctl00_ctl00_body_body_body_grdCourseCompetencies_ctl03_cubeAddCompetencySearch_btnOK').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_grdCourseCompetencies_ctl03_txtAddComments').type('Some competency comments')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_grdCourseCompetencies_ctl03_btnAdd').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('be.visible')

    // add compliance
    cy.get('#Compliances-tab').click()
    cy.get('#add-course-compliance').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddComplianceSearch_btnOpenSearch').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddComplianceSearch_tblResults').within(() => {
      cy.get('tr').first().get('td').first().click()
    })
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddComplianceSearch_btnOK').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtAddComments').type('Some compliance comments')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnAdd').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('be.visible')

    // add procedure
    cy.get('#Procedures-tab').click()
    cy.get('#add-course-procedure').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddProcedureSearch_btnOpenSearch').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddProcedureSearch_tblResults').within(() => {
      cy.get('tr').first().get('td').first().click()
    })
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_cubeAddProcedureSearch_btnOK').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtAddComments').type('Some procedure comments')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnAdd').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('be.visible')

    // add training event
    cy.get(`#${CSS.escape('Training Event-tab')}`).click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnNewTrainingEvent').click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_inxStartDate__imgCal').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_inxStartDate_calExt_today').click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlStartTimeHours').select('08')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlEndTimeHours').select('17')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_txtComment').type('That date picker is tapped')

    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSaveTrainingEvent').click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('be.visible')

    //add people to training event
    cy.get('#training-event-booking-0').click()
    cy.get('#add-training-event-booking').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_dataGrid_ctl02_lstPersonList_btnPeople').click()

    cy.get('#ctl00_ctl00_ctl00_body_body_body_dataGrid_ctl02_lstPersonList_btnSearch > .fa').click()

    // add random person to booking
    const index = Cypress._.random(0, 100)
    cy.get('tr > :nth-child(1) > #ctl00_ctl00_ctl00_body_body_body_dataGrid_ctl02_lstPersonList_lbxPeople')
      .within(() => {
        cy.get('option').each(($element, $index, $list) => {
          if ($index !== index) {
            return
          }
          cy.root().select($element.text())
        })
      })

    cy.get('#ctl00_ctl00_ctl00_body_body_body_dataGrid_ctl02_lstPersonList_btnAdd').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_dataGrid_ctl02_lstPersonList_btnOK').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_dataGrid_ctl02_btnAdd').click()

    // process training event
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnUpdateTrainingEvent').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_rptPersonList_ctl01_chkSelect').check()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_chkUpdateTrainingEventStatus').check()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_chkTrainingCCPStatus').check()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSubmit').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_statusLabel').should('be.visible')
  })
})

describe.only("Person", function () {
  it('Assign person as an assessor and check available in assessor list', function () {
    cy.ntlm('https://master-daily-azure.inxdev.com', 'tr10', 'Training10', 'inxdev')
    cy.visit('/InTuition')
    cy.get(".security-link").should("have.text", "inxdev\\TR10")

    cy.get('#People-menu').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_searchPanel > .panel-body > .button-row > .btn').click()
    const person = Cypress._.random(1, 9)
    cy.get(`#person-${person}`).click()
    cy.get('#Settings-tab').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_chkAssessor').check()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_statusLabel').should('be.visible')
    cy.wait(500)

    cy.get('#ctl00_ctl00_ctl00_body_body_body_Tabbar1_lblReference > span').should('exist')
      .then($name => {
        cy.get('#Courses-expander').click()
        cy.get(`#${CSS.escape('Add Course-submenu')}`).click()

        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCourseName').type(`onsite-course-${uuid()}`)

        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnWorkgroups').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnSearch').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_lbxWorkgroups').select('5.02 Maintenance Shift 1')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnOK').click()

        cy.get('#ctl00_ctl00_ctl00_body_body_body_lstType').select('Underground')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDurationHours').type('8')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCapacity').type('5')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCost').type('500')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCostPerAttendee').type('100')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtLocation').type('small training room')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlProvider').select('Internal')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDescription').type('A short onsite course description')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtComments').type('A short onsite course comment')

        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('be.visible')

        cy.get(`#${CSS.escape('Training Event-tab')}`).click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnNewTrainingEvent').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlAssessor').select($name.text())
      })
  })

  it('Assign person as a trainer and check available in trainers list', function () {
    cy.ntlm('https://master-daily-azure.inxdev.com', 'tr10', 'Training10', 'inxdev')
    cy.visit('/InTuition')
    cy.get(".security-link").should("have.text", "inxdev\\TR10")

    cy.get('#People-menu').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_searchPanel > .panel-body > .button-row > .btn').click()
    const person = Cypress._.random(1, 9)
    cy.get(`#person-${person}`).click()
    cy.get('#Settings-tab').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_chkTrainer').check()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_statusLabel').should('be.visible')

    cy.get('#ctl00_ctl00_ctl00_body_body_body_Tabbar1_lblReference > span').should('exist')
      .then($name => {
        cy.get('#Courses-expander').click()
        cy.get(`#${CSS.escape('Add Course-submenu')}`).click()

        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCourseName').type(`onsite-course-${uuid()}`)

        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnWorkgroups').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnSearch').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_lbxWorkgroups').select('5.02 Maintenance Shift 1')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ctrlWorkgroup_btnOK').click()

        cy.get('#ctl00_ctl00_ctl00_body_body_body_lstType').select('Underground')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDurationHours').type('8')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCapacity').type('5')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCost').type('500')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtCostPerAttendee').type('100')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtLocation').type('small training room')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlProvider').select('Internal')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtDescription').type('A short onsite course description')
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtComments').type('A short onsite course comment')

        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnSave').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('be.visible')

        cy.get(`#${CSS.escape('Training Event-tab')}`).click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnNewTrainingEvent').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlTrainer').select($name.text())
      })
  })
})

