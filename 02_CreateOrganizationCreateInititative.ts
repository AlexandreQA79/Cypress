import {
  loginAs,
  logoutNoCheck,
  visitPage,
  clickItem,
  inputText,
  clearText,
  validateText,
  validateValue,
  validateElementContainsIsVisible,
  validateElementIsVisible,
  validateElementEnabled,
  validateElementNotEnabled,
  validateUrlShouldContain,
  validateIframeContents,
  validateElementExists,
  validateElementHasAttribute,
  validateElementDoesNotHaveAttribute,
  randomNumber,
  url
} from '../../../utils/utils'

import {
  Env
} from '../../../Config'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

describe('Smoke test - Data seeding', () => {

  let fixture: any
  let userRole: any
  let initName: string

  before(() => {
      cy.fixture('SmokeFixture').then((data) => {
          fixture = data
          userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
      })
  })

  beforeEach(() => {
    loginAs(userRole.OrganizationAdministrator1)
  })

  afterEach(() => {
    logoutNoCheck()
  })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit organization page
    // 2. Create new organization with valid data
    // 3. Edit new organization and save
    // 4. Verify that edited organization is shown with updated data
    // 5. Visit organization page
    // 6. Verify that organization was created and has correct data
  it('create organization - 3CORE, CA', () => {

      const orgPage = `${url.adminHost}${url.orgPath}`
      const parentOrg = fixture.DataSeeding.AutomatedTestOrg.name
      const orgName = fixture.DataSeeding.SubOrg1.name
      const organizationContact = userRole.OrganizationAdministrator1.FullName
      const header = `[data-test-id="header-children"]`

      visitPage(orgPage)
      clickItem(CE.createOrganizationButton)
      validateElementNotEnabled(CE.saveButton)
      inputText(CE.orgName, orgName)
      validateElementEnabled(CE.saveButton)
      clickItem(CE.saveButton, 2)
      validateText(header, orgName)
      validateValue(CE.incentiveFieldName, orgName) // I used incentiveFieldName because the field name is the same here.
      validateElementIsVisible(`[data-test-id="dropdown-option-${parentOrg}"]`)
      validateUrlShouldContain('/organizations/about/')
      visitPage(orgPage)
      validateText(`[data-test-id="childCell_0_0_0"]`, orgName)
      validateText(`[data-test-id="childCell_0_0_2"]`, organizationContact)
  })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Create new organization
    // 2. Verify that 'Coming soon' page is correct
    // 3. Verify that 'Checkout' page is correct
    // 4. Verify that 'Checkout receipt" page is correct
    // 5. Verify that 'Idea submission' page is correct
    // 6. Verify that 'invite Champions' page is correct
    // 7. Verify that Multi invite in Invite Champions page is correct
    // 8. Verify that received email is correct
  it('create initiative - 3CORE, CA > Books for children', () => {
      const orgInitPage = `${url.adminHost}${url.subOrgInitPath}`
      const createInitButton = `[data-test-id="create-new-initiative-button"]`
      const initNameField = `#text-field-initiativeName`
      const initName = fixture.DataSeeding.SubOrg1.Init1.name
      const initSummary = `#text-area-summary`
      const emailSubjectDefault = fixture.ConfigureInitiativeReceiptEmailContent.emailSubjectDefault
      const subjectCharCountDefault = fixture.ConfigureInitiativeReceiptEmailContent.subjectCharCountDefault
      const email = `sergey+at.champ${randomNumber(10)}@communityfunded.com`
      const validEmailRequired = fixture.ErrorList.validEmailRequired
      const personalizedMessage = fixture.InviteManageChampions.personalizedMessage
      const emailSendConfirmation = fixture.InviteManageChampions.emailSendConfirmation
      const fundingGoal = fixture.InviteManageChampions.fundingGoal
      const participationGoal = fixture.InviteManageChampions.participationGoal

      visitPage(orgInitPage)
      clickItem(createInitButton)
      inputText(initNameField, initName)
      clickItem(CE.saveButton, 2)
      validateElementIsVisible(initSummary)

      // Validate pages
      // coming soon page
      clickItem(CE.pagesTab, 1)
      clickItem(CE.liveEventPage)
      validateElementIsVisible(CE.comingSoonPageButton)
      validateElementIsVisible(CE.formButton)
      validateElementIsVisible(CE.donorCheckoutFormPageButton)
      validateElementIsVisible(CE.donorCheckoutReceiptEmailPageButton)
      clickItem(CE.comingSoonPageButton, 1)
      validateElementIsVisible(`[data-test-id="public-link"]`)
      validateIframeContents(initName, 5)

      // checkout page
      clickItem(CE.comingSoonDropdown)
      clickItem(CE.donorCheckoutFormPageButton)
      validateIframeContents('Your Details', 3)

      // checkout receipt page
      clickItem(CE.donorCheckoutFormPageDropdown)
      clickItem(CE.donorCheckoutReceiptEmailPageButton, 2)
      validateElementIsVisible('[data-test-id="dropdown-option-Donor Checkout Receipt Email"]')
      validateValue(CE.emailSubjectField, emailSubjectDefault)
      validateText(CE.smMessage, subjectCharCountDefault)
      validateElementNotEnabled(CE.saveChangesButton)

      // Idea submission form page
      clickItem(CE.donorCheckoutReceiptEmailPageDropdown)
      clickItem(CE.formButton)
      validateElementIsVisible(CE.ideaSubmissionPageDropdown)
      validateElementNotEnabled(CE.saveChangesButton)
      validateIframeContents('Fill out the form to submit your story idea.', 3)

      // invite Champions
      clickItem(CE.newInitiative,2)
      clickItem(CE.championsButton)
      clickItem(CE.inviteChampionsButton)
      validateElementNotEnabled(CE.sendInviteButton)
      inputText(CE.inviteChampionsEmail, email)
      validateElementEnabled(CE.sendInviteButton)
      validateValue(CE.inviteChampionsEmail, email)
      inputText(CE.championPersonalizedMessage, personalizedMessage)
      clearText(CE.inviteChampionsEmail)
      validateText('body', validEmailRequired)
      inputText(CE.inviteChampionsEmail, email)
      clickItem(CE.sendInviteButton)
      validateText('body', emailSendConfirmation)

      //multi invite test
      inputText(CE.inviteChampionsEmail, email)
      validateElementEnabled(CE.sendInviteButton)
      inputText(CE.championPersonalizedMessage, personalizedMessage)
      clearText(CE.inviteChampionsEmail)
      inputText(CE.inviteChampionsEmail, `b${email}`)
      clickItem(CE.sendInviteButton)
      validateText('body', emailSendConfirmation)

      // Check Email
      cy.task("gmail:get-messages", {
          options: {
              from: "info@communityfunded.com",
              to: email,
              subject: 'You\'re invited to Champion a Cause!',
              include_body: true
          }
      })
      .then(emails => {
          assert.isAtLeast(emails ? emails.length : '', 1, "No email found!"
          );
          cy.log('Email found: ', emails.length)
          const body = emails[0].body.html;
          var el = document.createElement('html');
          el.innerHTML = body
          el.querySelector('div>a')
          const signupLink = el.querySelector('div>a')
          cy.log('The signup link is: ', signupLink ? signupLink.href : null)
          const testOutput = {
              email: email,
              signupLink: signupLink ? signupLink.href : null,
              firstName: `Jim$`,
              lastName: `Li`,
              phoneNumber: '5637273727',
              password: 'Bonjour@123',
              fundingGoal: fundingGoal,
              participationGoal: participationGoal
          }
          cy.writeFile('cypress/fixtures/generated/InviteManageChampions2.json', testOutput)

      })

  })

  it('INIT-A-01-1: Select to Create New Initiative', () => {
    const runId = Math.floor(Math.random() * 10000)
    initName = `Init - ${runId}`
    const adminName = userRole.OrganizationAdministrator1.DisplayName
    const initiativePage = `${url.adminHost}${url.subOrgInitPath}`

    visitPage(initiativePage)
    validateElementIsVisible(CE.createInitiativeButton)
    clickItem(CE.createInitiativeButton, 2)
    inputText(CE.initiativeName, initName)
    clickItem(CE.saveButton, 2)
    validateValue(CE.initiativeFieldName, initName)
    clickItem(CE.ownerButton, 2)
    validateValue(`#text-field-ownerDisplayName`, adminName)
    clickItem(CE.pagesTab, 2)
    clickItem(CE.liveEventPage, 2)
    clickItem(CE.comingSoonPageButton, 2)
    clickItem(CE.comingSoonDropdown, 2)
    validateElementIsVisible(CE.homeLiveEvent)
    validateElementIsVisible(CE.formButton)
    clickItem(CE.comingSoonPageButton, 2)
    clickItem(CE.publishingTab,2)
    validateElementContainsIsVisible(CE.homePageButton, 'Enable')
    validateElementContainsIsVisible(CE.enableInitComingSoon, 'Enable')
    validateElementContainsIsVisible(CE.ideaSubmissionFormButton, 'Enable')
    validateElementContainsIsVisible(CE.smMessage, 'Enable')
    validateElementExists(CE.initDonationsPublishingButton)
  })

  it('handles logged-in champions', () => {
    const adminLoginPage = `${url.adminHost}`
    const disabled = `${adminLoginPage}/champions/org-3/init-3/invite`
    const enabled = `${adminLoginPage}/champions/org-2/init-1/invite`

    // should disable the "Champion For" dropdown on the form if there is only one item (the init)
    visitPage(disabled)
    validateElementHasAttribute(`[data-test-id="dropdown-option-${initName}"]`, 'disabled')


    // should enable the "Champion For" dropdown on the form if there is a story
    visitPage(enabled)
    validateElementDoesNotHaveAttribute(`[data-test-id="dropdown-option-${initName}"]`, 'disabled')
  })
})
