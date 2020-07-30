import {
  loginAs,
  logoutNoCheck,
  visitPage,
  clickItem,
  inputText,
  validateText,
  url
} from '../../../utils/utils'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

import {
  Env
} from '../../../Config'

describe('Smoke test - Data seeding', () => {
  const initTeamPath = `${url.adminHost}/team/org-3/init-2`
  const inviteTeamMember = 'Invite Team Member'
  const emailSent = 'Your email has been sent.'

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
    // 1. Visit initiative team page
    // 2. Invite new team member
    // 3. Verify that new member has been invited
  it('Invite initiative team member > QA local initiative2', () => {
      const member = fixture.DataSeeding.SubOrg1.Init1.TeamMembers.member1

      visitPage(initTeamPath)

      // Invite New Team Member
      clickItem(CE.inviteTeamMemberButton)
      inputText(`[data-test-id="invite-email"]`, member.email)
      clickItem(CE.sendTeamInviteButton)
      validateText('body', emailSent)
      validateText(`[data-test-id="header"]`, inviteTeamMember)
  })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit initiative team page
    // 2. Invite new team member
    // 3. Verify that new member has been invited
  it('Invite initiative team member > QA CI initiative2', () => {
      const member = fixture.DataSeeding.SubOrg1.Init1.TeamMembers.member2

      visitPage(initTeamPath)

      // Invite New Team Member
      clickItem(CE.inviteTeamMemberButton)
      inputText(`[data-test-id="invite-email"]`, member.email)
      clickItem(CE.sendTeamInviteButton)
      validateText('body', emailSent)
      validateText(`[data-test-id="header"]`, inviteTeamMember)

  })
})
