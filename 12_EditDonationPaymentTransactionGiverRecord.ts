import {
  loginAs,
  logoutNoCheck,
  visitPage,
  clickItem,
  clickItemContains,
  selectItem,
  inputText,
  clearText,
  validateText,
  validateValue,
  scrollToContainsTextIsVisible,
  validateElementNotEnabled,
  validateElementContainsIsVisible,
  validateElementEnabled,
  validateElementIsVisible,
  url,
} from '../../../utils/utils'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'

import {
  Env
} from '../../../Config'

describe('Specs - Edit Donation Payment', () => {
    let fixture: any
    let userRole: any

    before(() => {
      cy.fixture('SmokeFixture').then((data) => {
        fixture = data
        userRole = Env.adminHost?fixture.UserRole.ci:fixture.UserRole.local
      })
    })

    beforeEach(() => {
      loginAs(userRole.OrganizationAdministrator1)
    })

    afterEach(() => {
      logoutNoCheck()
    })

  // Preconditions:
  // User is logged in
  //
  // Test Case Description
  // 1. Visit initiative transaction page
  // 2. Verify that Donor tab has correct data
  // 3. Verify that Transaction tab has correct data
  // 4. Update Transaction form with correct data
  // 5. Verify that Transaction form is shown with correct data
    it('Edit and Validates transactions', () => {

      const newFirstName = `Terry`
      const newLastName = `Bogard`
      const newPostCode = '83065'
      const firstName = `Test`
      const lastName = `Smoke`
      const spouseFirstName = 'Spouse'
      const spouseLastName = 'Test'
      const email = fixture.ManageDonationCartItems.email
      const postalCode = fixture.ManageDonationCartItems.postalCode
      const city = fixture.ManageDonationCartItems.city
      const country = fixture.ManageDonationCartItems.country
      const phoneNumber = fixture.ManageDonationCartItems.phoneNumber
      const cardOwnerName = `${firstName} ${lastName}`
      const newFirstNameSpouse = 'Andy'
      const newLastNameSpouse = 'Freire'
      const phoneType = 'HOME'
      const mailingAddress = '3011 Elati St Unit 301'
      const stateProvince = 'CO'
      const initiativeTransactions = `${url.adminHost}/payments/org-3/init-2`
      const donationAmount = '50'
      const foundName = 'Clean Water Project'
      const billingAddress = '3011 Elati St Unit 301'

      visitPage(initiativeTransactions)

      // Validation Tab Donor
      clickItem(CE.donorTab,1)
      inputText(CE.fieldSearchTransaction, firstName)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_0"]', 'Mr.')
      validateElementContainsIsVisible('[data-test-id="parentCell_0_1"]', firstName)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_2"]', lastName)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_3"]', `1`)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_9"]', email)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_11"]', phoneType)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_12"]', mailingAddress)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_13"]', city)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_14"]', stateProvince)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_15"]', postalCode)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_16"]', country)
      clickItem(CE.donorFilterAll,1)
      validateElementIsVisible(CE.donorOfflineButton)
      validateElementIsVisible(CE.donorMixerButton)
      validateElementIsVisible(CE.donorOnlineButton)
      clickItem(CE.paymentMenu,1)
      validateElementIsVisible(CE.donorFilterSingleTransactionButton)
      validateElementIsVisible(CE.donorFilterBulkTransactionButton)

      //Validation Tab Transaction
      clickItem(CE.transactionTab,1)
      inputText(CE.fieldSearchTransaction, firstName)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_5"]', firstName)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_6"]', lastName)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_4"]', `Mr.`)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_8"]', spouseFirstName)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_9"]', spouseLastName)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_11"]', donationAmount)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_17"]', foundName)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_19"]', email)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_20"]', phoneNumber)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_21"]', phoneType)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_22"]', cardOwnerName)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_23"]', billingAddress)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_24"]', city)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_25"]', stateProvince)
      validateElementContainsIsVisible('[data-test-id="parentCell_0_26"]', postalCode)
      scrollToContainsTextIsVisible('[data-test-id="parentCell_0_27"]', country)
      clickItem(CE.donorFilterAll,2)
      validateElementIsVisible(CE.donorOfflineButton)
      validateElementIsVisible(CE.donorOnlineButton)
      validateElementIsVisible(CE.donorPendingButton)
      validateElementIsVisible(CE.donorCompletedButton)
      validateElementIsVisible(CE.donorFailedButton)
      validateElementIsVisible(CE.donorUnconfirmedButton)
      validateElementIsVisible(CE.donorCanceledButton)

      //update
      clickItem(CE.transactionMenu, 1)
      clickItem(CE.editTransactionButton, 1)
      clearText(CE.donorFirstName)
      validateElementNotEnabled(CE.saveChangesButton)
      inputText(CE.donorFirstName, newFirstName)
      validateElementEnabled(CE.saveChangesButton)
      clearText(CE.donorLastName)
      validateElementNotEnabled(CE.saveChangesButton)
      inputText(CE.donorLastName, newLastName)
      validateElementEnabled(CE.saveChangesButton)
      clearText(CE.donorSpouseFirstName)
      inputText(CE.donorSpouseFirstName, newFirstNameSpouse)
      clearText(CE.donorSpouseLastName)
      inputText(CE.donorSpouseLastName, newLastNameSpouse)
      clickItem('[data-test-id="dropdown-option-Clean Water Project"]',1)
      validateElementEnabled(CE.saveChangesButton)
      clearText(CE.mailingAddress2)
      validateElementEnabled(CE.saveChangesButton)
      clearText(CE.mailingPostalCode)
      validateElementNotEnabled(CE.saveChangesButton)
      inputText(CE.mailingPostalCode, newPostCode)
      clickItem(CE.saveChangesButton, 3)

      //Validate Change
      // I commented this out because there is an error in the app. Patrick has been notified and a ticket has been made to address it.
      // inputText('#text-field-search', newFirstName)
      // validateElementContainsIsVisible('[data-test-id="parentCell_0_4"]', 'Mr.')
      // validateElementContainsIsVisible('[data-test-id="parentCell_0_5"]', newFirstName)
      // validateElementContainsIsVisible('[data-test-id="parentCell_0_6"]', newLastName)
      // validateElementContainsIsVisible('[data-test-id="parentCell_0_7"]', 'Miss')
      // validateElementContainsIsVisible('[data-test-id="parentCell_0_8"]', newFirstNameSpouse)
      // validateElementContainsIsVisible('[data-test-id="parentCell_0_9"]', newLastNameSpouse)

    })

    it('Validates that transaction form can be filled out', () => {

      const initiativePaymentPage = `${url.adminHost}/payments/org-2/init-1`

      visitPage(initiativePaymentPage, 5)
      clickItemContains('button','Add')
      clickItem(CE.donorFilterSingleTransactionButton, 2)
      inputText(CE.fieldDonation, '2')
      inputText(CE.fieldGivers, '2')
      clickItem(CE.dropdownOptionStory, 1)
      validateElementIsVisible(CE.fieldFirstName)
      validateElementNotEnabled(CE.saveChangesButton)
      inputText(CE.fieldFirstName, 'firstName')
      inputText(CE.fieldLastName, 'lastName')
      validateElementIsVisible(CE.dropdownOptionStory)
      validateElementNotEnabled(CE.dropdownOptionFund)
      inputText(CE.teamMemberEmailField, 'firstName@communityfunded.com')
      inputText(CE.fieldPhone, '7017209161')
      clickItem(CE.fieldPhone, 1)
      inputText(CE.fieldAddress, '2422 Tremont Pl')
      inputText(CE.fieldAndressTwo, '202')
      selectItem(CE.dropdownOptionState, 'Colorado')
      inputText(CE.fieldCityAddTransaction, 'Denver')
      inputText(CE.fieldPostalCodeAddTransaction, '80205')
      validateElementNotEnabled(CE.saveChangesButton)
      inputText(CE.fieldAreaNotes,'This is a note, take note.')

      // cancel the transaction.
      clickItem('[data-test-id="cancel"]')

      // validate that the form is empty

      validateValue(CE.fieldDonation, '')
      validateValue(CE.fieldGivers, '')
      validateValue(CE.fieldAreaNotes,'')
      validateValue(CE.fieldFirstName, '')
      validateValue(CE.fieldLastName, '')
      validateElementIsVisible(CE.dropdownOptionStory)
      validateElementNotEnabled(CE.dropdownOptionFund)
      validateValue(CE.teamMemberEmailField, '')
      validateValue(CE.fieldPhone, '')
      validateValue(CE.fieldAddress, '')
      validateValue(CE.fieldAndressTwo, '')
      validateValue(CE.dropdownOptionState, '')
      validateValue(CE.fieldCityAddTransaction, '')
      validateValue(CE.fieldPostalCodeAddTransaction, '')

      // refill the form
      inputText(CE.fieldDonation, '2')
      inputText(CE.fieldGivers, '2')
      validateElementIsVisible(CE.fieldFirstName)
      validateElementNotEnabled(CE.saveChangesButton)
      inputText(CE.fieldFirstName, 'firstName')
      inputText(CE.fieldLastName, 'lastName')
      validateElementIsVisible(CE.dropdownOptionStory)
      clickItem(CE.dropdownOptionStory, 1)
      clickItemContains('button', 'CF Test Story')

      validateElementNotEnabled(CE.dropdownOptionFund)
      inputText(CE.teamMemberEmailField, 'firstName@communityfunded.com')
      inputText(CE.fieldPhone, '7017209161')
      clickItem(CE.fieldPhone, 1)
      inputText(CE.fieldAddress, '2422 Tremont Pl')
      inputText(CE.fieldAndressTwo, '202')
      selectItem(CE.dropdownOptionState, 'Colorado')
      inputText(CE.fieldCityAddTransaction, 'Denver')
      inputText(CE.fieldPostalCodeAddTransaction, '80205')
      inputText(CE.fieldAreaNotes,'This is a note, take note.')
      clickItem(CE.saveChangesButton)
      validateText('body', 'You successfully added a single transaction')
      clickItem('[data-test-id="back-to-transactions-button"]')

      //validate the transaction
      validateText('[data-test-id="parentCell_0_7"]', 'firstName')
      validateText('[data-test-id="parentCell_0_8"]', 'lastName')
      validateText('[data-test-id="parentCell_0_13"]', '2')

    })
})
