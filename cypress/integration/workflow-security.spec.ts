import { HandbagData } from "../fixtures/handbag-data"
import { Role, Step, Access } from "../fixtures/workflow-types"

const tabFormIsWriteable = function (tabName : string) {
    cy.wait(500)

    cy.get(`#${tabName}`).click()
    switch (tabName) {
        case "EventDetails":
            cy.get(`#eventDetailsReadonly`).should('not.exist')
            cy.get(`#saveButton`).should('exist')
            cy.get(`#deleteButton`).should('exist')
            break
        case "EventActions":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnAddAction`).should('exist')
            cy.get(`.k-icon.k-edit`).should('exist')
            break
        case "EventDocuments":
            cy.get(`#Description`).should('exist')
            break
        case "EventEquipments":
            cy.get(`#AddEquipmentButton`).should('be.visible')
            cy.get(`.k-icon.k-delete`).should('exist')
            break;
        case "EventKeywords":
            cy.get(`#saveButton`).should('exist')
            cy.get(`.k-checkbox-wrapper input`).should('not.be.disabled')
            break;
        case "EventCauses":
            cy.get(`.k-button.k-button-icontext.k-grid-edit`).should('exist')
            break;
        case "EventNotifications":
            cy.get(`.k-icon.k-edit`).should('exist')
            cy.get(`.k-icon.k-delete`).should('exist')
            cy.get(`.k-icon.k-plus.inx-add-record`).should('exist')
            break;
        case "EventInvestigations":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).should('exist')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDelete`).should('exist')
            break;
        case "EventEnvironmentalImpacts":
            cy.get(`.k-icon.k-edit`).should('exist')
            cy.get(`.k-icon.k-delete`).should('exist')
            cy.get(`.k-icon.k-plus.inx-add-record`).should('exist')
            break;
        case "EventInjuries":
            cy.get(`.k-icon.k-edit`).should('exist')
            cy.get(`.k-icon.k-delete`).should('exist')
            cy.get(`.k-icon.k-plus.inx-add-record`).should('exist')
            break;
        case "EventHazards":
            break;
        case "EventParticipants":
            cy.get(`.k-icon.k-edit`).should('exist')
            cy.get(`.k-icon.k-delete`).should('exist')
            cy.get(`.k-icon.k-plus.inx-add-record`).should('exist')
            break;
        case "EventChecklist":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSaveItems`).should('exist')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDeleteChecklist`).should('exist')
            break;
        case "EventCosting":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).should('exist')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDelete`).should('exist')
            break;
        case "EventFireExplosions":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).should('exist')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDelete`).should('exist')
            break;
        case "EventMotorVehicles":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).should('exist')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDelete`).should('exist')
            break;
        case "EventWeathers":
            cy.get(`#btnSave`).should('exist')
            cy.get(`#btnDelete`).should('exist')
            break;
        case "EventMarines":
            cy.get(`#btnAdd`).should('exist')
            cy.get(`.k-button.k-grid-details.command-button`).should('exist')
            cy.get(`.k-button.k-grid-delete.command-button`).should('exist')
            break;
        case "EventRegisterItems":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_ddlRegister`).should('exist')
            break;
        case "RiskAssessment":
            cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlRegisterLevelCreate').should('not.be.disabled')
            break;
        case "RelatedEvents":
            cy.get(`.k-icon.k-edit`).should('exist')
            cy.get(`.k-icon.k-delete`).should('exist')
            cy.get(`.k-icon.k-plus.inx-add-record`).should('exist')
            break;
        case "EventCloseOut":
            break;
        case "EventGeocode":
            break;
        case "EventFindings":
            cy.get(`.k-icon.k-edit`).should('exist')
            cy.get(`.k-icon.k-delete`).should('exist')
            cy.get(`.k-icon.k-plus.inx-add-record`).should('exist')
            break;
        case "EventInsurance":
            break;
        case "EventPdfForms":
            cy.get(`#btnAddPdfForm`).should('exist')
            break;
        case "EventObligationConditions":
            break;
        default:
            break;
    }

}

// const tabFormIsReadOnly = function (tabName : string, roleName : string) {
//     cy.wait(500)

