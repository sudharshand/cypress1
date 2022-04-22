const homePortErrorMessage = 'Please specify the home port';
const lookupNameErrorMessage = 'Please enter a unique lookup name';
const workgroupErrorMessage = 'Selection required';
const genderErrorMessage = 'Please specify the gender';

const customField1 = 'Yes';
const customField2 = 'Agreement 1';
const customField3 = 'N/A';
const customField4 = 'Yes';

const fillPersonDetails = () => {
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtFirstName').type(person.firstName);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLastName').type(person.lastName);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtTitle').type(person.salutation);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPOH').select(person.firstPoh);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').type(person.networkUsername);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstEmployment').select(person.employment);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_insEmployer_btnOpenSearch > .fa').click();
    cy.selectFromEmployer('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_insEmployer_insearch_pnlSelector', person.employer);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstERT').select(person.ert);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtSupervisor_btnPeople > .fa').click();
    cy.selectFromPeople('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtSupervisor_pnlSelector', person.supervisor);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtEmployeeID').type(person.employeeId);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlBirthDate__txtDate').type(person.birthDate);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlCommenced__txtDate').type(person.commencedDate);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlCeased__txtDate').type(person.ceasedDate);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtMineHealthNumber').type(person.mineHealthNumber);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroupConsolidation_btnWorkgroups').click();
    cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroupConsolidation_wgrp_pnlSelector', person.consolidationWorkgroup);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_chkActive').check();
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPort').select(person.firstPort);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstGender').select(person.gender);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLookupName').clear().type(person.lookupName);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_btnWorkgroups > .fa').click();
    cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_wgrp_pnlSelector', person.defaultCompanyLevel);
}

const fillAdditionalInformation = () => {
    cy.get('.additionalInformationPanel > .panel-heading').click()
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__1_3').select(customField1);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__1_6').select(customField2);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__2_4').type(customField3);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__2_5').type(customField4);
}

const fillWorkContact = () => {
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_WorkContactDetails').click();
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtWorkPhone').type(person.phoneNumber);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtMobile').type(person.mobileNumber);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtFax').type(person.faxNumber);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtEmail').type(person.email);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtOnsiteContact').type(person.onsiteContact);
}

const fillEmergencyContact = () => {
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_EmergencyContactDetails > .panel > .panel-heading').click();
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKin').type(person.emergencyContactName);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextOfKinRelationship').type(person.emergencyRelationship);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinPhone').type(person.emergencyHomePhone);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinMobilePhone').type(person.emergencyMobile);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinAddress').type(person.emergencyAddress);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinSuburb').type(person.emergencySuburb);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinState').type(person.emergencyState);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinPostcode').type(person.emergencyPostCode);
}

const fillAdditionalContact = () => {
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_AdditionalContactDetails > .panel > .panel-heading').click();
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtHomePhone').type(person.additionalPhone);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtPersonalMobile').type(person.additionalMobile);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtHomeFax').type(person.additionalFax);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtOffsiteContact').type(person.additionalOffsiteContact);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressStreetName').type(person.additionalStreetName);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressSuburb').type(person.additionalSuburb);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressState').type(person.additionalState);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressPostCode').type(person.additionalPostCode);
}

const fillPersonalSettings = () => {
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_AdditionalContactDetails + div').click();
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ddlPreferredContactMethod').select(person.personalContactMethod);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroupDefault_btnWorkgroups').click();
    cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroupDefault_wgrp_pnlSelector', person.defaultCompanyLevel);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtActionNoticePeriod').type(person.actionNoticePeriod);
}

const fillMandatoryFields = () => {
    cy.visit('/InControl/PersonDetails.aspx')
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPort').select(person.firstPort);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstGender').select(person.gender);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLookupName').clear().type(person.lookupName);
    cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_btnWorkgroups > .fa').click();
    cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_wgrp_pnlSelector', person.defaultCompanyLevel);
}

