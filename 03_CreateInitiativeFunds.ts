import {
  loginAs,
  logoutNoCheck,
  visitPage,
  inputText,
  clickItem,
  clickPaymentToggle,
  validateText,
  validateElementIsNotVisible,
  validateElementEnabled,
  validateElementIsVisible,
  url,
} from '../../../utils/utils'

import {
  Env
} from '../../../Config'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

describe('Smoke test - Data seeding', () => {
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
    // 1. Verify that stripe donation is enabled
  it('create initiative fund - 3CORE, CA > Books for children > Payment Processor', () => {

      const initTeamPage = `${url.adminHost}${url.initTeamPath}`
      const initPaymentsPage = `${url.adminHost}${url.initPaymentsPath}`
      const initiativeSuccessMessage = 'Your Stripe Payment Setup is Complete'
      const stripeBasicButton ="[data-test-id=\"stripe-basic-button\"]"
      const saveConnectionButton ="[data-test-id=\"save-connection-button\"]"
      const stripeConnectionName = fixture.DataSeeding.SubOrg1.Init1.PaymentProcessor.stripeConnectionName
      const stripConnectionDescription = fixture.DataSeeding.SubOrg1.Init1.PaymentProcessor.stripConnectionDescription
      const stripeToken = fixture.DataSeeding.SubOrg1.Init1.PaymentProcessor.stripeToken
      const paymentToggleButton = `[data-test-id=\"payment_management-toggle-switch-${userRole.OrganizationAdministrator1.userId}\"]`
      const paymentProcessorName = '#text-field-name'
      const paymentProcessorDescription = '#text-area-description'
      const paymentProcessorKey = '#text-field-secretKey'

      visitPage(initTeamPage)
      validateElementIsVisible(paymentToggleButton)
      clickPaymentToggle(paymentToggleButton)
      visitPage(initPaymentsPage)
      clickItem(stripeBasicButton)
      inputText(paymentProcessorName, stripeConnectionName)
      inputText(paymentProcessorDescription, stripConnectionDescription)
      inputText(paymentProcessorKey, stripeToken)
      clickItem(saveConnectionButton)
      validateText('body', initiativeSuccessMessage)
  })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Add new fund with valid data
    // 2. Verify that fund created successfully
    // 3. Add new fund with valid data
    // 4. Verify that fund created successfully
  it('create initiative fund - 3CORE, CA > Books for children > Fund > BOOK', () => {
      const initFundsPage = `${url.adminHost}${url.initFundsPath}`
      const addFundButton = `[data-test-id="first-add-new-fund-button"]`
      const addFundButton2 = `[data-test-id="add-new-fund"]`
      const fundNameField = `[data-test-id="fund-name"]`
      const fundName1 = fixture.DataSeeding.SubOrg1.Init1.Fund1.name
      const fundName2 = fixture.DataSeeding.SubOrg1.Init1.Fund2.name
      const fundDialogButton = `[data-test-id="add-new-fund-dialogue-button"]`

      visitPage(initFundsPage)
      clickItem(addFundButton)
      inputText(fundNameField, fundName1)
      validateElementEnabled(fundDialogButton)
      clickItem(fundDialogButton)
      validateElementIsNotVisible(fundDialogButton)
      validateText('body', fundName1)

      clickItem(addFundButton2)
      inputText(fundNameField, fundName2)
      validateElementEnabled(fundDialogButton)
      clickItem(fundDialogButton)
      validateElementIsNotVisible(fundDialogButton)
      validateText('body', fundName2)
  })
})