//     cy.get(`#${tabName}`).click()
//     switch (tabName) {
//         case "EventDetails":
//             cy.get(`#eventDetailsReadonly`).should('exist')
//             cy.get(`#saveButton`).should('not.exist')
//             cy.get(`#deleteButton`).should('not.exist')
//             break
//         case "EventActions":
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnAddAction`).should('not.exist')
//             roleName === "Event Actionee" ?  cy.get(`.k-icon.k-edit`).should('exist') :
//                                         cy.get(`.k-icon.k-edit`).should('not.exist')
//             break
//         case "EventDocuments":
//             cy.get(`#Description`).should('not.exist')
//             break
//         case "EventEquipments":
//             cy.get(`#AddEquipmentButton`).should('not.be.visible')
//             cy.get(`.k-icon.k-delete`).should('not.exist')
//             break;
//         case "EventKeywords":
//             cy.get(`#saveButton`).should('not.exist')
//             cy.get(`.k-checkbox-wrapper input`).should('be.disabled')
//             break;
//         case "EventCauses":
//             cy.get(`.k-button.k-button-icontext.k-grid-edit`).should('not.exist')
//             break;
//         case "EventNotifications":
//             cy.get(`.k-icon.k-edit`).should('not.exist')
//             cy.get(`.k-icon.k-delete`).should('not.exist')
//             cy.get(`.k-icon.k-plus.inx-add-record`).should('not.exist')
//             break;
//         case "EventInvestigations":
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).should('not.exist')
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDelete`).should('not.exist')
//             break;
//         case "EventEnvironmentalImpacts":
//             cy.get(`.k-icon.k-edit`).should('not.exist')
//             cy.get(`.k-icon.k-delete`).should('not.exist')
//             cy.get(`.k-icon.k-plus.inx-add-record`).should('not.exist')
//             break;
//         case "EventInjuries":
//             cy.get(`.k-icon.k-edit`).should('not.exist')
//             cy.get(`.k-icon.k-delete`).should('not.exist')
//             cy.get(`.k-icon.k-plus.inx-add-record`).should('not.exist')
//             break;
//         case "EventHazards":
//             break;
//         case "EventParticipants":
//             cy.get(`.k-icon.k-edit`).should('not.exist')
//             cy.get(`.k-icon.k-delete`).should('not.exist')
//             cy.get(`.k-icon.k-plus.inx-add-record`).should('not.exist')
//             break;
//         case "EventChecklist":
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSaveItems`).should('not.exist')
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDeleteChecklist`).should('not.exist')
//             break;
//         case "EventCosting":
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).should('not.exist')
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDelete`).should('not.exist')
//             break;
//         case "EventFireExplosions":
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).should('not.exist')
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDelete`).should('not.exist')
//             break;
//         case "EventMotorVehicles":
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).should('not.exist')
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnDelete`).should('not.exist')
//             break;
//         case "EventWeathers":
//             cy.get(`#btnSave`).should('not.exist')
//             cy.get(`#btnDelete`).should('not.exist')
//             break;
//         case "EventMarines":
//             cy.get(`#btnAdd`).should('not.exist')
//             cy.get(`.k-button.k-grid-details.command-button`).should('not.exist')
//             cy.get(`.k-button.k-grid-delete.command-button`).should('not.exist')
//             break;
//         case "EventRegisterItems":
//             cy.get(`#ctl00_ctl00_ctl00_body_body_body_ddlRegister`).should('not.exist')
//             break;
//         case "RiskAssessment":
//             roleName === "Moderator" || roleName === "Event Actionee" ?
//                     cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlRegisterLevelCreate').should('not.be.disabled') :
//                     cy.get('#ctl00_ctl00_ctl00_body_body_body_ddlRegisterLevelCreate').should('be.disabled')
//             break;
//         case "RelatedEvents":
//             cy.get(`.k-icon.k-edit`).should('not.exist')
//             cy.get(`.k-icon.k-delete`).should('not.exist')
//             cy.get(`.k-icon.k-plus.inx-add-record`).should('not.exist')
//             break;
//         case "EventCloseOut":
//             break;
//         case "EventGeocode":
//             break;
//         case "EventFindings":
//             cy.get(`.k-icon.k-edit`).should('not.exist')
//             cy.get(`.k-icon.k-delete`).should('not.exist')
//             cy.get(`.k-icon.k-plus.inx-add-record`).should('not.exist')
//             break;
//         case "EventInsurance":
//             break;
//         case "EventPdfForms":
//             cy.get(`#btnAddPdfForm`).should('not.exist')
//             break;
//         case "EventObligationConditions":
//             break;
//         default:
//             break;
//     }

//}