const deletePersonIfExists = (name: string) => {
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

let person: any = null;
beforeEach(() => {
    cy.fixture('person.json')
        .then((personData: any) => {
            person = personData;
            cy.login('System Administrator');
            cy.viewport(1600, 1600);
            deletePersonIfExists(person.lookupName);
            deletePersonIfExists(`copy of `+ person.lookupName);
        });
});

describe ('Person', () => {
    it ('Can copy a person', () => {
        deletePersonIfExists(`copy of ${person.lastName}`);
        cy.visit('/InControl/PersonDetails.aspx');

        fillPersonDetails();
        fillAdditionalInformation();
        fillWorkContact();
        fillEmergencyContact();
        fillAdditionalContact();
        fillPersonalSettings();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtComments').type(person.comment);

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnCopyShow').click();
        cy.get('#copyPersonDialog').should('be.visible');
        cy.get('#copyPersonDialog .modal-footer > .btn-default').click();
        cy.get('#copyPersonDialog').should('not.be.visible');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnCopyShow').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtbxLookupNameForCopy').should('have.value', `copy of ${person.lookupName}`);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtbxLookupNameForCopy').clear();
        cy.get('#submitCopyPerson').click();
        cy.get('#lblCopyPersonValidationMsg').should('be.visible').and('contain.text', 'Please enter a Lookup Name.');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtbxLookupNameForCopy').type(person.lookupName);
        cy.get('#submitCopyPerson').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert').should('be.visible')
            .and('contain.text', `\n\t\t\t\tAnother person with the Lookup Name - '${person.lookupName}'  already exists.\n\t\t\t`);
        cy.visit('InControl/Persons.aspx');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtSearch').type(person.lookupName);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_btnRefresh').click();

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnCopyShow').click();

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtbxLookupNameForCopy').clear().type(`copy of ${person.lookupName}`);
        cy.get('#submitCopyPerson').click();

        cy.get('.additionalInformationPanel > .panel-heading').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_WorkContactDetails').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_EmergencyContactDetails > .panel > .panel-heading').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_AdditionalContactDetails > .panel > .panel-heading').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_AdditionalContactDetails + div').click()

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtFirstName').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLastName').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtTitle').should('have.value', person.salutation);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPOH').find(':selected').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstEmployment').find(':selected').contains(person.employment);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_insEmployer_txtInput').should('have.value', person.employer);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstERT').find(':selected').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtSupervisor_txtPeople').should('have.value', 'Aardvark, John');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtEmployeeID').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlBirthDate__txtDate').should('not.have.value', person.birthDate);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlCommenced__txtDate').should('have.value', person.commencedDate);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlCeased__txtDate').should('not.have.value', person.ceasedDate);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtMineHealthNumber').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroupConsolidation_txtWorkgroup').should('not.have.value', person.consolidationWorkgroup);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_chkActive').should('be.checked');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPort').find(':selected').contains(person.firstPort);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstGender').find(':selected').contains(person.gender);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLookupName').should('have.value', `copy of ${person.lookupName}`);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_txtWorkgroup').should('have.value', person.defaultCompanyLevel);

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__1_3').find(':selected').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__1_6').find(':selected').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__2_4').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__2_5').should('be.empty');

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtWorkPhone').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtMobile').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtFax').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtEmail').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtOnsiteContact').should('have.value', person.onsiteContact);

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKin').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextOfKinRelationship').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinPhone').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinMobilePhone').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinAddress').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinSuburb').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinState').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinPostcode').should('be.empty');

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtHomePhone').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtPersonalMobile').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtHomeFax').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtOffsiteContact').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressStreetName').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressSuburb').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressState').should('be.empty');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressPostCode').should('be.empty');

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ddlPreferredContactMethod').find(':selected').should('be.empty');

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtComments').should('contain.text', person.comment);
    });

    describe ('Lookup', () => {
        it ('Can navigate to Person Lookup page', () => {
            cy.visit('/InControl');
            cy.get('#People-expander').click();
            cy.waitUntil(() => cy.get('a[id="Add New Person-submenu"]').should('be.visible').click());
            cy.get('h1').contains('Person Lookup');
        });

        it ('Displays People with existing profiles', () => {
            cy.visit('/InControl/PersonLookup.aspx');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonLookup_txtName').type('tr10');
            cy.get('#refreshButton').click();
            cy.contains('TR10').should('be.visible');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonLookup_btnNew').should('be.visible');
        });

        it ('Does not display Non-existent profiles', () => {
            cy.visit('/InControl/PersonLookup.aspx');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonLookup_txtName').type('kasjdfk2391je');
            cy.get('#refreshButton').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonLookup_alertPanel_alert[class*="alert-info"]').should('be.visible').and('contains.text', 'No matches found with the name entered');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonLookup_btnNew').should('be.visible');
        });
    });
});

