import {
    loginAs,
    logoutNoCheck,
    visitPage,
    clickItem,
    clickItemContains,
    inputText,
    validateText,
    validateElementEnabled,
    validateElementNotEnabled,
    validateElementContainsExist,
    validateUrlShouldContain,
    validateElementContainsIsVisible,
    validateValue,
    url
} from '../../../utils/utils'

import {
  Env
} from '../../../Config'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

describe('Smoke test - Setup story teller\'s team', () => {
    let storyIdea: any
    let fixture: any
    let userRole: any
    const dashboardUrl = '/dashboard'

    afterEach(() => {
        logoutNoCheck()
    })

    before(() => {
        cy.fixture('SmokeFixture').then((data) => {
            fixture = data
            userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
        })
    })

    it('accept story teller team member for new user', () => {
        const passwordMessage = 'Passwords must be at least 8 characters in length, have at least 1 uppercase letter, 1 lowercase letter, and 1 number.'

        cy.fixture('generated/setupStoryTeamStoryTellers').then((idea) => {
            expect(idea.email).to.exist
            storyIdea = idea
            visitPage(storyIdea.signupLink)

            inputText(CE.isf_firstName,storyIdea.firstName)
            inputText(CE.isf_lastName, storyIdea.lastName)
            inputText(CE.isf_phoneNumber, storyIdea.phoneNumber)
            validateText(CE.isf_loginId, storyIdea.email)
            validateElementNotEnabled(CE.isf_loginId)
            validateElementEnabled(CE.fieldPassword)
            inputText(CE.fieldPassword, storyIdea.password)
            validateElementEnabled(CE.fieldConfirmPassword)
            inputText(CE.fieldConfirmPassword, storyIdea.password)
            validateText(CE.smMessage, passwordMessage)
            validateElementContainsExist('button', 'Cancel')
            clickItemContains('button', 'Cancel')
            validateUrlShouldContain(dashboardUrl)
            validateText('[data-test-id="appbar-user-dropdown"]', `${storyIdea.firstName} ${storyIdea.lastName}`)
            clickItem(`[data-test-id="feature-menu-stories-button"]`, 5)
            clickItemContains('button', storyIdea.storyName)
            validateText(CE.isf_title, storyIdea.storyName)
            clickItem(`[data-test-id="feature-menu-team-button"]`)
            validateElementContainsIsVisible(`[data-test-id="team-member-data"]`, `${storyIdea.firstName} ${storyIdea.lastName}`)
            validateElementContainsIsVisible(`[data-test-id="team-member-data"]`, `${storyIdea.email}`)
        })
    })

    it('accept story teller team member for existing user', () => {
        cy.fixture('generated/setupStoryTeamStoryTellers').then((idea) => {
            expect(idea.email).to.exist
            storyIdea = idea

            loginAs(storyIdea.existingUser)
            validateUrlShouldContain(dashboardUrl)
            visitPage(`${url.adminHost}/stories`, 2)
            clickItemContains('button', storyIdea.storyName, 2)
            validateValue(`#text-field-title`, storyIdea.storyName)
            clickItem(`[data-test-id="feature-menu-team-button"]`)
            validateElementContainsIsVisible(`[data-test-id="team-member-data"]`, `${storyIdea.existingUser.userName}`)
        })
    })
})