const tabFormFiller = function (tabName : string) {
    cy.get(`#${tabName}`).click()

    switch (tabName) {
        case "EventActions":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnAddAction`).click()
            cy.get(`#ActionDecoded`, { timeout: 25000}).type("do the thing", { force: true})
            cy.get(`#Completed`, { timeout: 25000}).type(Cypress.moment().format('DD-MMM-YYYY'), { force: true})
            cy.get(`#_ResponsiblePersonLinkText`).type('InC TA2 Event Actionee')
            cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true })
            cy.get(`#saveButton`).click()
            cy.get(`#closeButton`).click()
            break
        case "EventDocuments":
            cy.get(`#Description`).type("doc description")
            cy.get('[type="radio"]').check('URL')
            cy.get(`#Url`).type("www.url.com")
            cy.get(`#AddURLButton`).click()
            break
        case "EventEquipments":
            cy.get(`#AddEquipmentButton`).click()
            cy.get('span.k-widget.k-dropdown.mandatory.inx-dropdownlist:first > span > span.k-input', { timeout: 20000 }).type('Electrical').click()
            cy.get(`#AssetNumber`).type('1')
            cy.get('span.k-widget.k-dropdown.mandatory.inx-dropdownlist > span > span.k-input', { timeout: 20000 }).eq(1).type('Drill').click()
            cy.get(`#saveButton`).click()
            break;
        case "EventKeywords":
            cy.get('.k-top > .k-checkbox-wrapper > input').first().check()
            cy.get(`#saveButton`).click()
            break;
        case "EventCauses":
            cy.get(`#treelist > table > tbody > tr:nth-child(1) > td.grid-command-cell.k-command-cell > button`).click()
            cy.get(`#treelist > table > tbody > tr.k-treelist-group.k-grid-edit-row > td:nth-child(2) > input`).check()
            cy.get(`.k-button.k-grid-update`).click()
            break;
        case "EventNotifications":
            cy.get(`.inx-add-record`).click()
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_insAddOrganisation_txtInput`).type("AAMI")
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_ctrlAddNotificationDate__txtDate`).type("11-11-2019")
            cy.get(`.k-icon.k-update`).click()
            break;
        case "EventInvestigations":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_lstTeamLeader`).select('InC TA7 Investigation Manager')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).click()
            break;
        case "EventEnvironmentalImpacts":
            cy.get(`.k-icon.k-plus.inx-add-record`).click()
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddType`).select('Air')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddMedium`).select('Air')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddMechanism`).select('Fire')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddAgency`).select('Noise')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddVolume`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddRecoveredVol`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddArea`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddNature`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddIncidentDuration`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtAddIncidentDuration`).type('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddIncidentDurationUnits`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddImpactDuration`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtAddImpactDuration`).type('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_lstAddImpactDurationUnits`).select('1')
            cy.get(`.k-icon.k-update`).click()
            break;
        case "EventInjuries":
            cy.get(`.k-icon.k-plus.inx-add-record`).click()
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_gridInjuries_ctl02_perAddInjured_txtPeople`).type('Aardvark, John')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_gridInjuries_ctl02_lstAddStaffContractor`).select('S')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_gridInjuries_ctl02_lstAddOccupationClass`).select('01')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_gridInjuries_ctl02_lstAddInjuryType`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_gridInjuries_ctl02_lstAddNature`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_gridInjuries_ctl02_lstAddMechanism`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_gridInjuries_ctl02_lstAddAgency`).select('1')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_gridInjuries_ctl02_lstAddBodyPart`).select('99')
            cy.get(`.k-icon.k-update`).click()
            break;
        case "EventHazards":
            break;
        case "EventParticipants":
            cy.get(`.k-icon.k-plus.inx-add-record`).click()
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl04_perAddParticipant_txtPeople`).clear().type('Aardvark, John')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl04_lstAddOccupationClass`).select('Crew')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl04_lstAddParticipantType`).select('Team Member')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl04_btnAdd`).click()
            break;
        case "EventChecklist":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_lstChecklist`).select('Electrical Events')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSaveChecklist`).click()
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_dgDataGrid_ctl02_rdolOptions_0`).check()
            cy.get(`#btnClose`).click()
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSaveItems`).click()
            break;
        case "EventCosting":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_lstIncidentCost`).select('$0 - $5,000')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).click()
            break;
        case "EventFireExplosions":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_ctrlStartDate__txtDate`).type("10-10-2019")
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_ctrlEndDate__txtDate`).type("11-11-2019")
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).click()
            break;
        case "EventMotorVehicles":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_txtSpeedLimit`).type("100")
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnSave`).click()
            break;
        case "EventWeathers":
            cy.get(`#AtmosphericConditionsId`).select('6')
            cy.get(`#btnSave`).click()
            break;
        case "EventMarines":
            cy.get(`#btnAdd`).click()
            cy.get(`#VesselTypeId`).select('1')
            cy.get(`#btnSave`).click()
            break;
        case "EventRegisterItems":
            break;
        case "RiskAssessment":
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_ddlRegisterLevelCreate`).select('Unspecified')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_txtReviewName`).type('automated risk review name' + Cypress.moment())
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_btnCreateRiskReview`).click()
            break;
        case "RelatedEvents":
            cy.get(`.k-icon.k-plus.inx-add-record`).click()
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_dgRelatedEvents_ctl02_ctrlAddRelatedEventsSearch_txtInput`).type("22142")
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_dgRelatedEvents_ctl02_ddlAddRelationship`).select('Peer')
            cy.get(`.k-icon.k-update`).click()
            break;
        case "EventCloseOut":
            break;
        case "EventGeocode":
            break;
        case "EventFindings":
            cy.get(`.k-icon.k-plus.inx-add-record`).click()
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_dgEventFindings_ctl02_txtAddFinding`).type('we found this extraordinary thing!')
            cy.get(`#ctl00_ctl00_ctl00_body_body_body_dgEventFindings_ctl02_ddlFindingCategory`).select('Observation')
            cy.get(`.k-icon.k-update`).click()
            break;
        case "EventInsurance":
            break;
        case "EventPdfForms":
            break;
        case "EventObligationConditions":
            break;
        default:
            break;
    }
    cy.wait(1000)
}
before(function () {
    cy.fixture('incontrol.json')
        .then((configuration) => {
            this.configuration = configuration
            Cypress.config('numTestsKeptInMemory', 0)
            Cypress.config('pageLoadTimeout', 120000)
            cy.login()
            cy.viewport(1600, 800)
        })
})