describe ('Deletion', () => {
    it ('Can delete a person', () => {
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.visit('/InControl/Persons.aspx');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_txtSearch').type(person.firstName);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1 > tbody').should('not.exist');
    });

    it ('Can delete a profile photo', () => {
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#expandFile').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_inpFile').attachFile( { filePath: 'profile.jpg' });
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnUpload').click();
        cy.get('#expandFile').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnRemove').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert').contains('Photo removed successfully.');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_DownloadPhoto > img').should('not.be.exist');
    });
});

describe ('Reading', () => {
    it ('Printer friendly window opens', () => {
        cy.visit('/InControl/PersonDetails.aspx', {
            onBeforeLoad(win) {
                cy.stub(win, 'open');
            }
        });
        cy.get('.page-header').contains('Person Details');
        cy.get('.printer-friendly').click();
        cy.window().its('open').should('be.called');
    });

    it ('Hides information panels', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        cy.get('[class*="additionalInformationPanel"] > .panel-body').should('not.be.visible');
        cy.get('[class*="inx-personeditable"] > .panel-body').should('not.be.visible');
        cy.get('#personDetailsPanel > .panel-body').should('be.visible');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_rowAddPhoto').should('be.visible');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtComments').should('be.visible');
    });

    it ('cannot read comments when logged in as reader', () => {
        cy.login('Reader');
        cy.visit('/InControl');
        cy.get('#People-menu').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtComments').should('not.exist');
    });
});

