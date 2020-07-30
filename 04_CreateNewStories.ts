import {
  loginAs,
  logoutNoCheck,
  visitPage,
  clickItem,
  clickPaymentToggle,
  findAndClickItem,
  inputText,
  validateText,
  validateElementExists,
  validateElementIsVisible,
  validateElementEnabled,
  validateElementNotEnabled,
  validateElementContainsIsVisible,
  validateValue,
  url
} from '../../../utils/utils'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

import {
  Env
} from '../../../Config'

describe('Smoke test - Data seeding', () => {
  let fixture: any
  let userRole: any

  let storyRemainingLength: string
  let storySummaryLength: string
  let storySummaryRemainingLength: string
  let paymentToggleButton: string

  // Visited URLS
  const storiesDashboard = `${url.adminHost}${url.initStoriesDashboard}`
  const teamPath = `${url.adminHost}/team/org-3/init-2`
  const championsPath = `${url.adminHost}/champions/org-3/init-2/sty-2`
  const storyTeamPath = `${url.adminHost}/team/org-3/init-2/sty-2`
  const inititativePath = `${url.adminHost}/initiatives/org-3/init-2`

  before(() => {
      cy.fixture('SmokeFixture').then((data) => {
          fixture = data
          userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
          storyRemainingLength = fixture.CreateEditStory.storyRemainingLength
          storySummaryLength = fixture.CreateEditStory.storySummaryLength
          storySummaryRemainingLength = fixture.CreateEditStory.storySummaryRemainingLength
          paymentToggleButton = `[data-test-id=\"payment_management-toggle-switch-${userRole.OrganizationAdministrator1.userId}\"]`
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
  // 1. Visit stories dashboard page
  // 2. Create new story
  // 3. Verify that Story was created
  // 4. Create Story impact
  // 5. Enable payment management
  // 6. Navigate to payment tab
  // 7. Add new fund
  // 8. Verify that new fund was created
  // 9. Visit Team page for a story
  // 10. Invite 2 New Users as StoryTaller
  // 11. Verify that Users were invited
  // 12. Visit Story dashboard
  // 13. Approve the Story
  // 14. Verify that Story was approved
  // 15. Publish the Story
  // 16. Verify that Story was published
  // 17. Disable donation
  // 18. Verify that donation was disabled
  // 19. Visit Champions page
  // 20. Invite 2 New Champions
  // 21. Verify that champions were invited
  // 22. Visit Story dashboard
  // 23. Invite 2 New Team members
  // 24. Verify that team members were invited
  // 25. Visit Initiative dashboard
  // 26. Publish the Initiative
  // 27. Verify that Initiative was published
  it(`Initiative context - Create New Story > All Disney 1`, () => {

    const storyFunds = `${url.adminHost}${url.initStoryFundsPath}`
    const storyDashboard = `${url.adminHost}/stories/about/org-3/init-2/sty-2`
    const story = fixture.DataSeeding.SubOrg1.Init1.StoryList.Story1
    const storyName = story.name
    const storySlug = storyName.replace(new RegExp(' ', 'g'), '').toLowerCase()
    const summary = story.summary
    const successMessage = `Story ${storyName} created`
    const updateSuccessMsg = `Story ${storyName} updated`
    const monetaryGoal = story.monetaryGoal
    const participantGoal = story.participantGoal
    const fund1 = story.fund1
    const champion1 = story.champion1
    const champion2 = story.champion2
    const teamMembers = fixture.DataSeeding.SubOrg1.Init1.TeamMembers
    const organization = fixture.DataSeeding.SubOrg1.name
    const orgDropdown = `[data-test-id="dropdown-option-${organization}"]`
    const fundsOption = `[data-test-id="${fund1}-button"]`
    const fundsOption2 = `[data-test-id="Clean-Water-Project-button"]`

    // Visit stories dashboard after login
    visitPage(storiesDashboard)

    // Create Story
    clickItem(CE.createStoryButton)
    inputText(CE.storyNameField, storyName)
    inputText(CE.slugField, storySlug)
    validateText(CE.smMessage, storyRemainingLength)
    clickItem(orgDropdown, 1)
    validateElementExists(CE.cancelButton)
    clickItem(CE.saveButton)
    validateText('body', successMessage)
    validateValue(CE.titleField, storyName)
    validateText(CE.smMessage, storySummaryLength)
    inputText(CE.summaryField, summary)
    validateText(CE.smMessage, storySummaryRemainingLength)
    clickItem(CE.saveChangesButton)
    validateText('body', updateSuccessMsg)
    validateElementExists(CE.aboutButton)

    // Story impact
    clickItem(CE.impactButton)
    inputText(CE.monetaryGoalField, monetaryGoal)
    inputText(CE.participantGoalField, participantGoal)

    // Enable payment management
    visitPage(teamPath)
    validateElementIsVisible(paymentToggleButton)
    clickPaymentToggle(paymentToggleButton)

    // Payment Tab
    // Add funds
    visitPage(storyFunds)
    clickItem(CE.fundsButton)
    clickItem(CE.associateButton)
    clickItem(CE.fundsDropdown)
    clickItem(fundsOption)
    findAndClickItem(CE.dialog, CE.associateButton)
    validateText('body', 'New fund associated to story')

    clickItem(CE.fundsButton)
    clickItem(CE.associateButton)
    clickItem(CE.fundsDropdown)
    clickItem(fundsOption2)
    findAndClickItem(CE.dialog, CE.associateButton)
    validateText('body', 'New fund associated to story')

    // Invite Story Teller 1
    visitPage(storyTeamPath)
    clickItem(CE.inviteTeamMemberButton)
    inputText(CE.teamMemberEmailField, story.teller1)
    clickItem(CE.sendTeamInviteButton)
    validateText('body', 'Your email has been sent.')

    // Invite Story Teller 2
    visitPage(storyTeamPath)
    clickItem(CE.inviteTeamMemberButton)
    inputText(CE.teamMemberEmailField, story.teller2)
    validateText(`[data-test-id="dropdown-option-${storyName}"]`, storyName)
    validateElementNotEnabled(`[data-test-id="dropdown-option-${storyName}"]`)
    validateElementIsVisible(`[data-test-id="dropdown-option-STORY_TELLER"]`)
    validateElementNotEnabled(`[data-test-id="dropdown-option-STORY_TELLER"]`)
    validateElementEnabled(`[data-test-id="invite-cancel"]`)
    clickItem(CE.sendTeamInviteButton)
    validateText('body', 'Your email has been sent.')

    //invite existing user
    clickItem(`[data-test-id="back-to-champion-button"]`)
    clickItem(CE.inviteTeamMemberButton)
    inputText(CE.teamMemberEmailField, userRole.TestAdminAccount.userName)
    clickItem(CE.sendTeamInviteButton)
    validateText('body', 'Your email has been sent.')

    cy.wait(3000)
    cy.task("gmail:get-messages", {
      options: {
          from: "info@communityfunded.com",
          to: userRole.TestAdminAccount.userName,
          subject: "Welcome to the team!",
          include_body: true
      }
    })
    .then(emails => {
        assert.isAtLeast(emails ? emails.length: '', 1,"No email found!"
        );
        cy.log('Email found: ', emails.length)
        const body = emails[0].body.html;
        //cy.log(body)
        const lookFor = `You've been added as a team member of "${storyName}"`
        cy.log('Looking for email content', lookFor)
        assert.isTrue(
            body.indexOf(
                lookFor
            ) >= 0,
            "Validate email found"
        );

        var el = document.createElement( 'html' );
        el.innerHTML = body
        //console.log(el)
        el.querySelector('div>a')

        const signupLink = el.querySelector('div>a')
        cy.log('The signup link is: ', signupLink?signupLink.href:null)
        const testOutput = {
            email: userRole.TestAdminAccount.userName,
            signupLink: signupLink?signupLink.href:null,
            storyName: storyName,
            firstName: userRole.TestAdminAccount.firstName,
            lastName: userRole.TestAdminAccount.lastName,
            phoneNumber: '4637273727',
            password: 'Bonjour@123',
            existingUser: userRole.TestAdminAccount
        }
        cy.writeFile('cypress/fixtures/generated/setupStoryTeamStoryTellers.json', testOutput)
    })
    // Approval
    visitPage(storyDashboard)
    clickItem(CE.publishingTab, 1)
    clickItem(CE.subMenuApprovalButton)
    clickItem(CE.adminDropdown, 1)
    clickItem(CE.approveStoryButton, 2)

    // Publishing
    clickItem(CE.subMenuPublishingButton)
    clickItem(CE.publishStoryButton)
    validateText('body', 'This story is published live on the web.')

    // Disable Donations
    clickItem(`[data-test-id="donations-disable-button"]`)
    validateText('body', 'Donations Enabled')

    // Invite Champion 1
    visitPage(championsPath)
    clickItem(CE.inviteChampionsButton)
    inputText(CE.championEmailField, champion1)
    clickItem(CE.sendInviteButton)
    validateText('body', 'Your email has been sent.')

    // Invite Champion 2
    visitPage(championsPath)
    clickItem(CE.inviteChampionsButton)
    inputText(CE.championEmailField, champion2)
    clickItem(CE.sendInviteButton)
    validateText('body', 'Your email has been sent.')

    // Invite Team Member 1
    visitPage(storyTeamPath)
    clickItem(CE.inviteTeamMemberButton)
    inputText(CE.teamMemberEmailField, teamMembers.member1.email)
    clickItem(CE.sendTeamInviteButton)
    validateText('body', 'Your email has been sent.')

    // Invite Team Member 2
    visitPage(storyTeamPath)
    clickItem(CE.inviteTeamMemberButton)
    inputText(CE.teamMemberEmailField, teamMembers.member2.email)
    clickItem(CE.sendTeamInviteButton)
    validateText('body', 'Your email has been sent.')

    // Initiative publishing
    visitPage(inititativePath)
    clickItem(CE.publishingTab)
    clickItem(CE.homePageButton)
    clickItem(CE.comingSoonButton)
    clickItem(CE.ideaSubmissionFormButton, 1)
    validateText(`body`, 'This page is currently live')
    clickItem(CE.donationsEnabledButton, 1)
    validateText(`body`, 'Initiative is accepting donations')
  })

  // Preconditions:
  // User is logged in
  //
  // Test Case Description
  // 1. Visit Stories dashboard
  // 2. Create New Story
  // 3. Verify that story is created successfully
  // 4. Add story impact
  // 5. Visit Team page
  // 6. Enable payment management
  // 7. Visit Funds page
  // 8. Add new fund
  // 9. Approve the story
  // 10. Verify that story is approved
  // 11. Publish the story
  // 12. Verify that story was published
  it(`Initiative context - Create New Story > All Disney 2`, () => {
    const storyFunds = `${url.adminHost}/stories/payments/org-3/init-2/sty-3`
    const story = fixture.DataSeeding.SubOrg1.Init1.StoryList.Story2
    const organization = fixture.DataSeeding.SubOrg1.name
    const storyName = story.name
    const summary = story.summary
    const successMessage = `Story ${storyName} created`
    const updateSuccessMsg = `Story ${storyName} updated`
    const storyRemainingLength = fixture.CreateEditStory.storyRemainingLength
    const storySummaryLength = fixture.CreateEditStory.storySummaryLength
    const storySummaryRemainingLength = fixture.CreateEditStory.storySummaryRemainingLength
    const monetaryGoal = story.monetaryGoal
    const participantGoal = story.participantGoal
    const fund1 = story.fund1
    const orgDropdown = `[data-test-id="dropdown-option-${organization}"]`
    const fundsOption = `[data-test-id="${fund1}-button"]`

    // Visit stories dashboard after login
    visitPage(storiesDashboard)

    //Create Story
    clickItem(CE.createStoryButton)
    inputText(CE.storyNameField, storyName)
    validateText(CE.smMessage, storyRemainingLength)
    clickItem(orgDropdown, 1)
    validateElementExists(CE.cancelButton)
    clickItem(CE.saveButton)
    validateText('body', successMessage)
    validateValue(CE.titleField, storyName)
    validateText(CE.smMessage, storySummaryLength)
    inputText(CE.summaryField, summary)
    validateText(CE.smMessage, storySummaryRemainingLength)
    clickItem(CE.saveChangesButton)
    validateText('body', updateSuccessMsg)
    validateElementExists(CE.aboutButton)

    // Story impact
    clickItem(CE.impactButton)
    inputText(CE.monetaryGoalField, monetaryGoal)
    inputText(CE.participantGoalField, participantGoal)

    // Enable payment management
    visitPage(teamPath)
    validateElementIsVisible(paymentToggleButton)
    clickPaymentToggle(paymentToggleButton)

    // Funds
    visitPage(storyFunds)
    clickItem(CE.fundsButton)
    clickItem(CE.associateButton)
    clickItem(CE.fundsDropdown)
    clickItem(fundsOption)
    findAndClickItem(CE.dialog, CE.associateButton)
    validateText('body', 'New fund associated to story')

    // Approval
    clickItem(CE.publishingTab, 1)
    clickItem(CE.subMenuApprovalButton)
    clickItem(CE.adminDropdown, 1)
    clickItem(CE.approveStoryButton, 2)

    // Publishing
    clickItem(CE.subMenuPublishingButton)
    clickItem(CE.publishStoryButton)
    validateText('body', 'This story is published live on the web.')
  })

  it('Initiative context - STY-D-01-1: Select to Create and Edit New Story', () => {
    let uniqid = require('uniqid')
    const runId = uniqid()
    const storyName = `Story ${runId}`
    const storySlug = storyName.replace(new RegExp(' ', 'g'), '').toLowerCase()
    const summary = `summary ${runId}`
    const updateSuccessMsg = `Story ${storyName} updated`
    const storyRemainingLength = fixture.CreateEditStory.storyRemainingLength
    const storySummaryLength = fixture.CreateEditStory.storySummaryLength
    const storySummaryRemainingLength = fixture.CreateEditStory.storySummaryRemainingLength
    const about = 'About'
    const storyPage = `${url.adminHost}${url.initStoriesDashboard}`

    visitPage(storyPage)
    clickItem(CE.createStoryButton)
    inputText(CE.storyNameField, storyName)
    validateElementContainsIsVisible(CE.smMessage, storyRemainingLength)
    inputText(CE.slugField, storySlug)
    clickItem('[data-test-id="dropdown-option-Books for children"]', 1)
    validateElementEnabled(CE.cancelButton)
    clickItem(CE.saveButton, 1)
    validateValue(CE.titleField, storyName)
    validateElementContainsIsVisible(CE.smMessage, storySummaryLength)
    inputText(CE.summaryField, summary)
    validateElementContainsIsVisible(CE.smMessage, storySummaryRemainingLength)
    clickItem(CE.saveChangesButton, 1)
    validateText('body', updateSuccessMsg)
    validateText(CE.aboutButton, about)
})
})