describe('handbag setup and tests', () => {

    it ("Can setup the workflow and handbag", function() {
        cy.navigateToAdminPage('Event Types')

        cy.createEventType(this.configuration.eventTypeName, this.configuration.eventCategoryName)
        cy.getEventTypeTabList()
        cy.enableAllTabsForEventType()

        cy.navigateToAdminPage('Workflow Administration')

        let workflowName = 'Automation Workflow 01' + Cypress.moment()
        cy.createWorkflow(workflowName)
        cy.addWorkflowApplicableTo(this.configuration.eventTypeName)

        cy.wait(500)
        cy.get('.alert.alert-danger').should('not.be.visible')
        cy.wait(500)
        
        cy.createWorkflowSteps()
        cy.linkWorkflowSteps()

        // handbag setup

        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtWfGUID').then(($hidden) => {
            const workflowId = $hidden.val()

            const getAllStepIds = this.configuration.workflowStep.map((item: string) => {
                return new Cypress.Promise((resolve) => {
                    cy.get(`#${item}`).then(($submittedHidden) => {
                        resolve([$submittedHidden.val(), item])
                    })
                })
            })
            
            Cypress.Promise.all(getAllStepIds).then((workflowStepIds) => {

                workflowStepIds.forEach((workflowStepId: any) => {

                    this.configuration.workflowSecurityRole.forEach((roleName: any) => {
                    let role : Role = HandbagData.Data().find((element : Role) => { return element.Name === roleName})
                    let step : Step = role.Steps.find((element : Step) => { return element.Name === workflowStepId[1]})

                        cy.visit(`InControl/WorkflowSecurityDlg.aspx?workflowid=${workflowId}&workflowstepid=${workflowStepId[0]}&rolename=${roleName}`).then(() => {
                            switch (step.Access) {
                                case Access.None:
                                    cy.get(`#gvSecurity_ctl01_chkAllNone`).check()
                                    break;
                                case Access.Read:
                                    cy.get(`#gvSecurity_ctl01_chkAllRead`).check()
                                    break;
                                case Access.Write:
                                    cy.get(`#gvSecurity_ctl01_chkAllWrite`).check()
                                    break;
                                default:
                                    break;
                            }
                            cy.get(`.halflings.halflings-floppy-disk`).click()
                            cy.wait(3000)

                        })
                    });
                });
            });
        })
    })

    it("can do the hypercube", function() {

        cy.clearCookies()

        cy.viewport(1600, 800) 
        
        // we have a few requirejs errors which only happen when run by cypress
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })

        // ta9 = submitter
        cy.login('ta9')
        cy.visit('/InControl/EventDetails')
        cy.get('#EventTypeId').select(`${this.configuration.eventCategoryName} - ${this.configuration.eventTypeName}`)
    
        cy.get('#ShortObservation').type("I noticed a strong gravitational pull towards the big can")
        cy.get('#DetailedObservation').type("The can is so large it's starting to exhibit behaviour similar to the sun in terms of gravity and radiation not its ability to sustain life")
        cy.get("#_ClassValueId").clear().type('1.01 Administration')
        cy.get('.k-animation-container > .k-list-container > .k-list-scroller > .k-list > .k-item', { timeout: 20000 }).click({ force: true })
    
        cy.get('#eventCustomFields > .form-group > .k-widget > .k-dropdown-wrap > .k-input', { timeout: 20000 }).type('Site Administration Office')
    
        cy.get('#submitButton').click()

        this.configuration.workflowAttributeTabNames.forEach((tabName : string) => {
            tabFormFiller(tabName)
        })

        cy.get(`#EventDetails`).click()

        cy.get(`#Id`).then(($Id) => {

            const rolesToTest = [ 
                { "role": "Event Approver", "username": "TA3"},
                { "role": "Event Actionee", "username": "TA2"},
                { "role": "Event Reader", "username": "TA4"},
                { "role": "Event Report Manager", "username": "TA5"},
                { "role": "Moderator", "username": "TA8"},
                { "role": "Submitter", "username": "TA9"}
            ]

            // excluded:
            // investigation manager - must be assigned
            // injury manager - role must be setup in advanced IM
            // action approver - setup required

                let stepTest = (stepName: string) => {
                 rolesToTest.forEach(roleToTest => {
                     let role = HandbagData.Data().find((element: any) => { return element.Name === roleToTest.role })

                     cy.clearCookies({ timeout: 60000 })

                     cy.login(roleToTest.username)
            //         cy.visit(`/InControl/EventDetails/${$Id.val()}`)

            //         let currentStep: Step = role.Steps.find((element: Step) => { return element.Name === stepName })

            //         cy.log(`Username: ${roleToTest.username}, role: ${role.Name}, current step: ${currentStep.Name}, access: ${currentStep.Access}`)

            //         if (currentStep.Access === Access.None) {
            //             cy.get(`.error-code`).should('contain.text', 'Event Access Denied')
            //         }
            //         else if (currentStep.Access === Access.Read) {
            //             this.configuration.workflowAttributeTabNames.forEach((tabName: string) => {
            //                 cy.get(`#${tabName}`).should('exist')
            //             })

            //             this.configuration.workflowAttributeTabNames.forEach((tabName: string) => {
            //                 tabFormIsReadOnly(tabName, role.Name)
            //             })
            //         }
            //         else if (currentStep.Access === Access.Write) {
            //             this.configuration.workflowAttributeTabNames.forEach((tabName: string) => {
            //                 cy.get(`#${tabName}`).should('exist')
            //             })

            //             if (currentStep.Name !== 'CLOSED') {
            //                 this.configuration.workflowAttributeTabNames.forEach((tabName: string) => {
            //                     tabFormIsWriteable(tabName)
            //                 })
            //             }
             //        }
                 });
             }

            stepTest("SUBMITTED")

            cy.clearCookies()
            cy.login('tr10')
            cy.visit(`/InControl/EventDetails/${$Id.val()}`)

            cy.server()
            cy.route('POST', '**/InControl/EventWorkflow/TransitionEvent**').as('postTransition')
            cy.get('#SelectedWorkflowStep').select('Assign to ERM')
            cy.get('#PrimaryAssignee').select('InC TA5 Event Report Manager')
            cy.get('#workflowBtn').click()

            stepTest("ASSIGNED")
            
            cy.clearCookies()
            cy.login('tr10')
            cy.visit(`/InControl/EventDetails/${$Id.val()}`)
            cy.wait('@postTransition')
            cy.get('#SelectedWorkflowStep').scrollIntoView().select('Return For Final Review');
            cy.get('#workflowBtn').click()
            stepTest("FINALREVIEW")
            
            cy.clearCookies()
            cy.login('tr10')
            cy.visit(`/InControl/EventDetails/${$Id.val()}`)
            cy.wait('@postTransition')
            cy.get('#SelectedWorkflowStep').select('Close Event')
            cy.get('#workflowBtn').click()
            stepTest("CLOSED")         
        })
    })

    after(() => {
        // TODO delete stuffs

    })
})
