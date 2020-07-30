import {
  loginAs,
  logoutNoCheck,
  visitPage,
  clickItem,
  clickItemContains,
  findAndClickItem,
  scrollToAndFindVisible,
  scrollToFindAndClick,
  scrollToContainsElementWithTextIsVisible,
  scrollToContainsTextIsVisible,
  inputText,
  validateText,
  validateElementIsVisible,
  validateElementIsNotVisible,
  validateElementEnabled,
  validateElementNotEnabled,
  validateValue,
  findAndValidateElementVisible,
  url
} from '../../../utils/utils'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

import {
  Env
} from '../../../Config'

import moment from 'moment-timezone'

describe('Smoke test - Data seeding', () => {

  let fixture: any
  let userRole: any
  let existingMatchName: string = ''

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
  // 1. Visit Match page for an initiative
  // 2. Add new incentive with 100% matching and scheduling
  // 3. Verify that new incentive has correct data
  it('Initiative Context - Add new match > 100% Matching', () => {
    const matchPath = `${url.adminHost}/incentives/matches/org-3/init-2`
    const match = fixture.DataSeeding.SubOrg1.Init1.MatchList.match1
    const newMatchMenu = fixture.ConfigureInitiativeIncentiveMatches.newMatchMenu
    const matchName = match.name
    const matchDescription = match.description
    const sponsorName = match.sponsorName
    const coucouImage = fixture.generic.coucouImage
    const png = fixture.generic.png
    const sponsorFileInput = '#image-field-image'
    const bannerFileInput = "#image-field-bannerImage"
    const badgeIcon = '[d="M13.16,12.74L14,14H12.5C12.35,16.71 12,19.41 11.5,22.08L10.5,21.92C11,19.3 11.34,16.66 11.5,14H10L10.84,12.74C8.64,11.79 7,8.36 7,6A5,5 0 0,1 12,1A5,5 0 0,1 17,6C17,8.36 15.36,11.79 13.16,12.74Z"]'
    const activeStatus = fixture.generic.activeStatus
    const matchMultiplier = match.matchMultiplier

    visitPage(matchPath)
    clickItem(CE.addNewIncentiveButton, 2)
    validateText('[data-test-id="dropdown-option-New Match"]', newMatchMenu)
    validateElementNotEnabled(CE.saveIncentiveButton)
    clickItem('[data-test-id="Publish Now-toggle-switch"][aria-checked="false"]')
    validateElementIsVisible('[data-test-id="Publish Now-toggle-switch"][aria-checked="true"]')
    clickItem('[data-test-id="Enable Participation-toggle-switch"][aria-checked="false"]')
    validateElementIsVisible('[data-test-id="Enable Participation-toggle-switch"][aria-checked="true"]')
    inputText(CE.incentiveFieldName, matchName)
    validateElementNotEnabled(CE.saveIncentiveButton)
    inputText(CE.incentiveFieldDescription, matchDescription)
    validateElementEnabled(CE.saveIncentiveButton)
    clickItem('[data-test-id="Share this Incentive-toggle-switch"][aria-checked="false"]')
    validateElementIsVisible('[data-test-id="Share this Incentive-toggle-switch"][aria-checked="true"]')
    clickItem(CE.addIncentiveSponsor)
    cy.uploadFile(coucouImage, png, sponsorFileInput).get(sponsorFileInput).trigger('change', {force: true})
    clickItem(CE.incentivePhotopicker)
    inputText(CE.incentiveSponsorName, sponsorName)
    validateValue(CE.incentiveSponsorName, sponsorName)
    inputText(CE.incentiveSponsorSite, `www.${sponsorName}.com`)
    clickItem(CE.incentiveSaveSponsor)
    validateElementIsVisible(`[data-test-id="dropdown-option-${sponsorName}"]`)
    cy.uploadFile(coucouImage, png, bannerFileInput).get(bannerFileInput).trigger('change', {force: true})
    clickItem(CE.incentivePhotopicker)
    clickItem(CE.incentiveBadgeIcon)
    clickItem(CE.balloonIcon)
    validateElementIsVisible('[data-test-id="dropdown-option-Balloon"]')
    findAndValidateElementVisible('[data-test-id="dropdown-option-Balloon"]', badgeIcon)
    validateValue(`[data-test-id="matchMultiplier-field"]`, matchMultiplier)
    inputText(`#text-field-maxPayout`, `10000`)
    validateValue(`#text-field-maxPayout`, '$ 10,000')
    inputText('#text-field-minDonation', '3639')
    validateValue(`#text-field-minDonation`, '$ 3,639')
    inputText('#text-field-maxDonation', '4000')
    validateValue(`#text-field-maxDonation`, '$ 4,000')
    validateElementEnabled(CE.saveIncentiveButton)
    validateElementIsVisible('[data-test-id="dropdown-option-Donors"]')
    clickItem(CE.incentiveScheduleButton)
    clickItem(CE.incentiveStartDate)
    clickItem(CE.incentiveDatePicker)
    findAndClickItem('[data-test-id="field-Scheduled Start Time"]', '[data-test-id="dropdown-option"]')
    clickItem(CE.incentiveStartTime)
    clickItem(CE.incentiveEndDate)
    clickItem(CE.incentiveDatePicker)
    findAndClickItem('[data-test-id="field-Scheduled End Time"]', '[data-test-id="dropdown-option"]')
    clickItem(CE.incentiveEndTime)
    clickItem(CE.saveIncentiveButton, 2)

    scrollToContainsElementWithTextIsVisible('[data-test-id="parentCell_0_1"]', 'button', matchName)
    validateText('body', matchDescription)
    scrollToAndFindVisible('[data-test-id="parentCell_0_2"]', '[aria-checked="true"]')
    scrollToAndFindVisible('[data-test-id="parentCell_0_3"]', '[aria-checked="true"]')
    scrollToAndFindVisible('[data-test-id="parentCell_0_4"]', '[aria-checked="true"]')
    scrollToFindAndClick(`[data-test-id="parentCell_0_2"]`, '[aria-checked="true"]', .5)
    scrollToAndFindVisible('[data-test-id="parentCell_0_2"]', '[aria-checked="false"]')
    scrollToFindAndClick(`[data-test-id="parentCell_0_3"]`, '[aria-checked="true"]', .5)
    scrollToAndFindVisible('[data-test-id="parentCell_0_3"]', '[aria-checked="false"]')
    scrollToFindAndClick(`[data-test-id="parentCell_0_4"]`, '[aria-checked="true"]', .5)
    scrollToAndFindVisible('[data-test-id="parentCell_0_4"]', '[aria-checked="false"]')

    scrollToFindAndClick(`[data-test-id="parentCell_0_2"]`, '[aria-checked="false"]', .5)
    scrollToAndFindVisible('[data-test-id="parentCell_0_2"]', '[aria-checked="true"]')
    scrollToFindAndClick(`[data-test-id="parentCell_0_3"]`, '[aria-checked="false"]', .5)
    scrollToAndFindVisible('[data-test-id="parentCell_0_3"]', '[aria-checked="true"]')
    scrollToFindAndClick(`[data-test-id="parentCell_0_4"]`, '[aria-checked="false"]', .5)
    scrollToAndFindVisible('[data-test-id="parentCell_0_4"]', '[aria-checked="true"]')

    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_6"]', matchMultiplier)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_7"]', '$0')
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_7"]', ' of ')
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_7"]', '$10,000')
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_8"]', '3639')
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_9"]', '4000')
    scrollToContainsTextIsVisible('[data-test-id="startDateTime"]',  `${moment().format(`ddd, MMM Do YYYY`)} 1:00AM`)
    scrollToContainsTextIsVisible('[data-test-id="endDateTime"]',  `${moment().format(`ddd, MMM Do YYYY`)} 2:00AM`)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_11"]', sponsorName)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_12"]', activeStatus)
  })

  // Preconditions:
  // User is logged in
  //
  // Test Case Description
  // 1. Visit Match page
  // 2. Add new incentive with 25% matching and scheduling
  // 3. Verify that new incentive has correct data
  it('Initiative Context - Add new match > 25% matching', () => {
    const match = fixture.DataSeeding.SubOrg1.Init1.MatchList.match2
    const matchName = match.name
    const sponsorName = match.sponsorName
    const coucouImage = fixture.generic.coucouImage
    const png = fixture.generic.png
    const sponsorFileInput = '#image-field-image'
    const bannerFileInput = "#image-field-bannerImage"
    const badgeIcon = '[d="M13.16,12.74L14,14H12.5C12.35,16.71 12,19.41 11.5,22.08L10.5,21.92C11,19.3 11.34,16.66 11.5,14H10L10.84,12.74C8.64,11.79 7,8.36 7,6A5,5 0 0,1 12,1A5,5 0 0,1 17,6C17,8.36 15.36,11.79 13.16,12.74Z"]'
    const matchMultiplier = match.matchMultiplier
    const matchDescription = match.description
    const matchPath = `${url.adminHost}/incentives/matches/org-3/init-2`

    visitPage(matchPath)
    clickItem(CE.addNewIncentiveButton, 2)
    validateElementNotEnabled(CE.saveIncentiveButton)
    inputText(CE.incentiveFieldName, matchName)
    validateElementNotEnabled(CE.saveIncentiveButton)
    inputText(CE.incentiveFieldName, matchName)
    validateElementNotEnabled(CE.saveIncentiveButton)
    inputText(CE.incentiveFieldDescription, matchDescription)
    clickItem(CE.addIncentiveSponsor)
    cy.uploadFile(coucouImage, png, sponsorFileInput).get(sponsorFileInput).trigger('change', {
      force: true
    })
    clickItem(CE.incentivePhotopicker)
    inputText(CE.incentiveSponsorName, sponsorName)
    validateValue(CE.incentiveSponsorName, sponsorName)
    inputText(CE.incentiveSponsorSite, `www.${sponsorName}.com`)
    clickItem(CE.incentiveSaveSponsor)
    validateElementIsVisible(`[data-test-id="dropdown-option-${sponsorName}"]`)
    cy.uploadFile(coucouImage, png, bannerFileInput).get(bannerFileInput).trigger('change', {
        force: true
    })
    clickItem(CE.incentivePhotopicker)
    clickItem(CE.incentiveBadgeIcon)
    clickItem(CE.balloonIcon)
    validateElementIsVisible('[data-test-id="dropdown-option-Balloon"]')
    findAndValidateElementVisible('[data-test-id="dropdown-option-Balloon"]', badgeIcon)
    validateValue(`[data-test-id="matchMultiplier-field"]`, matchMultiplier)
    inputText(`#text-field-maxPayout`, `10000`)
    validateValue(`#text-field-maxPayout`, '$ 10,000')
    inputText('#text-field-minDonation', '3639')
    validateValue(`#text-field-minDonation`, '$ 3,639')
    inputText('#text-field-maxDonation', '4000')
    validateValue(`#text-field-maxDonation`, '$ 4,000')
    validateElementEnabled(CE.saveIncentiveButton)
    validateElementIsVisible('[data-test-id="dropdown-option-Donors"]')
    clickItem(CE.incentiveScheduleButton)
    clickItem(CE.incentiveStartDate)
    clickItem(CE.incentiveDatePicker)
    findAndClickItem('[data-test-id="field-Scheduled Start Time"]', '[data-test-id="dropdown-option"]')
    clickItem(CE.incentiveStartTime)
    clickItem(CE.incentiveEndDate)
    clickItem(CE.incentiveDatePicker)
    findAndClickItem('[data-test-id="field-Scheduled End Time"]', '[data-test-id="dropdown-option"]')
    clickItem(CE.incentiveEndTime)
    clickItem(CE.saveIncentiveButton, 2)
  })

  // Preconditions:
  // User is logged in
  //
  // Test Case description
  // 1. Visit Match page
  // 2. Add new incentive with scheduling
  // 3. Verify that new incentive has correct data
  it('Story Context - Add new match', () => {
    const storyMatchesPath = `${url.adminHost}/incentives/matches/org-3/init-2/sty-2`
    const runId = Math.floor(Math.random() * 10000)
    const matchName = `Match ${runId}`
    const matchDescription = `Match desc ${runId}`
    const sponsorName = `Match${runId}`
    const coucouImage = fixture.generic.coucouImage
    const png = fixture.generic.png
    const sponsorFileInput = '#image-field-image'
    const bannerFileInput = "#image-field-bannerImage"
    const badgeIcon= '[d="M13.16,12.74L14,14H12.5C12.35,16.71 12,19.41 11.5,22.08L10.5,21.92C11,19.3 11.34,16.66 11.5,14H10L10.84,12.74C8.64,11.79 7,8.36 7,6A5,5 0 0,1 12,1A5,5 0 0,1 17,6C17,8.36 15.36,11.79 13.16,12.74Z"]'
    const activeStatus = fixture.generic.activeStatus
    const matchMultiplier = '1'
    const storyTitle3 = fixture.ConfigureInitiativeIncentiveRewards.storyTitle3

    existingMatchName = matchName

    visitPage(storyMatchesPath)

    clickItem(CE.addNewIncentiveButton, 2)
    validateElementIsVisible('[data-test-id="dropdown-option-New Match"]')
    validateElementNotEnabled(CE.saveIncentiveButton)
    clickItem(CE.publishToggleReward)
    validateElementIsVisible('[data-test-id="Publish Now-toggle-switch"][aria-checked="true"]')
    clickItem(CE.participationToggleReward)
    validateElementIsVisible('[data-test-id="Enable Participation-toggle-switch"][aria-checked="true"]')
    inputText(CE.incentiveFieldName, matchName)
    validateElementNotEnabled(CE.saveIncentiveButton)
    inputText(CE.incentiveFieldDescription, matchDescription)
    validateElementEnabled(CE.saveIncentiveButton)
    clickItem(CE.shareIncentive)
    validateElementIsVisible('[data-test-id="Share this Incentive-toggle-switch"][aria-checked="true"]')

    clickItem(CE.addIncentiveSponsor)
    cy.uploadFile(coucouImage, png, sponsorFileInput).get(sponsorFileInput).trigger('change', {
      force: true
    })
    clickItem(CE.incentivePhotopicker)
    inputText(CE.incentiveSponsorName, sponsorName)
    validateValue(CE.incentiveSponsorName, sponsorName)
    inputText(CE.incentiveSponsorSite, `www.${sponsorName}.com`)
    clickItem(CE.incentiveSaveSponsor)
    validateElementIsVisible(`[data-test-id="dropdown-option-${sponsorName}"]`)
    cy.uploadFile(coucouImage, png, bannerFileInput).get(bannerFileInput).trigger('change', {
        force: true
    })
    clickItem(CE.incentivePhotopicker)
    clickItem(CE.incentiveBadgeIcon)
    clickItem(CE.balloonIcon)
    validateElementIsVisible('[data-test-id="dropdown-option-Balloon"]')
    findAndValidateElementVisible('[data-test-id="dropdown-option-Balloon"]', badgeIcon)
    validateValue(`[data-test-id="matchMultiplier-field"]`, matchMultiplier)
    inputText(`#text-field-maxPayout`, `10000`)
    validateValue(`#text-field-maxPayout`, '$ 10,000')
    inputText('#text-field-minDonation', '3639')
    validateValue(`#text-field-minDonation`, '$ 3,639')
    inputText('#text-field-maxDonation', '4000')
    validateValue(`#text-field-maxDonation`, '$ 4,000')
    validateElementEnabled(CE.saveIncentiveButton)

    clickItem(CE.incentiveScheduleButton)
    clickItem(CE.incentiveStartDate)
    clickItem(CE.incentiveDatePicker)
    findAndClickItem('[data-test-id="field-Scheduled Start Time"]', '[data-test-id="dropdown-option"]')
    clickItem(CE.incentiveStartTime)
    clickItem(CE.incentiveEndDate)
    clickItem(CE.incentiveDatePicker)
    findAndClickItem('[data-test-id="field-Scheduled End Time"]', '[data-test-id="dropdown-option"]')
    clickItem(CE.incentiveEndTime)
    clickItem(CE.saveIncentiveButton, 2)

    scrollToContainsElementWithTextIsVisible('[data-test-id="parentCell_0_1"]', 'button', matchName)
    validateText('body', matchDescription)
    scrollToAndFindVisible('[data-test-id="parentCell_0_2"]', '[aria-checked="true"]')
    scrollToAndFindVisible('[data-test-id="parentCell_0_3"]', '[aria-checked="true"]')
    scrollToAndFindVisible('[data-test-id="parentCell_0_4"]', '[aria-checked="true"]')

    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_6"]', matchMultiplier)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_7"]', '$10,000')
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_8"]', '3639')
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_9"]', '4000')
    scrollToContainsTextIsVisible('[data-test-id="startDateTime"]',  `${moment().format(`ddd, MMM Do YYYY`)} 1:00AM`)
    scrollToContainsTextIsVisible('[data-test-id="endDateTime"]',  `${moment().format(`ddd, MMM Do YYYY`)} 2:00AM`)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_10"]', storyTitle3)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_11"]', sponsorName)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_12"]', activeStatus)
  })

  // Preconditions:
  // User is logged in
  //
  // Test Case Description
  // 1. Visit Match page
  // 2. Add new incentive
  // 3. Verify that new incentive has correct data
  // 4. Add identical incentive as in step 2
  // 5. Verify that incentive has correct data
  it('Story Context - Add existing match', () => {
    const storyMatchesPath = `${url.adminHost}/incentives/matches/org-3/init-2/sty-3`
    const runId = Math.floor(Math.random() * 10000)
    const newMatchName = `Match${runId}`
    const newMatchDescription = `Desc ${runId}`
    const badgeIcon= '[d="M13.16,12.74L14,14H12.5C12.35,16.71 12,19.41 11.5,22.08L10.5,21.92C11,19.3 11.34,16.66 11.5,14H10L10.84,12.74C8.64,11.79 7,8.36 7,6A5,5 0 0,1 12,1A5,5 0 0,1 17,6C17,8.36 15.36,11.79 13.16,12.74Z"]'
    const matchName = existingMatchName.split(" ")
    const existingMatchDescription = matchName[0] + ' desc ' + matchName[1]
    const addMatchButtonText = fixture.ConfigureInitiativeIncentiveMatches.addMatchButtonText
    const name = 'Test Name'
    const description = 'Test Description'

    visitPage(storyMatchesPath)
    clickItem(CE.addNewIncentiveButton)
    inputText(CE.incentiveFieldName, name)
    inputText(CE.incentiveFieldDescription, description)
    clickItem(CE.saveIncentiveButton)

    clickItem(CE.addExistingIncentiveButton)
    clickItem('[data-test-id="dropdown-option"]')
    clickItemContains(`button`, existingMatchName)
    clickItemContains('[data-test-id="add-match-button"]', addMatchButtonText)
    clickItem('[data-test-id="add-match-cancel-button"]')
    clickItemContains('[data-test-id="parentCell_0_1"]', existingMatchName)
    validateElementNotEnabled(CE.saveIncentiveButton)
  //  clickItem(CE.publishToggleReward)
    validateElementIsVisible('[data-test-id="Publish Now-toggle-switch"][aria-checked="true"]')
  //  clickItem(CE.participationToggleReward)
    validateElementIsVisible('[data-test-id="Enable Participation-toggle-switch"][aria-checked="true"]')
    validateValue(CE.incentiveFieldName, existingMatchName)
    validateValue(CE.incentiveFieldDescription, existingMatchDescription)

    validateElementIsVisible('[data-test-id="Share this Incentive-toggle-switch"][aria-checked="true"]')
    validateElementIsVisible('[data-test-id="dropdown-option-Balloon"]')
    findAndValidateElementVisible('[data-test-id="dropdown-option-Balloon"]', badgeIcon)

    validateValue(`#text-field-maxPayout`, '$ 10,000')
    validateValue(`#text-field-minDonation`, '$ 3,639')
    validateValue(`#text-field-maxDonation`, '$ 4,000')

    validateElementIsVisible(CE.incentiveRunManually)
    validateElementIsNotVisible(CE.incentiveScheduleButton)
    findAndValidateElementVisible('[data-test-id="field-Scheduled Start Time"]', '[data-test-id="dropdown-option-1:00 AM"]')
    findAndValidateElementVisible('[data-test-id="field-Scheduled End Time"]', '[data-test-id="dropdown-option-2:00 AM"]')

    inputText(CE.incentiveFieldName, newMatchName)
    validateElementEnabled(CE.saveIncentiveButton)
    inputText(CE.incentiveFieldDescription, newMatchDescription)
    clickItem(CE.saveIncentiveButton)

    scrollToContainsElementWithTextIsVisible('[data-test-id="parentCell_0_1"]', 'button', newMatchName)
    validateText('body', newMatchDescription)
    scrollToAndFindVisible('[data-test-id="parentCell_0_2"]', '[aria-checked="true"]')
    scrollToAndFindVisible('[data-test-id="parentCell_0_3"]', '[aria-checked="true"]')
  })
})
