describe('Logs in with multiple accounts', function () {
  it('Logs in with tr10', function () {
    cy.login('tr10');
    cy.visit('/InControl')
    cy.get(".security-link").should("have.text", "inxdev\\TR10")
  })

  it('Logs in with tr1', function () {
    cy.login('tr1')
    cy.visit('/InControl')
    cy.get(".security-link").should("have.text", "inxdev\\TR10")
  })
})

describe("Can Transition Workflow", function () {
  it('Submits event & transitions workflow', function () {
    cy.login();
    cy.visit('/InControl/EventDetails')
    cy.get('#EventTypeId').select('SHE - Incident')
    cy.get('#EventSubTypeId').select('Environment')

    cy.get('#ShortObservation').type("I noticed a strong gravitational pull towards the big can")
    cy.get('#DetailedObservation').type("The can is so large it's starting to exhibit behaviour similar to the sun in terms of gravity and radiation not its ability to sustain life")
    cy.get("#_ClassValueId").clear().type('1.01 Administration')
    cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true })

    cy.get('#eventCustomFields > .form-group > .k-widget > .k-dropdown-wrap > .k-input', { timeout: 20000 }).type('Site Administration Office')
    cy.get('#ChangedActualOutcomeID').select('Catastrophic')
    cy.get('#ChangedPotentialConsequenceID').select('Catastrophic')
    cy.get('#ChangedPotentialLikelihoodID').select('Almost Certain')

    cy.get('#submitButton').click()

    //Assign
    cy.server()
    cy.route('POST', '**/InControl/EventWorkflow/TransitionEvent**').as('postTransition')
    cy.get('#SelectedWorkflowStep').select('Assign to ERM')
    cy.get('#PrimaryAssignee').select('Back, Garry')
    cy.get('#workflowBtn').click()

    //Review
    cy.wait('@postTransition')
    cy.get('#SelectedWorkflowStep').scrollIntoView().select('Return For Final Review');
    cy.get('#workflowBtn').click()

    //Close
    cy.wait('@postTransition')
    cy.get('#SelectedWorkflowStep').select('Close Event')
    cy.get('#workflowBtn').click()

    //Open
    cy.wait('@postTransition')
    cy.get('#SelectedWorkflowStep').select('Re-Open Event')
    cy.get('#workflowBtn').click()

    //cancel
    cy.wait('@postTransition')
    cy.get('#SelectedWorkflowStep').select('Cancelled')
    cy.get('#workflowBtn').click()

  })
})

describe.skip("Create event report with all tabs", function () {
  before(function () {
    cy.login();
    cy.visit('/InControl')
    cy.contains("Administration").click()
    cy.get('#ctl00_ctl00_body_body_ctlAdminHome_txtSearch').type('Event Types')
    cy.contains('Event Types').click()
    cy.server();
    cy.route('POST', "**/incontrol/eventtype/geteventtypetablisting*").as('getTabList')
    cy.contains('Tabs').click()
    cy.wait('@getTabList', { timeout: 20000 })


    // Get the table
    cy.get('#EventTypeTabGrid').within(() => {
      // Get each row
      cy.get('tr').each(($row, $index, $list) => {
        // If there's no button ignore the row
        if (!$row.find('.grid-command-cell > .k-button').length)
          return;

        // Confine to within the context of the row
        cy.wrap($row).within(() => {
          if ($row.find(':nth-child(3)').text() == 'Yes')
            return;

          //Otherwise enable it
          cy.get('.grid-command-cell > .k-button').click();
          cy.get('#IsDisplayed').check()
          cy.get('.k-primary').click()
        })
      })
    })
  })

  it('Submits event & transitions workflow', function () {



  })

})
