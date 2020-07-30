import {
  loginAs,
  logoutNoCheck,
  visitPage,
  validateElementContainsIsVisible,
  validateElementFindContainsExists,
  validateElementIsVisible,
  validateElementEnabled,
  validateElementNotEnabled,
  findAndValidateElementVisible,
  findAndClickItem,
  url,
  clickItem,
} from '../../../utils/utils'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'
const initiativePublishing = `${url.adminHost}/initiatives/publishing/org-3/init-2`

import {
  Env
} from '../../../Config'

describe('Smoke test - Publish | Enable Donations for an Initiative\'s Pages', () => {

  let fixture: any
  let userRole: any

  before(() => {
      cy.fixture('SmokeFixture').then((data) => {
          fixture = data
          userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
      })
  })
  beforeEach(() => {
    logoutNoCheck()
    loginAs(userRole.OrganizationAdministrator1)
  })

  afterEach(() => {
    logoutNoCheck()
  })

  // Preconditions:
  // User is logged in
  //
  // Test Case Description
  // 1. Visit Initiative publishing page
  // 2. Disable donation
  // 3. Verify that donation is disabled
  // 4. Enable donation
  // 5. Verify that donation is enabled
  it('INIT-E-01-2 | INIT-E-02-1: Manually Designate Initiative Funding Status', () => {

    const enabledIcon = '[d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"]'
    const fundingEnabledText = fixture.PublishEnableDonationsForAnInitiative.fundingEnabledText
    const fundingDisabledText = fixture.PublishEnableDonationsForAnInitiative.fundingDisabledText
    const disable = fixture.generic.disable
    const enable = fixture.generic.enable

      visitPage(initiativePublishing)

      //Disable donation
      cy.log('Disable donation')
      findAndValidateElementVisible(CE.initiativeDonationsEnableControl, enabledIcon)
      validateElementFindContainsExists(CE.initiativeDonationsEnableControl, CE.header, fundingEnabledText)
      validateElementContainsIsVisible(CE.initiativeDonationsEnableControl, fundingEnabledText)
      validateElementFindContainsExists(CE.initiativeDonationsEnableControl, CE.donationsEnabledButton, disable)
      findAndClickItem(CE.initiativeDonationsEnableControl, CE.donationsEnabledButton, 2)
      validateElementContainsIsVisible(CE.initiativeDonationsEnableControl, fundingDisabledText)
      validateElementFindContainsExists(CE.initiativeDonationsEnableControl, CE.donationsEnabledButton, enable)

      //Enable donation
      cy.log('Enable donation')
      findAndClickItem(CE.initiativeDonationsEnableControl,CE.donationsEnabledButton, 2)
      validateElementContainsIsVisible(CE.initiativeDonationsEnableControl, fundingEnabledText)
      validateElementFindContainsExists(CE.initiativeDonationsEnableControl, CE.donationsEnabledButton, disable)

  })

  // Preconditions:
  // User is logged in
  //
  // Test Case Description
  // 1. Visit Initiative publishing page
  // 2. Verify that Live event page is disabled
  // 3. Verify that Live event page is enabled
  it('INIT-E-01-2 | INIT-E-02-1: Manually Designate Initiative Live Event Home Page Publishing', () => {
    const enabledIcon = '[d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"]'
    const disabledIcon = `[d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"]`
     const homeLiveEventPageText = fixture.PublishEnableDonationsForAnInitiative.homeLiveEventPageText
    const activePageMessage = fixture.generic.activePageMessage
    const inactivePageMessage = fixture.generic.inactivePageMessage
    const disable = fixture.generic.disable
    const enable = fixture.generic.enable

      visitPage(initiativePublishing)

      cy.log('Disable Home - Live Event Page')
      findAndValidateElementVisible(CE.initiativePageControlHome, enabledIcon)
      validateElementFindContainsExists(CE.initiativePageControlHome, CE.header, homeLiveEventPageText)
      validateElementContainsIsVisible(CE.initiativePageControlHome, activePageMessage)
      validateElementFindContainsExists(CE.initiativePageControlHome, CE.homePageButton, disable)
      findAndClickItem(CE.initiativePageControlHome, CE.homePageButton, 2)
      validateElementContainsIsVisible(CE.initiativePageControlHome, inactivePageMessage)
      validateElementFindContainsExists(CE.initiativePageControlHome, CE.homePageButton, enable)

      cy.log('Enable Home - Live Event Page')
      findAndValidateElementVisible(CE.initiativePageControlHome, disabledIcon)
      validateElementFindContainsExists(CE.initiativePageControlHome, CE.header, homeLiveEventPageText)
      validateElementContainsIsVisible(CE.initiativePageControlHome, inactivePageMessage)
      validateElementFindContainsExists(CE.initiativePageControlHome, CE.homePageButton, enable)
      findAndClickItem(CE.initiativePageControlHome, CE.homePageButton, 2)
      findAndValidateElementVisible(CE.initiativePageControlHome, enabledIcon)
      validateElementContainsIsVisible(CE.initiativePageControlHome, activePageMessage)
      validateElementFindContainsExists(CE.initiativePageControlHome, CE.homePageButton, disable)
  })

  // Preconditions:
  // User is logged in
  //
  // Test Case Description
  // 1. Visit Initiative publishing page
  // 2. Verify that Coming soon page is disabled
  // 3. Verify that Coming soon page is enabled
  it('INIT-E-01-1: Manually Designate Initiative\'s Coming Soon Home Page Publishing Status', () => {
    const enabledIcon = '[d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"]'
    const comingSoonPageText = fixture.PublishEnableDonationsForAnInitiative.comingSoonPageText
    const activePageMessage = fixture.generic.activePageMessage
    const inactivePageMessage = fixture.generic.inactivePageMessage
    const disable = fixture.generic.disable
    const enable = fixture.generic.enable

    visitPage(initiativePublishing)

    cy .log('Disable Home - coming soon Page')
    findAndValidateElementVisible(CE.enableInitComingSoon, enabledIcon)
    validateElementFindContainsExists(CE.enableInitComingSoon, CE.header, comingSoonPageText)
    validateElementContainsIsVisible(CE.initiativePageControlHome, activePageMessage)
    validateElementFindContainsExists(CE.initiativePageControlHome, CE.homePageButton, disable)
    findAndClickItem(CE.initiativePageControlHome, CE.homePageButton, 2)
    validateElementContainsIsVisible(CE.initiativePageControlHome, inactivePageMessage)
    validateElementFindContainsExists(CE.initiativePageControlHome, CE.homePageButton, enable)

    cy.log('Enable Home - coming soon Page')
    findAndClickItem(CE.initiativePageControlHome, CE.homePageButton, 2)
    findAndValidateElementVisible(CE.initiativePageControlHome, enabledIcon)
    validateElementContainsIsVisible(CE.initiativePageControlHome, activePageMessage)
    validateElementFindContainsExists(CE.initiativePageControlHome, CE.homePageButton, disable)

  })

  // Preconditions:
  // User is logged in
  //
  // Test Case Description
  // 1. Visit Initiative publishing page
  // 2. Verify that Story idea submission page is disabled
  // 3. Verify that Story idea submission page is enabled
  it('INIT-E-01-4: Manually Designate Initiative\'s Story Idea Submission Form Page Publishing Status', () => {
    const enabledIcon = '[d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"]'
    const storyIdeaPageText = fixture.PublishEnableDonationsForAnInitiative.storyIdeaPageText
    const activePageMessage = fixture.generic.activePageMessage
    const inactivePageMessage = fixture.generic.inactivePageMessage
    const disable = fixture.generic.disable
    const enable = fixture.generic.enable

    visitPage(initiativePublishing)

    cy .log('Disable Home - Live Event Page')
    findAndValidateElementVisible(CE.pageIdeaForm, enabledIcon)
    validateElementFindContainsExists(CE.pageIdeaForm, CE.header, storyIdeaPageText)
    validateElementContainsIsVisible(CE.pageIdeaForm, activePageMessage)
    validateElementFindContainsExists(CE.pageIdeaForm, CE.ideaSubmissionFormButton, disable)
    findAndClickItem(CE.pageIdeaForm, CE.ideaSubmissionFormButton, 2)
    validateElementContainsIsVisible(CE.pageIdeaForm, inactivePageMessage)
    validateElementFindContainsExists(CE.pageIdeaForm, CE.ideaSubmissionFormButton, enable)

    cy.log('Enable Home - Live Event Page')
    validateElementFindContainsExists(CE.pageIdeaForm, CE.header, storyIdeaPageText)
    validateElementContainsIsVisible(CE.pageIdeaForm, inactivePageMessage)
    validateElementFindContainsExists(CE.pageIdeaForm, CE.ideaSubmissionFormButton, enable)
    findAndClickItem(CE.pageIdeaForm, CE.ideaSubmissionFormButton, 2)
    findAndValidateElementVisible(CE.pageIdeaForm, enabledIcon)
    validateElementContainsIsVisible(CE.pageIdeaForm, activePageMessage)
    validateElementFindContainsExists(CE.pageIdeaForm, CE.ideaSubmissionFormButton, disable)
  })

  // Preconditions:
  // User is logged in
  //
  // Test Case Description
  // 1. Visit Initiative publishing page
  // 2. Verify that the Initiative has been published as scheduled
  it('INIT-E-01-1: Schedule Initiative\'s Automated Publishing | Funding Status', () => {
    const eventScheduleHeaderText = fixture.PublishEnableDonationsForAnInitiative.eventScheduleHeaderText
    const eventScheduleHeaderChildText = fixture.PublishEnableDonationsForAnInitiative.eventScheduleHeaderChildText

      visitPage(initiativePublishing)

      cy.log('Event schedule')
      clickItem(CE.eventScheduleButton,1)
      validateElementContainsIsVisible(CE.header, eventScheduleHeaderText)
      validateElementContainsIsVisible(CE.smMessage, eventScheduleHeaderChildText)
      validateElementNotEnabled(CE.saveChangesButton)
      findAndClickItem(`[data-test-id="startDateCard"]`, `.react-datepicker__day--today`, 2)
      validateElementEnabled(CE.saveChangesButton)
      findAndValidateElementVisible(`[data-test-id="startDateCard"]`, `.react-datepicker__day--today.react-datepicker__day--selected`)
      clickItem(CE.clearAllSelectionButton,2)
      validateElementNotEnabled(CE.clearAllSelectionButton)
      findAndClickItem(`[data-test-id="startDateCard"]`, `.react-datepicker__day--today`, 2)
      clickItem('[data-test-id="field-Start Time"]',1)
      clickItem(`[data-test-id="1:00-AM-button"]`,1)
      validateElementIsVisible(`[data-test-id="dropdown-option-1:00 AM"]`)
      findAndClickItem(`[data-test-id="endDateCard"]`, `.react-datepicker__day--today`, 2)
      findAndValidateElementVisible(`[data-test-id="endDateCard"]`, `.react-datepicker__day--today.react-datepicker__day--selected`)
      validateElementIsVisible(CE.clearAllSelectionButton)
      clickItem('[data-test-id="field-End Time"]',1)
      clickItem(`[data-test-id="2:00-AM-button"]`,3)
      clickItem('[data-test-id="dropdown-option-2:00 AM"]',1)
      clickItem(`[data-test-id="4:00-AM-button"]`,1)
      validateElementIsVisible(CE.clearAllSelectionButton)
      clickItem(CE.saveChangesButton)
      validateElementNotEnabled(CE.saveChangesButton)
  })
})
