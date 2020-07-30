import {
  loginAs,
  logoutNoCheck,
  visitPage,
  clickItem,
  inputText,
  validateText,
  validateElementIsVisible,
  url
} from '../../../utils/utils'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

import {
  Env
} from '../../../Config'


describe('Create and Publish INIT', () => {

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
  // 1. Visit Initiative page
  // 2. Create new initiative
  // 3. Verify that Coming Soon page is correct
  it('create initiative - 3CORE, CA > The 3 Best Bike Rides', () => {
    const orgInitPath = `${url.adminHost}${url.orgInitPath}`
    const initName = fixture.DataSeeding.SubOrg1.Init2.name

    visitPage(orgInitPath)
    clickItem(`[data-test-id="create-new-initiative-button"]`)
    inputText(`#text-field-initiativeName`, initName)
    clickItem(CE.saveButton)
    validateElementIsVisible(CE.summaryField)
    clickItem(CE.publishingTab)
    clickItem(CE.homePageButton)
    clickItem(CE.comingSoonButton)
    validateText('body', 'This page is currently live')
    })
})