describe ('Creation', () => {
    it ('Does not allow duplicate lookup names', () => {
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert[class*="alert-success"]').should('be.visible').and('contain.text', 'Person updated successfully');
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert')
            .contains('Another person with the same Lookup Name already exists.')
            .and('contain.text', 'Please choose a different Lookup Name');
    });

    it ('Does not allow duplicate network usernames', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPort').select(person.firstPort);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstGender').select(person.gender);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_btnWorkgroups > .fa').click();
        cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_wgrp_pnlSelector', person.defaultCompanyLevel);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').type(person.networkUsername);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLookupName').clear().type(`${person.lookupName}A`);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert[class*="alert-success"]').should('be.visible').and('contain.text', 'Person updated successfully');

        cy.visit('/InControl/PersonDetails.aspx');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPort').select(person.firstPort);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstGender').select(person.gender);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_btnWorkgroups > .fa').click();
        cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_wgrp_pnlSelector', person.defaultCompanyLevel);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').type(person.networkUsername);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLookupName').clear().type('TestLookupName4321');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert')
            .contains('A person profile already exists with the current username');
    });

    it ('Creates a person with all person details fields completed', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        fillPersonDetails();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert[class*="alert-success"]').should('be.visible').and('contain.text', 'Person updated successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtFirstName').should('have.value', person.firstName);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLastName').should('have.value', person.lastName);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtTitle').should('have.value', person.salutation);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPOH').find(':selected').contains(person.firstPoh);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtUsername').should('have.value', person.networkUsername);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstEmployment').find(':selected').contains(person.employment);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_insEmployer_txtInput').should('have.value', person.employer);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstERT').find(':selected').contains(person.ert);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtSupervisor_txtPeople').should('have.value', person.supervisor);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtEmployeeID').should('have.value', person.employeeId);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlBirthDate__txtDate').should('have.value', person.birthDate);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlCommenced__txtDate').should('have.value', person.commencedDate);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlCeased__txtDate').should('have.value', person.ceasedDate);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtMineHealthNumber').should('have.value', person.mineHealthNumber);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroupConsolidation_txtWorkgroup').should('have.value', person.consolidationWorkgroup);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_chkActive').should('be.checked');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPort').find(':selected').contains(person.firstPort);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstGender').find(':selected').contains(person.gender);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLookupName').should('have.value', person.lookupName);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_txtWorkgroup').should('have.value', person.defaultCompanyLevel);
    });

    it ('Creates a person with additional information completed', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        fillMandatoryFields();
        fillAdditionalInformation();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('[class*="additionalInformationPanel"]').click();
        cy.wait(2000);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__1_3').find(':selected').contains(customField1);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__1_6').find(':selected').contains(customField2);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__2_4').should('have.value', customField3);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtCustomFields__2_5').should('have.value', customField4);
    });

    it ('Creates a person with work contact details completed', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        fillMandatoryFields();
        fillWorkContact();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_WorkContactDetails').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtWorkPhone').should('have.value', person.phoneNumber);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtMobile').should('have.value', person.mobileNumber);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtFax').should('have.value', person.faxNumber);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtEmail').should('have.value', person.email);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtOnsiteContact').should('have.value', person.onsiteContact);
    });

    it ('Creates a person with emergency contact details completed', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        fillMandatoryFields();
        fillEmergencyContact();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_EmergencyContactDetails > .panel > .panel-heading').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKin').should('have.value', person.emergencyContactName);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextOfKinRelationship').should('have.value', person.emergencyRelationship);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinPhone').should('have.value', person.emergencyHomePhone);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinMobilePhone').should('have.value', person.emergencyMobile);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinAddress').should('have.value', person.emergencyAddress);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinSuburb').should('have.value', person.emergencySuburb);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinState').should('have.value', person.emergencyState);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtNextofKinPostcode').should('have.value', person.emergencyPostCode);
    });

    it ('Creates a person with additional contact details completed', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        fillMandatoryFields();
        fillAdditionalContact();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_AdditionalContactDetails > .panel > .panel-heading').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtHomePhone').should('have.value', person.additionalPhone);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtPersonalMobile').should('have.value', person.additionalMobile);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtHomeFax').should('have.value', person.additionalFax);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtOffsiteContact').should('have.value', person.additionalOffsiteContact);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressStreetName').should('have.value', person.additionalStreetName);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressSuburb').should('have.value', person.additionalSuburb);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressState').should('have.value', person.additionalState);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtAddressPostCode').should('have.value', person.additionalPostCode);
    });

    it ('Creates a person with personal settings completed', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        fillMandatoryFields();
        fillPersonalSettings();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_AdditionalContactDetails + div').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ddlPreferredContactMethod').find(':selected').contains(person.personalContactMethod);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroupDefault_txtWorkgroup').should('have.value', '1.00 General Management');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtActionNoticePeriod').should('have.value', person.actionNoticePeriod);
    });

    it ('Creates a person with comments completed', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtComments').type(person.comment);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtComments').should('have.value', person.comment);
    });

    it ('Creates a person if mandatory fields are completed', () => {
        cy.visit('/InControl/PersonDetails.aspx');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();

        cy.get('#valPort').should('be.visible').and('contain.text', homePortErrorMessage);
        cy.get('#valGender').should('be.visible').and('contain.text', genderErrorMessage);
        cy.get('#valLookupName').should('be.visible').and('contain.text', lookupNameErrorMessage);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup > .error').should('be.visible').and('contain.text', workgroupErrorMessage);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstPort').select(person.firstPort);

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#valPort').should('not.be.visible');
        cy.get('#valGender').should('be.visible').and('contain.text', genderErrorMessage);
        cy.get('#valLookupName').should('be.visible').and('contain.text', lookupNameErrorMessage);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup > .error').should('be.visible').and('contain.text', workgroupErrorMessage);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_lstGender').select(person.gender);

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#valPort').should('not.be.visible');
        cy.get('#valGender').should('not.be.visible');
        cy.get('#valLookupName').should('be.visible').and('contain.text', lookupNameErrorMessage);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup > .error').should('be.visible').and('contain.text', workgroupErrorMessage);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_txtLookupName').type(person.lookupName);

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#valPort').should('not.be.visible');
        cy.get('#valGender').should('not.be.visible');
        cy.get('#valLookupName').should('not.be.visible');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup > .error').should('be.visible').and('contain.text', workgroupErrorMessage);

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_btnWorkgroups > .fa').click();
        cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlWorkgroup_wgrp_pnlSelector', person.defaultCompanyLevel);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert').should('be.visible').and('contain.text', 'Person updated successfully.');
    });

    const validProfileImages: string[] = [ 'profile.jpeg', 'profile.jpg', 'profile.gif', 'profile.png'];
    validProfileImages.forEach((file) => {
        it (`Can attach ${file} as a profile photo`, () => {
            fillMandatoryFields();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
            cy.get('#expandFile').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_inpFile').attachFile( { filePath: file });
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnUpload').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_DownloadPhoto > img').should('be.visible');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert').should('contain.text', 'Photo updated successfully');
            cy.get('#addPhoto').should('not.be.visible');
            //cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_DownloadPhoto').its('href').should('not.contain.text', 'Streamer.ashx');
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_DownloadPhoto').should('have.attr', 'href')
            .then((href) => expect(href).to.not.contain('Streamer.ashx'))
        });
    });

    const invalidProfileImages: string[] = ['dummy.txt', 'dummy.docx'];
    invalidProfileImages.forEach((file) => {
        it (`Should not attach ${file} as a profile photo`, () => {
            fillMandatoryFields();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
            cy.get('#expandFile').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_inpFile').attachFile( { filePath: file });
            cy.on('uncaught:exception', () => false);
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnUpload').click();
            cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_DownloadPhoto > img').should('not.be.visible');
            cy.get('#valInputFile').should('be.visible').and('contain.text', 'Sorry, You can only upload images of type .jpg/.jpeg/.gif/.png/.bmp');
        });
    });


    it ('Unable to set Date Commended before Date Ceased', () => {
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlCommenced__txtDate').type('11-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_ctrlCeased__txtDate').type('09-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#valCeased').should('be.visible').and('contain.text', 'Date must be on or after 11-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_alertPanel_alert').should('not.be.visible');
    });

});
describe ('Health', () => {
    beforeEach(() => {
        cy.login();
        deletePersonIfExists(person.firstName);
    });

    it (`Can add, edit and delete health`, () => {
        const eventName = 'Loremipsumdolorsitametconsectetueradipiscingelitaeneancommodoligulaloremipsum';
        const expectedEventName = eventName.substring(0, 50);
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#Health-tab').click();

        // Create new record
        cy.get('.k-plus').click()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnAdd').click();
        cy.get('#valAddEventDate').should('contain.text', 'Please enter a date');
        cy.get('#valAddName').should('contain.text', 'Please enter the event name');

        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_ctrlAddEventDate__txtDate').type('13-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtAddName').type(eventName);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtAddDescription').type('My event description');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnAdd').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('contain.text', 'Event added successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1 > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', '13-May-2010');
            cy.get('td:nth-child(3)').should('contain.text', expectedEventName);
            cy.get('td:nth-child(4)').should('contain.text', 'My event description');
        });

        // Update record but don't save.
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnEdit').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_ctrlEventDate__txtDate').clear().type('15-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtName').clear().type('My Updated Event Name');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtDescription').clear().type('My updated event description');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnCancel').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1 > tbody > tr.gridRow.inx-row-alt:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', '13-May-2010');
            cy.get('td:nth-child(3)').should('contain.text', expectedEventName);
            cy.get('td:nth-child(4)').should('contain.text', 'My event description');
        });

        // Update record and save.
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnEdit').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_ctrlEventDate__txtDate').clear().type('15-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtName').clear().type('My Updated Event Name');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_txtDescription').clear().type('My updated event description');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnUpdate').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('contain.text', 'Event updated successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1 > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', '15-May-2010');
            cy.get('td:nth-child(3)').should('contain.text', 'My Updated Event Name');
            cy.get('td:nth-child(4)').should('contain.text', 'My updated event description');
        });

        // Add another record.
        cy.get('.k-plus').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl03_ctrlAddEventDate__txtDate').type('23-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl03_txtAddName').type('Second Event Name');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl03_txtAddDescription').type('Second event description');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl03_btnAdd').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('contain.text', 'Event added successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1 > tbody > tr:nth-child(2)').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', '23-May-2010');
            cy.get('td:nth-child(3)').should('contain.text', 'Second Event Name');
            cy.get('td:nth-child(4)').should('contain.text', 'Second event description');
        });

        cy.once('window:confirm', () => false);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl03_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1 > tbody').find('tr').should('have.length', 2);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl03_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('contain.text', 'Event deleted successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1 > tbody').find('tr').should('have.length', 1);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_DataGrid1_ctl02_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_alertPanel_alert').should('contain.text', 'Event deleted successfully');
    });
});

