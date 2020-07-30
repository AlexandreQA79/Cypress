import {
  loginAs,
  logoutNoCheck,
  visitPage,
  clickItem,
  findAndClickItem,
  scrollToAndFindVisible,
  scrollToFindAndClick,
  scrollToContainsElementWithTextIsVisible,
  scrollToContainsTextIsVisible,
  inputText,
  clearText,
  validateText,
  validateElementIsVisible,
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

  let challenge: any
  let challengeName: any
  let challengeDescription: any
  let sponsorName: any
  let coucouImage: any
  let png: any
  let awardAmount: any
  let tier1: any
  let tier2: any
  let tier3: any
  let minDonation: any
  let maxDonation: any
  let goalAmount: any
  let activeStatus: any


  const sponsorFileInput = '#image-field-image'
  const bannerFileInput = "#image-field-bannerImage"
  const badgeIcon = '[d="M13.16,12.74L14,14H12.5C12.35,16.71 12,19.41 11.5,22.08L10.5,21.92C11,19.3 11.34,16.66 11.5,14H10L10.84,12.74C8.64,11.79 7,8.36 7,6A5,5 0 0,1 12,1A5,5 0 0,1 17,6C17,8.36 15.36,11.79 13.16,12.74Z"]'


  before(() => {
      cy.fixture('SmokeFixture').then((data) => {
          fixture = data
          userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
          challenge = fixture.DataSeeding.SubOrg1.Init1.ChallengeList.challenge1
          challengeName = challenge.name
          challengeDescription = challenge.description
          sponsorName = challenge.sponsorName
          coucouImage = fixture.generic.coucouImage
          png = fixture.generic.png
          awardAmount = challenge.awardAmount
          tier1 = challenge.tier1
          tier2 = challenge.tier2
          tier3 = challenge.tier3
          minDonation = challenge.minDonation
          maxDonation = challenge.maxDonation
          goalAmount = challenge.goalAmount
          activeStatus = fixture.generic.activeStatus
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
    // 1. Visit challenges page
    // 2. Add new challenge with value > 1500
    // 3. Verify that challenge has been created with correct data
  it('Initiative Context - Add new challenge > 1500 Challenge', () => {

      const challengesPath = `${url.adminHost}/incentives/challenges/org-3/init-2`

      visitPage(challengesPath)
      clickItem(CE.addNewIncentiveButton)
      validateElementNotEnabled(CE.saveIncentiveButton)
      clickItem('[data-test-id="Publish Now-toggle-switch"][aria-checked="false"]')
      validateElementIsVisible('[data-test-id="Publish Now-toggle-switch"][aria-checked="true"]')
      clickItem('[data-test-id="Enable Participation-toggle-switch"][aria-checked="false"]')
      validateElementIsVisible('[data-test-id="Enable Participation-toggle-switch"][aria-checked="true"]')
      inputText(CE.incentiveFieldName, challengeName)
      validateElementNotEnabled(CE.saveIncentiveButton)
      inputText(CE.incentiveFieldDescription, challengeDescription)
      validateElementEnabled(CE.saveIncentiveButton)
      clickItem(CE.shareIncentive)
      validateElementIsVisible('[data-test-id="Share this Incentive-toggle-switch"][aria-checked="true"]')

      clickItem(CE.addIncentiveSponsor)
      cy.uploadFile(coucouImage, png, sponsorFileInput).get(sponsorFileInput).trigger('change', {force: true})
      clickItem(CE.incentivePhotopicker)
      inputText(CE.incentiveSponsorName, sponsorName)
      inputText(CE.incentiveSponsorSite, `www.${sponsorName}.com`)
      clickItem(CE.incentiveSaveSponsor)
      validateElementIsVisible(`[data-test-id="dropdown-option-${sponsorName}"]`)
      cy.uploadFile(coucouImage, png, bannerFileInput).get(bannerFileInput).trigger('change', {force: true})
      clickItem(CE.incentivePhotopicker)
      clickItem(CE.incentiveBadgeIcon)
      clickItem(CE.balloonIcon)
      validateElementIsVisible('[data-test-id="dropdown-option-Balloon"]')
      findAndValidateElementVisible('[data-test-id="dropdown-option-Balloon"]', badgeIcon)
      inputText(`[data-test-id="awardAmount-input"]`, awardAmount)
      validateValue(`[data-test-id="awardAmount-input"]`, '$ 1,500')
      clearText(`[data-test-id="awardAmount-input"]`)
      clickItem('[data-test-id="dropdown-option-Singular Award Challenge"]')
      clickItem(`[data-test-id="Tiered-Awards-Challenge-button"]`)
      validateElementIsVisible(`[data-test-id="dropdown-option-Tiered Awards Challenge"]`)
      clickItem(`[data-test-id="field-Number of Tiers"]`)
      clickItem(`[data-test-id="3-button"]`)
      inputText(`[data-test-id="tier1-input"]`, tier1)
      inputText(`[data-test-id="tier2-input"]`, tier2)
      inputText(`[data-test-id="tier3-input"]`, tier3)
      inputText(`#text-field-minDonation`, minDonation)
      validateValue(`#text-field-minDonation`, '$ 1,000')
      inputText(`#text-field-maxDonation`, maxDonation)
      validateValue(`#text-field-maxDonation`, '$ 1,250')
      clickItem(`[data-test-id="dropdown-option-Top Performer in"]`)
      clickItem(`[data-test-id="First-to-Goal-in-button"]`)
      clickItem(`[data-test-id="dropdown-option-Fundraising"]`)
      inputText(`#text-field-goalAmount`, goalAmount)
      validateElementIsVisible(`[data-test-id="dropdown-option-Donors"]`)
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

      scrollToContainsElementWithTextIsVisible('[data-test-id="parentCell_0_1"]', 'button', challengeName)
      validateText('body', challengeDescription)
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

      scrollToContainsTextIsVisible('[data-test-id="startDateTime"]',  `${moment().format(`ddd, MMM Do YYYY`)} 1:00AM`)
      scrollToContainsTextIsVisible('[data-test-id="endDateTime"]',  `${moment().format(`ddd, MMM Do YYYY`)} 2:00AM`)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_6"]', `Tier 1: ${tier1}`)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_6"]', `Tier 2: ${tier2}`)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_6"]', `Tier 3: ${tier3}`)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_7"]', minDonation)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_8"]', maxDonation)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_9"]', 'FIRST_TO_GOAL')
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_11"]', sponsorName)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_12"]', activeStatus)
  })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit challenges page
    // 2. Add new challenge
    // 3. Verify that challenge has been created with correct data
  it('Story Context - Add new challenge', () => {
    const storyChallengesPath = `${url.adminHost}/incentives/challenges/org-3/init-2/sty-2`
    const runId = Math.floor(Math.random() * 10000)
    const challengeName = `Challenge ${runId}`
    const challengeDescription = `Challenge desc ${runId}`
    const sponsorName = `Challenge${runId}`


    visitPage(storyChallengesPath)
    clickItem(CE.addNewIncentiveButton)
    validateElementIsVisible(`[data-test-id="dropdown-option-New Challenge"]`)
    validateElementNotEnabled(CE.saveIncentiveButton)
    clickItem(CE.publishToggleReward)
    validateElementIsVisible('[data-test-id="Publish Now-toggle-switch"][aria-checked="true"]')
    clickItem(CE.participationToggleReward)
    validateElementIsVisible('[data-test-id="Enable Participation-toggle-switch"][aria-checked="true"]')
    inputText(CE.incentiveFieldName, challengeName)
    validateElementNotEnabled(CE.saveIncentiveButton)
    inputText(CE.incentiveFieldDescription, challengeDescription)
    validateElementEnabled(CE.saveIncentiveButton)
    clickItem(CE.shareIncentive)
    validateElementIsVisible('[data-test-id="Share this Incentive-toggle-switch"][aria-checked="true"]')

    clickItem(CE.addIncentiveSponsor)
    cy.uploadFile(coucouImage, png, sponsorFileInput).get(sponsorFileInput).trigger('change', {force: true})
    clickItem(CE.incentivePhotopicker)
    inputText(CE.incentiveSponsorName, sponsorName)
    inputText(CE.incentiveSponsorSite, `www.${sponsorName}.com`)
    clickItem(CE.incentiveSaveSponsor)
    validateElementIsVisible(`[data-test-id="dropdown-option-${sponsorName}"]`)
    cy.uploadFile(coucouImage, png, bannerFileInput).get(bannerFileInput).trigger('change', {force: true})
    clickItem(CE.incentivePhotopicker)
    clickItem(CE.incentiveBadgeIcon)
    clickItem(CE.balloonIcon)
    validateElementIsVisible('[data-test-id="dropdown-option-Balloon"]')
    findAndValidateElementVisible('[data-test-id="dropdown-option-Balloon"]', badgeIcon)
    inputText(`[data-test-id="awardAmount-input"]`, awardAmount)
    validateValue(`[data-test-id="awardAmount-input"]`, '$ 1,500')
    clearText(`[data-test-id="awardAmount-input"]`)
    clickItem('[data-test-id="dropdown-option-Singular Award Challenge"]')
    clickItem(`[data-test-id="Tiered-Awards-Challenge-button"]`)
    validateElementIsVisible(`[data-test-id="dropdown-option-Tiered Awards Challenge"]`)
    clickItem(`[data-test-id="field-Number of Tiers"]`)
    clickItem(`[data-test-id="3-button"]`)
    inputText(`[data-test-id="tier1-input"]`, tier1)
    inputText(`[data-test-id="tier2-input"]`, tier2)
    inputText(`[data-test-id="tier3-input"]`, tier3)
    inputText(`#text-field-minDonation`, minDonation)
    validateValue(`#text-field-minDonation`, '$ 1,000')
    inputText(`#text-field-maxDonation`, maxDonation)
    validateValue(`#text-field-maxDonation`, '$ 1,250')
    clickItem(`[data-test-id="dropdown-option-Top Performer in"]`)
    clickItem(`[data-test-id="First-to-Goal-in-button"]`)
    clickItem(`[data-test-id="dropdown-option-Fundraising"]`)
    clickItem(`[data-test-id="Gifts-button"]`)
    validateElementIsVisible(`[data-test-id="dropdown-option-Gifts"]`)
    inputText(`#text-field-goalAmount`, goalAmount)
    validateValue(`#text-field-goalAmount`, '10,000')
    validateElementIsVisible(`[data-test-id="dropdown-option-Donors"]`)
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

    scrollToContainsElementWithTextIsVisible('[data-test-id="parentCell_0_1"]', 'button', challengeName)
    validateText('body', challengeDescription)
    scrollToAndFindVisible('[data-test-id="parentCell_0_2"]', '[aria-checked="true"]')
    scrollToAndFindVisible('[data-test-id="parentCell_0_3"]', '[aria-checked="true"]')
    scrollToAndFindVisible('[data-test-id="parentCell_0_4"]', '[aria-checked="true"]')

    scrollToContainsTextIsVisible('[data-test-id="startDateTime"]',  `${moment().format(`ddd, MMM Do YYYY`)} 1:00AM`)
    scrollToContainsTextIsVisible('[data-test-id="endDateTime"]',  `${moment().format(`ddd, MMM Do YYYY`)} 2:00AM`)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_6"]', `Tier 1: ${tier1}`)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_6"]', `Tier 2: ${tier2}`)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_6"]', `Tier 3: ${tier3}`)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_7"]', minDonation)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_8"]', maxDonation)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_9"]', 'FIRST_TO_GOAL')
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_11"]', sponsorName)
    scrollToContainsTextIsVisible('[data-test-id="parentCell_0_12"]', activeStatus)
  })


    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit challenges page
    // 2. Add new challenge
    // 3. Verify that challenge has been created with correct data
    // 4. Add same challenge from 2 step
    // 5. Verify that new challenge is not created
  it('Story Context - Add existing challenge', () => {
    const storyChallengesPath = `${url.adminHost}/incentives/challenges/org-3/init-2/sty-3`
    const existingIncentive = fixture.ConfigureInitiativeIncentiveChallenges.existingIncentive
    const existingIncentiveDescription = fixture.ConfigureInitiativeIncentiveChallenges.existingIncentiveDescription

    visitPage(storyChallengesPath)
    clickItem(CE.addNewIncentiveButton)
    clickItem(`[data-test-id="Publish Now-toggle-switch"]`, .5)
    clickItem('[data-test-id="Enable Participation-toggle-switch"]', .5)
    inputText(CE.incentiveFieldName, existingIncentive)
    validateValue(CE.incentiveFieldName, existingIncentive)
    inputText(CE.incentiveFieldDescription, existingIncentiveDescription)
    validateValue(CE.incentiveFieldDescription, existingIncentiveDescription)
    validateElementIsVisible(`[data-test-id="dropdown-option-Donors"]`)
  })
})
