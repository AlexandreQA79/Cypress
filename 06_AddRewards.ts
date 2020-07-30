import {
  loginAs,
  logoutNoCheck,
  visitPage,
  clickItem,
  findAndClickItem,
  scrollToContainsElementWithTextIsVisible,
  scrollToAndFindVisible,
  scrollToContainsTextIsVisible,
  scrollToFindAndClick,
  inputText,
  clearText,
  validateText,
  validateElementIsVisible,
  validateElementIsNotVisible,
  findAndValidateElementVisible,
  validateElementEnabled,
  validateElementNotEnabled,
  validateValue,
  url
} from '../../../utils/utils'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

import {
  Env
} from '../../../Config'

import moment from 'moment-timezone'

describe('Smoke test - Data seeding', () => {
  const rewardPath = `${url.adminHost}${url.rewardPath}`

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

    // Preconditions
    // User is logged in
    //
    // Test Case Description
    // 1. Visit reward page
    // 2. Create scheduled reward
  it('Initiative Context - Add new reward > Books for children > 12 USD Gift card for movies', () => {
      const reward = fixture.DataSeeding.SubOrg1.Init1.RewardList.reward1
      const rewardName = reward.name
      const rewardDescription = reward.description
      const sponsorSite = `www.Books for children.com`
      const sponsorName = reward.sponsorName
      const sponsorNameRequired = fixture.ErrorList.sponsorNameRequired
      const coucouImage = fixture.generic.coucouImage
      const png = fixture.generic.png
      const sponsorFileInput = '#image-field-image'
      const bannerFileInput = "#image-field-bannerImage"
      const availableInventory = reward.availableInventory
      const maxDonation = '1'
      const minDonation = '10'
      const fieldScheduledStartDate = '[data-test-id="field-Scheduled Start Time"]'
      const dropdownOption= '[data-test-id="dropdown-option"]'
      const fieldScheduledEndDate= '[data-test-id="field-Scheduled End Time"]'
      const clickReward = '[data-test-id="1-edit-button"]'

      visitPage(rewardPath)
      clickItem(CE.addNewIncentiveButton, 2)
      validateElementNotEnabled(CE.saveIncentiveButton)

      //Fill in the form Reward
      clickItem(CE.publishToggleReward, 2)
      validateElementNotEnabled(CE.publishToggleReward)
      clickItem(CE.participationToggleReward, 2)
      validateElementNotEnabled(CE.participationToggleReward)
      inputText(CE.incentiveFieldName, rewardName)
      inputText(CE.incentiveFieldDescription, rewardDescription)
      clickItem(CE.shareIncentive, 2)
      validateElementNotEnabled(CE.shareIncentive)
      clickItem(CE.addIncentiveSponsor, 2)
      cy.uploadFile(coucouImage, png, sponsorFileInput).get(sponsorFileInput).trigger('change', {
          force: true
      })
      clickItem(CE.incentivePhotopicker, 2)
      inputText(CE.incentiveSponsorName, sponsorName)
      inputText(CE.incentiveSponsorSite, sponsorSite)
      clearText(CE.incentiveSponsorName)
      validateText(CE.smMessage, sponsorNameRequired)
      inputText(CE.incentiveSponsorName, sponsorName)
      validateValue(CE.incentiveSponsorName, sponsorName)
      clickItem(CE.incentiveSaveSponsor)
      cy.uploadFile(coucouImage, png, bannerFileInput).get(bannerFileInput).trigger('change', {
            force: true
          })
      clickItem(CE.incentivePhotopicker, 2)
      clickItem(CE.incentiveBadgeIcon, 2)
      clickItem(CE.balloonIcon, 2)
      validateElementNotEnabled(CE.saveIncentiveButton)
      inputText(CE.rewardFieldMinDonation, minDonation)
      clickItem(CE.saveIncentiveButton, 2)
      clickItem(clickReward,2)
      inputText(CE.rewardInventory, availableInventory)
      inputText(CE.rewardFieldMaxDonation, maxDonation)
      clickItem(CE.rewardDropdownApplicable, 2)
      clickItem(CE.rewardEmailButton, 2)
      validateElementIsVisible(CE.incentiveScheduleButton)
      clickItem(CE.incentiveScheduleButton, 2)
      //scheduling
      clickItem(CE.incentiveStartDate, 2)
      clickItem(CE.incentiveDatePicker, 2)
      findAndClickItem(fieldScheduledStartDate,dropdownOption)
      clickItem(CE.incentiveStartTime, 2)
      clickItem(CE.incentiveEndDate, 1)
      clickItem(CE.incentiveDatePicker, 2)
      findAndClickItem(fieldScheduledEndDate,dropdownOption)
      clickItem(CE.incentiveEndTime, 2)
      clickItem(CE.incentiveRunManually)
      clickItem(CE.saveIncentiveButton)
      scrollToAndFindVisible(`[data-test-id="parentCell_0_2"]`, '[aria-checked="true"]')
      scrollToAndFindVisible(`[data-test-id="parentCell_0_3"]`, '[aria-checked="true"]')
      scrollToAndFindVisible(`[data-test-id="parentCell_0_4"]`, '[aria-checked="true"]')
      scrollToFindAndClick(`[data-test-id="parentCell_0_2"]`,'[aria-checked="true"]', 1)
      scrollToAndFindVisible(`[data-test-id="parentCell_0_2"]`, '[aria-checked="false"]')
      scrollToFindAndClick(`[data-test-id="parentCell_0_3"]`,'[aria-checked="true"]', 1)
      scrollToAndFindVisible(`[data-test-id="parentCell_0_3"]`, '[aria-checked="false"]')
      scrollToFindAndClick(`[data-test-id="parentCell_0_4"]`,'[aria-checked="true"]', 1)
      scrollToAndFindVisible(`[data-test-id="parentCell_0_4"]`, '[aria-checked="false"]')
      scrollToFindAndClick(`[data-test-id="parentCell_0_2"]`,'[aria-checked="false"]')
      scrollToAndFindVisible(`[data-test-id="parentCell_0_2"]`, '[aria-checked="true"]' )
      scrollToFindAndClick(`[data-test-id="parentCell_0_3"]`,'[aria-checked="false"]' , 1)
      scrollToAndFindVisible(`[data-test-id="parentCell_0_3"]`, '[aria-checked="true"]')
      scrollToFindAndClick(`[data-test-id="parentCell_0_4"]`,'[aria-checked="false"]', 1)
      scrollToAndFindVisible(`[data-test-id="parentCell_0_4"]`, '[aria-checked="true"]')
  })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit reward page
    // 2. Fill reward form with valid data
    // 3. Add scheduling to reward
  it('Initiative Context - Add new reward > Books for children > Coffee card', () => {
      const reward = fixture.DataSeeding.SubOrg1.Init1.RewardList.reward2
      const rewardName = reward.name
      const sponsorSite = 'www.Coffee card.com'
      const rewardDescription = reward.description
      const sponsorName = reward.sponsorName
      const sponsorNameRequired = fixture.ErrorList.sponsorNameRequired
      const coucouImage = fixture.generic.coucouImage
      const png = fixture.generic.png
      const sponsorFileInput = '#image-field-image'
      const bannerFileInput = "#image-field-bannerImage"
      const availableInventory = reward.availableInventory
      const minDonation = '10'
      const maxDonation = '1'
      const fieldScheduledStartDate = '[data-test-id="field-Scheduled Start Time"]'
      const dropdownOption= '[data-test-id="dropdown-option"]'
      const fieldScheduledEndDate= '[data-test-id="field-Scheduled End Time"]'
      const clickReward= '[data-test-id="2-edit-button"]'

      visitPage(rewardPath)

      clickItem(CE.addNewIncentiveButton, 2)
      validateElementNotEnabled(CE.saveIncentiveButton)

      // //'Fill in the form
      inputText(CE.incentiveFieldName, rewardName)
      inputText(CE.incentiveFieldDescription, rewardDescription)
      clickItem(CE.addIncentiveSponsor,2)
      cy.uploadFile(coucouImage, png, sponsorFileInput).get(sponsorFileInput).trigger('change', {force: true})
      clickItem(CE.incentivePhotopicker, 2)
      inputText(CE.incentiveSponsorName, sponsorName)
      inputText(CE.incentiveSponsorSite, sponsorSite)
      clearText(CE.incentiveSponsorName)
      validateText(CE.smMessage, sponsorNameRequired)
      inputText(CE.incentiveSponsorName, sponsorName)
      validateValue(CE.incentiveSponsorName, sponsorName)
      clickItem(CE.incentiveSaveSponsor)
      cy.uploadFile(coucouImage, png, bannerFileInput).get(bannerFileInput).trigger('change', {force: true})
      clickItem(CE.incentivePhotopicker, 2)
      clickItem(CE.incentiveBadgeIcon, 2)
      clickItem(CE.balloonIcon, 2)
      validateElementNotEnabled(CE.saveIncentiveButton)
      inputText(CE.rewardFieldMinDonation, minDonation)
      clickItem(CE.saveIncentiveButton, 2)
      clickItem(clickReward,2)
      inputText(CE.rewardInventory, availableInventory)
      inputText(CE.rewardFieldMaxDonation, maxDonation)
      clickItem(CE.rewardDropdownApplicable, 2)
      clickItem(CE.rewardEmailButton, 2)
      validateElementIsVisible(CE.incentiveScheduleButton)
      clickItem(CE.incentiveScheduleButton, 2)

       //scheduling
       clickItem(CE.incentiveStartDate, 2)
       clickItem(CE.incentiveDatePicker, 2)
       findAndClickItem(fieldScheduledStartDate,dropdownOption)
       clickItem(CE.incentiveStartTime, 2)
       clickItem(CE.incentiveEndDate, 1)
       clickItem(CE.incentiveDatePicker, 2)
       findAndClickItem(fieldScheduledEndDate,dropdownOption)
       clickItem(CE.incentiveEndTime, 2)
       clickItem(CE.incentiveRunManually)
       clickItem(CE.saveIncentiveButton, 2)
  })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit Story reward page
    // 2. Publish story
    // 3. Create new reward with scheduling
  it('Story Context - Add new reward', () => {
    const storyRewardsPath = `${url.adminHost}/incentives/rewards/org-3/init-2/sty-2`
    const runId = Math.floor(Math.random() * 10000)
    const rewardName = `reward ${runId}`
    const rewardDescription = `reward desc ${runId}`
    const sponsorName = `sponsor${runId}`
    const coucouImage = fixture.generic.coucouImage
    const png = fixture.generic.png
    const sponsorFileInput = '#image-field-image'
    const bannerFileInput = "#image-field-bannerImage"

    const storyTitle3 = fixture.ConfigureInitiativeIncentiveRewards.storyTitle3
    const availableInventory = '5000'
    const minDonation = '3639'
    const maxDonation = '1000'
    const activeStatus = fixture.generic.activeStatus

    visitPage(storyRewardsPath)

    clickItem(CE.addNewIncentiveButton, 2)
    validateElementNotEnabled(CE.saveIncentiveButton)

    clickItem(CE.publishToggleReward, 2)
    validateElementNotEnabled(CE.publishToggleReward)
    clickItem(CE.participationToggleReward, 2)
    validateElementNotEnabled(CE.participationToggleReward)

    // //'Fill in the form
    inputText(CE.incentiveFieldName, rewardName)
    inputText(CE.incentiveFieldDescription, rewardDescription)

    clickItem(CE.shareIncentive, 2)
    validateElementNotEnabled(CE.shareIncentive)

    clickItem(CE.addIncentiveSponsor,2)
    cy.uploadFile(coucouImage, png, sponsorFileInput).get(sponsorFileInput).trigger('change', {force: true})
    clickItem(CE.incentivePhotopicker, 2)
    inputText(CE.incentiveSponsorName, sponsorName)
    inputText(CE.incentiveSponsorSite, `www.${sponsorName}.com`)
    clickItem(CE.incentiveSaveSponsor)
    cy.uploadFile(coucouImage, png, bannerFileInput).get(bannerFileInput).trigger('change', {force: true})
    clickItem(CE.incentivePhotopicker, 2)
    clickItem(CE.incentiveBadgeIcon, 2)
    clickItem(CE.balloonIcon, 2)
    validateElementNotEnabled(CE.saveIncentiveButton)
    inputText(CE.rewardFieldMinDonation, minDonation)
    validateValue(CE.rewardFieldMinDonation, '$ 3,639')
    validateElementEnabled(CE.saveIncentiveButton)
    inputText(CE.rewardInventory, availableInventory)
    validateValue(CE.rewardInventory, '5,000')
    inputText(CE.rewardFieldMaxDonation, maxDonation)
    validateValue(CE.rewardFieldMaxDonation, '1,000')

    clickItem(CE.rewardDropdownApplicable, 2)
    clickItem(CE.rewardEmailButton, 2)
    validateElementIsVisible(CE.incentiveScheduleButton)
    clickItem(CE.incentiveScheduleButton, 2)

    clickItem('[data-test-id="field-Eligible Beneficiaries"]')
    clickItem('[data-test-id="select-all-button"]')
    validateText('[data-test-id="selected-options"]', storyTitle3)
    clickItem('[data-test-id="close-dialog-button"]')
    validateElementIsNotVisible('[data-test-id="close-dialog-button"]')

     //scheduling
     clickItem(CE.incentiveStartDate)
     clickItem(CE.incentiveDatePicker)
     findAndClickItem('[data-test-id="field-Scheduled Start Time"]', '[data-test-id="dropdown-option"]')
     clickItem(CE.incentiveStartTime)
     clickItem(CE.incentiveEndDate)
     clickItem(CE.incentiveDatePicker)
     findAndClickItem('[data-test-id="field-Scheduled End Time"]', '[data-test-id="dropdown-option"]')
     clickItem(CE.incentiveEndTime)
     clickItem(CE.saveIncentiveButton, 2)

     scrollToContainsElementWithTextIsVisible('[data-test-id="parentCell_0_1"]', 'button', rewardName)
     validateText('body', rewardDescription)
     scrollToAndFindVisible(`[data-test-id="parentCell_0_2"]`, '[aria-checked="true"]')
     scrollToAndFindVisible(`[data-test-id="parentCell_0_3"]`, '[aria-checked="true"]')
     scrollToAndFindVisible(`[data-test-id="parentCell_0_4"]`, '[aria-checked="true"]')
     scrollToContainsTextIsVisible(`[data-test-id="startDateTime"]`, `${moment().format(`ddd, MMM Do YYYY`)} 1:00AM`)
     scrollToContainsTextIsVisible(`[data-test-id="parentCell_0_6"]`, availableInventory)
     scrollToContainsTextIsVisible(`[data-test-id="parentCell_0_7"]`, storyTitle3)
     scrollToContainsElementWithTextIsVisible('[data-test-id="parentCell_0_8"]', 'button', sponsorName)
     scrollToContainsTextIsVisible('[data-test-id="parentCell_0_9"]', activeStatus)
  })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit story reward page
    // 2. Create new reward
    // 3. Create the identical reward from previous step
    // 4. Verify that identical reward is not created
  it('Story Context - Add existing reward', () => {
    const storyRewardsPath = `${url.adminHost}/incentives/rewards/org-3/init-2/sty-3`
    const runId = Math.floor(Math.random() * 10000)
    const newRewardName = `exist ${runId}`
    const badgeIcon= '[d="M13.16,12.74L14,14H12.5C12.35,16.71 12,19.41 11.5,22.08L10.5,21.92C11,19.3 11.34,16.66 11.5,14H10L10.84,12.74C8.64,11.79 7,8.36 7,6A5,5 0 0,1 12,1A5,5 0 0,1 17,6C17,8.36 15.36,11.79 13.16,12.74Z"]'
    const availableInventory = '100'
    const existingInitiativeReward = fixture.ConfigureInitiativeIncentiveRewards.existingInitiativeReward
    const existingRewardDescription = fixture.ConfigureInitiativeIncentiveRewards.existingRewardDescription
    const notSharedInitiativeReward = fixture.ConfigureInitiativeIncentiveRewards.notSharedInitiativeReward
    const rewardName = 'Test Reward'
    const rewardDescription = 'Test Reward'
    const minDonation = `5`
    const fairMarketValue = `5`

    visitPage(storyRewardsPath)
    clickItem(CE.addNewIncentiveButton)
    inputText(CE.incentiveFieldName, rewardName)
    inputText(CE.incentiveFieldDescription, rewardDescription)
    inputText(CE.rewardFieldMinDonation, minDonation)
    inputText('#text-field-fairMarketValue', fairMarketValue)
    clickItem(CE.saveIncentiveButton, .5)

    clickItem(CE.addExistingIncentiveButton)
    clickItem('[data-test-id="dropdown-option"]')
    validateElementIsNotVisible(notSharedInitiativeReward)
    clickItem('[data-test-id="12-USD-Gift-card-for-movies-button"]')
    clickItem('[data-test-id="add-reward-button"]')
    clickItem('[data-test-id="add-reward-cancel-button"]')

    clickItem('[data-test-id="1-edit-button"]')
    validateElementNotEnabled(CE.saveIncentiveButton)
    validateElementIsVisible('[data-test-id="Publish Now-toggle-switch"][aria-checked="true"]')
    validateValue(CE.incentiveFieldName, existingInitiativeReward)
    validateValue(CE.incentiveFieldDescription, existingRewardDescription)
    validateElementIsVisible('[data-test-id="Share this Incentive-toggle-switch"][aria-checked="true"]')
    validateElementIsVisible(CE.addIncentiveSponsor)
    validateElementIsVisible('[data-test-id="dropdown-option-Balloon"]')
    findAndValidateElementVisible('[data-test-id="dropdown-option-Balloon"]', badgeIcon)
    validateElementNotEnabled(CE.saveIncentiveButton)
    validateValue(CE.rewardInventory, availableInventory)
    validateValue(CE.rewardFieldMaxDonation, '1')
    validateElementIsVisible('[data-test-id="dropdown-option-E-Mail"]')
    validateElementNotEnabled('[data-test-id="save-selection"]')
    clickItem(CE.incentiveScheduleButton)
    validateElementIsVisible(CE.incentiveRunManually)

    inputText(CE.incentiveFieldName, newRewardName)
    validateElementEnabled(CE.saveIncentiveButton)
    clickItem(CE.saveIncentiveButton)

    scrollToContainsElementWithTextIsVisible('[data-test-id="parentCell_0_1"]', 'button', newRewardName)
    validateText('body', existingRewardDescription)
    scrollToAndFindVisible(`[data-test-id="parentCell_0_2"]`, '[aria-checked="true"]')
    scrollToAndFindVisible(`[data-test-id="parentCell_0_3"]`, '[aria-checked="true"]')
  })
})
