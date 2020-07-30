import {
  visitPage,
  clickItem,
  clickItemContains,
  inputText,
  validateText,
  validateValue,
  validateElementContainsTextNotEnabled,
  validateCheckboxIsChecked,
  validateCheckboxIsNotChecked,
  url
} from '../../../utils/utils'

import {
  Env
} from '../../../Config'

//const faker = require('faker');
import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'


describe('Publish and fill out idea submission form', () => {
  let fixture: any

  before(() => {
      cy.fixture('SmokeFixture').then((data) => {
          fixture = data;
          //let userRole: any;
      })
  })

  it('Submit Story Idea Submission Form > Action Story Idea', () => {
    const activeIdeaPage = `${url.publicHost}${url.activeIdeaPath}`
    const story = fixture.DataSeeding.SubOrg1.Init1.StoryList.StoryIdea1
    const firstName = story.firstName
    const lastName = story.lastName
    const email = story.email
    const phoneNumber = story.phoneNumber
    const storyTitle = story.name
    const storyIdea = story.summary
    const fundraisingGoal = story.monetaryGoal
    const fundraisingGoalDisplay = story.monetaryGoalDisplay
    const duration = story.duration
    const submitStoryIdeaButtonTxt = fixture.PublishInitiativeStoryIdeaSubmissionForm.submitStoryIdeaButtonTxt
    const confirmationMsg = 'Thank you for submitting your idea! Check your email for confirmation and next steps.'
    

    visitPage(activeIdeaPage)
    cy.pause()
    inputText(CE.isf_firstName, firstName)
    inputText(CE.isf_lastName, lastName)
    inputText(CE.isf_email, email)
    inputText(CE.isf_phoneNumber, phoneNumber)
    inputText(CE.isf_title, storyTitle)
    inputText(CE.isf_summary, storyIdea)
    inputText(CE.isf_goal, fundraisingGoal)
    inputText(CE.isf_duration, duration)
    validateElementContainsTextNotEnabled('button', submitStoryIdeaButtonTxt)
    validateCheckboxIsNotChecked(CE.isf_agreeToTerms)
    clickItem(CE.isf_agreeToTerms)
    validateCheckboxIsChecked(CE.isf_agreeToTerms)
    validateValue(CE.isf_firstName, firstName)
    validateValue(CE.isf_lastName, lastName)
    validateValue(CE.isf_email, email)
    validateValue(CE.isf_phoneNumber, phoneNumber)
    validateValue(CE.isf_title, storyTitle)
    validateValue(CE.isf_summary, storyIdea)
    validateValue(CE.isf_goal, fundraisingGoalDisplay)
    validateValue(CE.isf_duration, duration)
    clickItemContains('button', submitStoryIdeaButtonTxt, 1)
    validateText('body', confirmationMsg)
    // The email functionality needs to be fixed. The current method of retrieving the email is not working.
    // checkEmail(from, to, subject, searchTerm)
  })
})