describe ('Compliance', () => {
    beforeEach(() => {
        cy.login();
        deletePersonIfExists(person.firstName);
    });

    it (`Can add, edit and delete compliance`, () => {
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#Compliance-tab').click();

        // Add a record.
        cy.get('#add-compliance').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl02_btnAdd').click();
        cy.get('#valComplianceSearch').should('contain.text', 'Please choose a Compliance');
        cy.get('#valAddComplianceDate').should('contain.text', 'Please enter a date');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl02_cubeComplianceSearch_btnOpenSearch').click();
        cy.selectFromCompliance('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl02_cubeComplianceSearch_insearch_pnlSelector', 'Degree (Expiry in 99.00 years)');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl02_ctrlAddComplianceDate__txtDate').type('23-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl02_txtAddComments').type('Compliance comment');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl02_chkAddRenewed').check();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl02_txtAddReferenceID').type('12345');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl02_btnAdd').click();
        //cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_alertPanel_alert').should('contain.text', 'Compliance added successfully');

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_chkSelected').check()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_chkSelected').check();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', 'Degree (Expiry in 99.00 years)');
            cy.get('td:nth-child(3)').should('contain.text', '23-May-2010');
            cy.get('td:nth-child(4)').should('contain.text', 'Compliance comment');
            cy.get('td:nth-child(5)').should('contain.text', 'Yes');
            cy.get('td:nth-child(6)').should('contain.text', 'No');
            cy.get('td:nth-child(7)').should('contain.text', '12345');
        });

        // Add a duplicate.
        cy.get('#add-compliance').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_btnAdd').click();
        cy.get('#valComplianceSearch').should('contain.text', 'Please choose a Compliance');
        cy.get('#valAddComplianceDate').should('contain.text', 'Please enter a date');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_cubeComplianceSearch_btnOpenSearch').click();
        cy.selectFromCompliance('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_cubeComplianceSearch_insearch_pnlSelector', 'Degree (Expiry in 99.00 years)');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_ctrlAddComplianceDate__txtDate').type('23-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_txtAddComments').type('Compliance comment');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_chkAddRenewed').check();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_txtAddReferenceID').type('12345');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_btnAdd').click();
        //cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_alertPanel_alert').should('contain.text', 'Compliance added successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_chkSelected').check()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_chkSelected').check();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', 'Degree (Expiry in 99.00 years)');
            cy.get('td:nth-child(3)').should('contain.text', '23-May-2010');
            cy.get('td:nth-child(4)').should('contain.text', 'Compliance comment');
            cy.get('td:nth-child(5)').should('contain.text', 'Yes');
            cy.get('td:nth-child(6)').should('contain.text', 'No');
            cy.get('td:nth-child(7)').should('contain.text', '12345');
        });

        // Update record without saving.
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_btnEdit').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_ctrlComplianceDate__txtDate').clear().type('25-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_txtComments').clear().type('Updated compliance comment');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_chkRenewed').uncheck();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_txtReferenceID').clear().type('54321');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_btnCancel').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', 'Degree (Expiry in 99.00 years)');
            cy.get('td:nth-child(3)').should('contain.text', '23-May-2010');
            cy.get('td:nth-child(4)').should('contain.text', 'Compliance comment');
            cy.get('td:nth-child(5)').should('contain.text', 'Yes');
            cy.get('td:nth-child(6)').should('contain.text', 'No');
            cy.get('td:nth-child(7)').should('contain.text', '12345');
        });

        // Update record and save.
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_btnEdit').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_ctrlComplianceDate__txtDate').clear().type('25-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_txtComments').clear().type('Updated compliance comment');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_chkRenewed').uncheck();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_txtReferenceID').clear().type('54321');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_btnUpdate').click();
        //cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_alertPanel_alert').should('contain.text', 'Compliance updated successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_chkSelected').check()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid > tbody').find('tr').should('have.length', 2);

        // Add another record.
        cy.get('#add-compliance').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl04_cubeComplianceSearch_btnOpenSearch').click();
        cy.selectFromCompliance('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl04_cubeComplianceSearch_insearch_pnlSelector', 'GSDU (Expiry in 1.00 year)');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl04_ctrlAddComplianceDate__txtDate').type('11-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl04_txtAddComments').type('New comment');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl04_chkAddRenewed').check();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl04_txtAddReferenceID').type('93242');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl04_btnAdd').click();
        //cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_alertPanel_alert').should('contain.text', 'Compliance added successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_chkSelected').check()
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid > tbody > tr:nth-child(3)').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', 'GSDU (Expiry in 1.00 year)');
            cy.get('td:nth-child(3)').should('contain.text', '11-May-2010');
            cy.get('td:nth-child(4)').should('contain.text', 'New comment');
            cy.get('td:nth-child(5)').should('contain.text', 'Yes');
            cy.get('td:nth-child(6)').should('contain.text', 'No');
            cy.get('td:nth-child(7)').should('contain.text', '93242');
        });

        cy.once('window:confirm', () => false);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl04_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid > tbody').find('tr').should('have.length', '3');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl04_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_alertPanel_alert').should('contain.text', 'Compliance deleted successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid > tbody').find('tr').should('have.length', '2');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl03_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_PersonComplianceGrid_ctl02_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonCompliances_alertPanel_alert').should('contain.text', 'Compliance deleted successfully');
    });
});

