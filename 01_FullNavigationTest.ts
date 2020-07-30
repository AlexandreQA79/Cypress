import {
  loginAs,
  logoutNoCheck,
  visitPage,
  clickItem,
  clickItemContains,
  clearText,
  inputText,
  validateText,
  validateValue,
  validateElementExists,
  validateElementDoesNotExist,
  validateElementIsVisible,
  validateElementIsNotVisible,
  validateUrl,
  url
} from '../../../utils/utils'

import * as Navigation from '../../../utils/Helpers/pageObject/Navigation'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

import {
  Env
} from '../../../Config'

describe('Smoke test - Navigation Validation', () => {

  let fixture: any
  let userRole: any

  before(() => {
      cy.fixture('SmokeFixture').then((data) => {
          fixture = data
          userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
          logoutNoCheck()
      })
  })

  afterEach(() => {
    logoutNoCheck()
  })

  it('Valid Login: Submit Correct Login Credentials', () => {
    loginAs(userRole.OrganizationAdministrator1)
  })

  it('Invalid Login: Submit Incorrect Login Credentials', () => {
    const userName = userRole.InvalidUser.userName//'patrick@communityfunded.com'
    const password = userRole.InvalidUser.password//'testtesttest'
    const invalidLoginMessage = 'Invalid Email or Password'
    const adminLoginPage = `${url.adminHost}`

    visitPage(adminLoginPage)

    cy.wait(fixture.Wait.loadLoginPage).log('Fill in the username and password fields')
    inputText(CE.fieldUsername, userName)
    inputText(CE.fieldPassword, password)
    clickItem(CE.loginSubmit)

    cy.log('Validate that the logout button is not available')
    validateText(CE.smMessage, invalidLoginMessage)
    validateValue(CE.fieldUsername, userName)
    validateValue(CE.fieldPassword, password)
    validateElementDoesNotExist(`[data-test-id="appbar-user-dropdown"]`)
  })

  it('if improperly formatted email a warning message is displayed indicating that the email address is in an invalid format', () => {
    const adminLoginPage = `${url.adminHost}`
    const requiredEmail = 'A valid email is required.'

    visitPage(adminLoginPage)
    clickItemContains('button', 'Forgot password?', fixture.Wait.loadLoginPage)

    // space in email
    inputText(CE.fieldUsername, 'improperly formatted@yo.com')
    clickItemContains('button', 'Get Reset Link')
    validateText(CE.smMessage, 'Please check your improperlyformatted@yo.com address')

    // empty username
    clickItemContains('button', 'Return to Login')
    clearText(CE.fieldUsername)
    validateText(CE.smMessage, requiredEmail)

    // missing domain
    inputText(CE.fieldUsername, 'missing-domain@yo')
    validateText(CE.smMessage, requiredEmail)

    // garbage
    inputText(CE.fieldUsername, '#@%^%#$@#$@#.com')
    validateText(CE.smMessage, requiredEmail)

    // Missing Username
    inputText(CE.fieldUsername, 'missingusername.com')
    validateText(CE.smMessage, requiredEmail)

    // Encoded html within email is invalid
    inputText(CE.fieldUsername, 'Joe Smith <email@domain.com>')
    validateText(CE.smMessage, requiredEmail)

    // Missing @ sign
    inputText(CE.fieldUsername, 'missing.at.sign')
    validateText(CE.smMessage, requiredEmail)

    // Two @ signs
    inputText(CE.fieldUsername, 'two@at@signs.com')
    validateText(CE.smMessage, requiredEmail)

    // Leading dot in address is not allowed
    inputText(CE.fieldUsername, '.leadingdot@dot.com')
    validateText(CE.smMessage, requiredEmail)

    // Trailing dot in address is not allowed
    inputText(CE.fieldUsername, 'tailing.@dot.com')
    validateText(CE.smMessage, requiredEmail)

    // Multiple dot in the domain portion is invalid
    inputText(CE.fieldUsername, 'email@domain..com')
    validateText(CE.smMessage, requiredEmail)

    // Unicode char as address
    // This is broken because our system doesn't return an error for unicode text.
    // inputText(CE.fieldUsername, 'あいうえお@domain.com')
    // validateText(CE.smMessage, requiredEmail)

    loginAs(userRole.OrganizationAdministrator1)
  })


  it('Validate Navigation: Org Admin', () => {
    const adminLoginPage = `${url.adminHost}`

    loginAs(userRole.OrganizationAdministrator1)

    // validate that we are on the admin dashboard
    validateUrl(adminLoginPage + '/dashboard')

    // Main Menu
    cy.log('Begin Validate Left Menu Navigation')
    clickItem(Navigation.featureMenuOrganizations)
    validateUrl(adminLoginPage + '/organizations')
    validateText(Navigation.pageHeader, Navigation.orgHeaderText)
    clickItem(Navigation.featureMenuInitiatives)
    validateUrl(adminLoginPage + '/initiatives')
    validateText(Navigation.pageHeader, Navigation.initHeaderText)
    clickItem(Navigation.featureMenuStories)
    validateUrl(adminLoginPage + '/stories')
    validateText(Navigation.pageHeader, Navigation.storyHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    validateUrl(adminLoginPage + '/dashboard')
    validateText(Navigation.pageHeader, Navigation.dashboardHeaderText)

    // Cards
    cy.log('Begin Validate Dashboard Card Navigation')
    clickItem(Navigation.cardsOrganizations)
    validateUrl(adminLoginPage + '/organizations')
    validateText(Navigation.pageHeader, Navigation.orgHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    clickItem(Navigation.cardsInitiatives)
    validateUrl(adminLoginPage + '/initiatives')
    validateText(Navigation.pageHeader, Navigation.initHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    clickItem(Navigation.cardsStories)
    validateUrl(adminLoginPage + '/stories')
    validateText(Navigation.pageHeader, Navigation.storyHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    clickItem(Navigation.cardsTeam)
    validateUrl(adminLoginPage + '/team')
    validateText(Navigation.pageHeader, Navigation.teamHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    validateUrl(adminLoginPage + '/dashboard')

    // Drill down into sub navigation
    cy.log('Begin Validate Org Context Horizontal Sub Navigation')
    clickItem(Navigation.featureMenuOrganizations)
    clickItem(Navigation.organizationButton)
    validateText(Navigation.pageHeader, Navigation.orgDetailsHeaderText)
    clickItem(Navigation.horizontalTabsPayments)
    validateText(Navigation.pageHeader, Navigation.orgPaymentsHeaderText)
    clickItem(Navigation.horizontalTabsBranding)
    validateText(Navigation.pageHeader, Navigation.orgBrandingHeaderText)
    clickItem(Navigation.horizontalTabsDetails)
    validateText(Navigation.pageHeader, Navigation.orgDetailsHeaderText)

    // Validate org context left menu nav
    cy.log('Begin Validate Org Context Left Menu Navigation')
    clickItem(Navigation.featureMenuOrganizations)
    validateText(Navigation.pageHeader, Navigation.orgHeaderText)
      // Validate Create New and Cancel Buttons
      clickItem(CE.createOrganizationButton)
      validateElementIsVisible(`[data-test-id="dropdown-option-CF Test Org"]`)
      clickItem(CE.cancelButton)
      validateElementIsNotVisible(CE.cancelButton)

    clickItem(Navigation.featureMenuInitiatives)
    validateText(Navigation.pageHeader, Navigation.initHeaderText)
    clickItem(Navigation.featureMenuStories)
    validateText(Navigation.pageHeader, Navigation.storyHeaderText)
    clickItem(Navigation.featureMenuTeam)
    validateText(Navigation.pageHeader, Navigation.teamHeaderText)
    clickItem(Navigation.featureMenuOrgSetup)
    validateText(Navigation.pageHeader, Navigation.orgDetailsHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    validateText(Navigation.pageHeader, Navigation.dashboardHeaderText)

    // Validate init context left menu nav
    cy.log('Begin Validate Org Context Left Menu Navigation')
    clickItem(Navigation.featureMenuInitiatives)
    validateText(Navigation.pageHeader, Navigation.initHeaderText)
    clickItem(Navigation.initiativeButton)
    validateText(Navigation.pageHeader, Navigation.initDetailsHeaderText)
    clickItem(Navigation.featureMenuStories)
    validateText(Navigation.pageHeader, Navigation.storyHeaderText)
    clickItem(Navigation.featureMenuChampions)
    validateText(Navigation.pageHeader, Navigation.championHeaderText)
    clickItem(Navigation.featureMenuIncentives)
    validateText(Navigation.pageHeader, Navigation.incentivesHeaderText)
    clickItem(Navigation.featureMenuTeam)
    validateText(Navigation.pageHeader, Navigation.teamHeaderText)
    clickItem(Navigation.featureMenuTransactions)
    validateText(Navigation.horizontalTabsTransactions, Navigation.transactionsHeaderText)
    clickItem(Navigation.featureMenuInitiatives)
    validateText(Navigation.pageHeader, Navigation.initDetailsHeaderText)

    // Validate init context horizontal menu nav
    cy.log('Begin Validate Org Context Left Menu Navigation')
    validateText(Navigation.pageHeader, Navigation.initDetailsHeaderText)
    clickItem(Navigation.horizontalTabsPages)
    validateElementExists(Navigation.pagesDropDownMenu)
    clickItem(Navigation.horizontalTabsPayments)
    validateText(Navigation.pageHeader, Navigation.orgPaymentsHeaderText)
    clickItem(Navigation.horizontalTabsDetails)
    validateText(Navigation.pageHeader, Navigation.initDetailsHeaderText)
  })

  it('Validate Navigation: Init Admin', () => {

    loginAs(userRole.InitiativeAdministrator1)

    // Main Menu
    clickItem(Navigation.featureMenuOrganizations)
    validateText(Navigation.pageHeader, Navigation.orgHeaderText)
    clickItem(Navigation.featureMenuInitiatives)
    validateText(Navigation.pageHeader, Navigation.initHeaderText)
    clickItem(Navigation.featureMenuStories)
    validateText(Navigation.pageHeader, Navigation.storyHeaderText)
      // Validate that the test story button exists
      validateElementIsVisible(`[data-test-id="story-CF Test Story-button"]`)
    // clickItem(Navigation.featureMenuChampions)
    // validateText(Navigation.pageHeader, Navigation.championHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    validateText(Navigation.pageHeader, Navigation.dashboardHeaderText)

    // Cards
    clickItem(Navigation.cardsOrganizations)
    validateText(Navigation.pageHeader, Navigation.orgHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    clickItem(Navigation.cardsInitiatives)
    validateText(Navigation.pageHeader, Navigation.initHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    clickItem(Navigation.cardsStories)
    validateText(Navigation.pageHeader, Navigation.storyHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
  })

  it('Validate Navigation: Story Teller', () => {

    loginAs(userRole.StoryTeller1)

    // Main Menu
    validateElementDoesNotExist(Navigation.featureMenuOrganizations)
    clickItem(Navigation.featureMenuStories)
    validateText(Navigation.pageHeader, Navigation.storyHeaderText)
    clickItem(Navigation.featureMenuDashBoard)
    validateText(Navigation.pageHeader, Navigation.dashboardHeaderText)

    // Cards
    clickItem(Navigation.cardsStories)
    validateText(Navigation.pageHeader, Navigation.storyHeaderText)
    clickItem(Navigation.featureMenuDashBoard)

    // Drill down into story
    clickItem(Navigation.featureMenuStories)
    clickItem(`[data-test-id="story-CF Test Story-button"]`)
    validateText(CE.aboutButton, 'About')
  })

  it('Story context -  NAV-B-11: Select Payments Features Menu\n Login as an Organization admin\n Navigate to Organization \n Select Payment Tab\n ' +
      'Validate that tab is selected and url is changed\n Navigate to Initiative\n Select Payment tab\n Validate Initiative related controls\n' +
      'and url\n Navigate to story\n Select Payment tab\n Validate story related controls and url', () => {

      loginAs(userRole.OrganizationAdministrator1)
      const organizationPage = `${url.adminHost}/organizations/payments/org-2`
      const initiativePaymentPage = `${url.adminHost}/initiatives/payments/org-2/init-1`
      const storyPaymentPage = `${url.adminHost}/stories/payments/org-2/init-1/sty-1`

      //Organization
      visitPage(organizationPage)
      validateElementIsVisible(CE.fundsTemplateButton)
      validateElementIsVisible(CE.additionalFieldsButton)

      //Initiative
      visitPage(initiativePaymentPage)
      validateElementIsVisible(CE.processorsButton)
      validateElementIsVisible(CE.initiativeFundsButton)
      validateElementIsVisible(CE.donationOptionsButton)
      validateElementIsVisible(CE.additionalFieldsButton)

      //Story
      visitPage(storyPaymentPage)
      validateText(CE.smMessage, 'Contact your system administrator to add a fund to the initiative so it can be associated with this story.')
      validateElementIsVisible('[data-test-id="additional-fields-button"]')
  })


  it('Bread crumbs behave like breadcrumbs - ORG ADMIN', () => {
    const initiativePageAbout = `${url.adminHost}/initiatives/about/org-2/init-1`
    const organizationsPage = `${url.adminHost}/organizations/org-2`
    const incentivesPage = `${url.adminHost}/incentives/rewards/org-2/init-1`
    const initiativePage = `${url.adminHost}/initiatives/org-2`
    const storyPage = `${url.adminHost}/stories/org-2`

    loginAs(userRole.OrganizationAdministrator1)

    visitPage(organizationsPage, 2)
    validateText(`body`, 'Organizations')
    visitPage(initiativePage, 2)
    validateText(`body`, 'Initiatives')
    visitPage(storyPage, 2)
    validateText(`body`, 'Stories')
    validateElementIsVisible('[data-test-id="story-CF Test Story-button"]')
    visitPage(initiativePageAbout, 1)
    validateElementIsVisible(CE.aboutButton)
    visitPage(incentivesPage)
  })

  it('INIT ADMIN directly modifies the URL structure to change its entity ID values', () => {
    loginAs(userRole.InitiativeAdministrator1)

    // does have rights to this initiatve
    visitPage(`${url.adminHost}/initiatives/about/org-2/init-4`)
    validateText('body', 'Sorry, you don\'t have access to that view!')

    // does have rights to this initiatve
    visitPage(`${url.adminHost}/initiatives/org-2/init-1`)
    validateText('div', 'Initiative Details')

    // does NOT have rights to this init-1/sty-1
    visitPage(`${url.adminHost}/initiatives/init-7`)
    validateText('div', 'Sorry, you don\'t have access to that view!')

    // does NOT have rights to this story
    visitPage(`${url.adminHost}/stories/org-4/init-7/sty-1`)
    validateText('div', 'User does not have role access to this page...')

    // CAN visit /initiatives
    visitPage(`${url.adminHost}/initiatives/org-2`)
    validateText('div', 'Initiatives')
  })

  it('STORYTELLER directly modifies the URL structure to change its entity ID values', () => {
    loginAs(userRole.StoryTeller1)

    // does NOT have rights to this init-1/sty-3
    visitPage(`${url.adminHost}/stories/about/org-4/init-1/sty-3`)
    validateText('div', 'User does not have role access to this page...')

    // does have rights to this story
    visitPage(`${url.adminHost}/stories/org-4/init-2/sty-2`)
    validateText('div', 'User does not have role access to this page..')

    // as a Storyteller, does not have rights to view initiatives list view
    visitPage(`${url.adminHost}/initiatives`)
    validateText('div', 'Sorry, you don\'t have access to that view!')

    // does NOT have rights to this init-1/sty-3
    visitPage(`${url.adminHost}/initiatives/about/org-4/init-1`)
    validateText('div', 'Sorry, you don\'t have access to that view!')

    // does NOT have rights to this init-1/sty-3
    visitPage(`${url.adminHost}/initiatives/org-4/init-1`)
    validateText('div', 'Sorry, you don\'t have access to that view!')
  })
})