describe ('Attachments', () => {
    beforeEach(() => {
        cy.login();
        deletePersonIfExists(person.firstName);
    });

    it (`Can add, edit and delete attachments`, () => {
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#Attachments-tab').click();

        // Add a record with a file attachment.
        cy.get('#add-attachment').click();
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_btnAdd').click();
        cy.get('#valAddDescription').should('contain.text', 'Please enter a Description');
        cy.get('#valAddAttachmentDate').should('contain.text', 'Please enter a date');
        cy.get('#valAddDocument').should('contain.text', 'Please upload a document or enter a URL');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_txtAddDescription').type('Test description');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_ctrlAddAttachmentDate__txtDate').type('12-May-2010');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_ctrlAddDocument__rdoFileType_0').check();
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_ctrlAddDocument__inpFile').attachFile( { filePath: 'profile.bmp' });
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_btnAdd').click();
        cy.get('#ctl00_ctl00_body_body_alertPanel_alert').should('contain.text', 'Attachment saved successfully');
        cy.get('#ctl00_ctl00_body_body_DataGrid1 > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', 'Test description');
            cy.get('td:nth-child(3)').should('contain.text', '12-May-2010');
            cy.get('td:nth-child(4)').should('contain.text', 'profile.bmp');
            cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_DownloadAttachmentLink').should('be.visible');
        });

        // Update a record without saving.
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_btnEdit').click();
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_txtDescription').clear().type('Updated description');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_ctrlAttachmentDate__txtDate').clear().type('15-May-2010');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_ctrlDocument__inpFile').attachFile( { filePath: 'profile.png'});
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_btnCancel').click();
        cy.get('#ctl00_ctl00_body_body_DataGrid1 > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', 'Test description');
            cy.get('td:nth-child(3)').should('contain.text', '12-May-2010');
            cy.get('td:nth-child(4)').should('contain.text', 'profile.bmp');
            cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_DownloadAttachmentLink').should('be.visible');
        });

        // Update a record and save.
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_btnEdit').click();
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_txtDescription').clear().type('Updated description');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_ctrlAttachmentDate__txtDate').clear().type('15-May-2010');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_ctrlDocument__inpFile').attachFile( { filePath: 'profile.png'});
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_btnUpdate').click();
        cy.get('#ctl00_ctl00_body_body_alertPanel_alert').should('contain.text', 'Attachment saved successfully');
        cy.wait(500);
        cy.get('#ctl00_ctl00_body_body_DataGrid1 > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', 'Updated description');
            cy.get('td:nth-child(3)').should('contain.text', '15-May-2010');
            cy.get('td:nth-child(4)').should('contain.text', 'profile.png');
        });

        // Add another record using a URL link.
        cy.get('#add-attachment').click();
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl03_txtAddDescription').type('Test description 2');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl03_ctrlAddAttachmentDate__txtDate').type('19-May-2010');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl03_ctrlAddDocument__rdoFileType_1').check();
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl03_ctrlAddDocument__txtURL').type('https://www.inxsoftware.com/ResourcePackages/Bootstrap4/assets/images/logo-colour.png');
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl03_btnAdd').click();

        cy.get('#ctl00_ctl00_body_body_DataGrid1 > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', 'Test description 2');
            cy.get('td:nth-child(3)').should('contain.text', '19-May-2010');
            cy.get('td:nth-child(4)').should('contain.text', 'https://www.inxsoftware.com/ResourcePackages/Bootstrap4/assets/images/logo-colour.png');
            cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_DocumentUrl').should('have.attr', 'href')
                .then((href) => expect(href).to.contain('https://www.inxsoftware.com/ResourcePackages/Bootstrap4/assets/images/logo-colour.png'));
        });

        cy.once('window:confirm', () => false);
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl03_btnDelete').click();
        cy.get('#ctl00_ctl00_body_body_DataGrid1 > tbody').find('tr').should('have.length', 2);
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl03_btnDelete').click();
        cy.get('#ctl00_ctl00_body_body_alertPanel_alert').should('contain.text', 'Person Attachment deleted successfully');
        cy.get('#ctl00_ctl00_body_body_DataGrid1 > tbody').find('tr').should('have.length', 1);
        cy.get('#ctl00_ctl00_body_body_DataGrid1_ctl02_btnDelete').click();
        cy.get('#ctl00_ctl00_body_body_alertPanel_alert').should('contain.text', 'Person Attachment deleted successfully');
    });
})

describe ('Workgroups', () => {
    beforeEach(() => {
        cy.login();
        deletePersonIfExists(person.firstName);
    });

    it ('Can add, edit and delete workgroups', () => {
        fillMandatoryFields();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonDetails_btnSave').click();
        cy.get('#Workgroups-tab').click();

        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups > tbody').find('tr').should('have.length', 1);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', '1.00 General Management');
            cy.get('td:nth-child(3)').should('contain.text', '01-Jan-1900');
        });

        // Test add record validation
        cy.get('#add-workgroup-history').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl03_btnAdd').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_alertPanel_alert').should('contain.text', 'Could not add record, please select a Workgroup');

        // Add a new workgroup.
        cy.get('#add-workgroup-history').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl03_ctrlAddWorkgroup_btnWorkgroups').click();
        cy.selectFromWorkgroup('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl03_ctrlAddWorkgroup_wgrp_pnlSelector', '1.01 Administration');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl03_ctrlAddEffectiveDate__txtDate').clear().type('15-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl03_btnAdd').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_alertPanel_alert').should('contain.text', 'Workgroup History item added successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', '1.01 Administration');
            cy.get('td:nth-child(3)').should('contain.text', '15-May-2010');
        });

        // Update a workgroup without saving.
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl02_btnEdit').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl02_ctrlEffectiveDate__txtDate').clear().type('20-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl02_btnCancel').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', '1.01 Administration');
            cy.get('td:nth-child(3)').should('contain.text', '15-May-2010');
        });

        // Update a workgroup with saving.
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl02_btnEdit').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl02_ctrlEffectiveDate__txtDate').clear().type('20-May-2010');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl02_btnUpdate').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_alertPanel_alert').should('contain.text', 'Workgroup History item updated successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups > tbody > tr:first-child').within(() => {
            cy.get('td:nth-child(2)').should('contain.text', '1.01 Administration');
            cy.get('td:nth-child(3)').should('contain.text', '20-May-2010');
        });

        // Delete workgroups.
        cy.once('window:confirm', () => false);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl03_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups > tbody').find('tr').should('have.length', 2);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl03_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_alertPanel_alert').should('contain.text', 'Workgroup History item deleted successfully');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups > tbody').find('tr').should('have.length', 1);
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups_ctl02_btnDelete').click();
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_alertPanel_alert').should('contain.text', 'ERROR - Person must have a current Workgroup, cannot delete');
        cy.get('#ctl00_ctl00_ctl00_body_body_body_PersonWorkgroupHistory_dgWorkgroups > tbody').find('tr').should('have.length', 1);
    });
});
