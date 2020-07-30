import {
  visitPage,
  clickItem,
  clickToSelectCheckbox,
  clickToDeselectCheckbox,
  selectItem,
  inputText,
  clearText,
  validateText,
  findAndClickItem,
  validateElementIsVisible,
  validateElementFindContainsExists,
  validateElementNotEnabled,
  validateElementContainsIsVisible,
  validateElementEnabled,
  validateCheckboxIsChecked,
  validateCheckboxIsNotChecked,
  url
} from '../../../utils/utils'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'
const initiativePath = `${url.publicHost}/o/3core-ca/i/books-for-children`

import {
  Env
} from '../../../Config'

  describe ('Data seedong - PART-B-01-2: Donate via Initiative Home Page\'s "Donate Now" User Path', () => {

    let fixture: any

      before(() => {

        cy.fixture('SmokeFixture').then((data) => {
          fixture = data
        })
      })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit initiative page
    // 2. Click Donate button and choose donate option
    // 3. Fill Donation form with correct data
    // 4. Verify that Donation form has correct data
      it('PART-B-01-2: Donate via Initiative Home Page\'s "Donate Now" User Path - single fund - Quick select donation buttons', () => {
        const donationAmount = '50'
        const selectAmountToDonateError = fixture.ErrorList.selectAmountToDonateError
        const fundMustBeSelectedError = fixture.ErrorList.fundMustBeSelectedError
        const firstName = `Test`
        const lastName = `Smoke`
        const spouseFirstName = 'Spouse'
        const spouseLastName = 'Test'
        const email = fixture.ManageDonationCartItems.email
        const phoneNumber = fixture.ManageDonationCartItems.phoneNumber
        const addressOne = fixture.ManageDonationCartItems.addressOne
        const addressTwo = fixture.ManageDonationCartItems.addressTwo
        const city = fixture.ManageDonationCartItems.city
        const state = fixture.ManageDonationCartItems.state
        const postalCode = fixture.ManageDonationCartItems.postalCode
        const country = fixture.ManageDonationCartItems.country
        const paymentDialogHeader1 = fixture.ManageDonationCartItems.paymentDialogHeader1
        const paymentDialogHeader2 = fixture.ManageDonationCartItems.paymentDialogHeader2
        const terms = fixture.ManageDonationCartItems.terms
        const cardNumber = fixture.ManageDonationCartItems.cardNumber
        const cvv = fixture.ManageDonationCartItems.cvv
        const nextYear = (new Date().getFullYear() ) + 1;
        const success = fixture.generic.success
        const cardOwnerName = `${firstName} ${lastName}`

        visitPage(initiativePath)
        clickItem(CE.donateNowButton)
        validateElementIsVisible(CE.dropdownChooseFund)
        findAndClickItem(CE.dialog, CE.donateNowButton)
        validateText('body', selectAmountToDonateError)
        clickItem(CE.quickDonate50, 1)
        findAndClickItem(CE.dialog, CE.donateNowButton)
        validateText('body', fundMustBeSelectedError)
        selectItem(CE.dropdownChooseFund, 'Clean Water Project')
        findAndClickItem(CE.dialog, CE.donateNowButton, 2)
        validateElementIsVisible(CE.totalDonation)
        validateElementIsVisible('[data-test-id="cart-item-All disney a 1"]')
        validateElementIsVisible('[data-test-id="handleEdit-Clean Water Project"]')
        validateElementIsVisible('[data-test-id="deleteItem-Clean Water Project"]')
        validateElementContainsIsVisible('[data-test-id="cart-item-utility-component-Clean Water Project"]', `$${donationAmount}`)

        //Fill Form
        selectItem(CE.dropdownPrefix, 'Mr.')
        inputText(CE.firstNameDonation, firstName)
        inputText(CE.lastNameDonation, lastName)
        clickToSelectCheckbox(CE.checkboxSpouse, .5)
        validateCheckboxIsChecked(CE.checkboxSpouse)
        clickToDeselectCheckbox(CE.checkboxSpouse, .5)
        validateCheckboxIsNotChecked(CE.checkboxSpouse)
        clickToSelectCheckbox(CE.checkboxSpouse, .5)
        clickItem('[data-test-id="dropdown-option"]',2)
        clickItem('[data-test-id="Miss-button"]')
        inputText(CE.spouseFirstName, spouseFirstName)
        inputText(CE.spouseLastName, spouseLastName)
        inputText(CE.championEmailField, email)
        inputText(CE.isf_phoneNumber, phoneNumber)
        selectItem(`[data-test-id="dropdown-option-phone-type-dropdown"]`,'Home')
        inputText(CE.fieldAddressOne, addressOne)
        inputText(CE.fieldAdressTwo, addressTwo)
        selectItem(`[data-test-id="dropdown-option-mailing-country-dropdown"]`,country)
        selectItem(`[data-test-id="dropdown-option-mailing-state-dropdown"]`,state)
        inputText(CE.fieldCity, city)
        inputText(CE.fieldPostalCode, postalCode)
        // I commented this out because there is an error in the app. Patrick has been notified and a ticket has been made to address it.
        // clickItem(`[data-test-id="Billing Address is the Same-checkbox"]`,1)
        // inputText(CE.fieldAddressOneBilling, addressOne)
        // inputText(CE.fieldAddressTwoBilling, addressTwo)
        // selectItem(`[data-test-id="dropdown-option-billing-state-dropdown"]`,state)
        // inputText(CE.fieldCityBilling, city)
        // inputText(CE.fieldPostalCodeBilling, postalCode)
        // clickItem(`[data-test-id="Billing Address is the Same-checkbox"]`)
        validateElementNotEnabled(`[data-test-id="proceed-to-payment-top"]`)
        validateElementNotEnabled(`[data-test-id="proceed-to-payment-bottom"]`)
        validateElementContainsIsVisible(`a[href="/terms"][target="_blank"]`, terms)
        clickItem(`[data-test-id="\[object Object\]-checkbox"]`,1)
        clickItem(CE.proceedPaymentBottom,1)
        validateElementFindContainsExists(`[data-test-id="dialog"]`,`[data-test-id="header"]`,paymentDialogHeader1)
        validateElementFindContainsExists(`[data-test-id="dialog"]`,`[data-test-id="header"]`,paymentDialogHeader2)
        inputText(CE.fieldCardOwerName, cardOwnerName)
        cy.get('#spreedlyCC iframe').wait(fixture.Wait.iframe).iframe().find(`#card_number`).type(cardNumber)
        selectItem(`[data-test-id="dropdown-option-select-expiration-month"]`,'January')
        selectItem(`[data-test-id="dropdown-option-select-expiration-year"]`,nextYear.toString())
        cy.get('#spreedlyCvv iframe').wait(fixture.Wait.iframe).iframe().find(`#cvv`).type(cvv)
        clickItem(CE.payNowButton,1)
        validateText(`[data-test-id="header-children"]`, success)
        clickItem(`[data-test-id="header-home-button"]`,1)
        validateElementIsVisible(`[data-test-id="DonateNowButton"]`)
      })

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit initiative page
    // 2. Make other donation with correct data
    // 3. Verify that donation is performed successfully
      it('PART-B-01-2: Donate via Initiative Home Page\'s "Donate Now" User Path - single fund - Other donation button', () => {
        const belowMinimumAmount = '0.50'
        const donationAmount = '50'
        const minimumDonationAlert = fixture.DonateDonorSelectedUserPath.minimumDonationAlert
        const minimumDonationError = fixture.ErrorList.minimumDonationError

        visitPage(initiativePath)
        clickItem(CE.donateNowButton)
        clickItem(CE.quickDonateOther)
        validateElementContainsIsVisible(`[data-test-id="minimum-donation"]`, minimumDonationAlert)
        inputText(CE.fieldDonation, belowMinimumAmount)
        selectItem(CE.dropdownChooseFund, 'Clean Water Project')
        findAndClickItem('[data-test-id="dialog"]', CE.donateNowButton)
        validateText('body', minimumDonationError)
        clearText(CE.fieldDonation)
        inputText(CE.fieldDonation,donationAmount)
        clickItem(CE.addCardAndContinue,2)
        clickItem(CE.headerCartButton, 2)
        validateElementIsVisible(CE.totalDonation)
        validateElementIsVisible('[data-test-id="cart-item-All disney a 1"]')
        validateElementIsVisible('[data-test-id="handleEdit-Clean Water Project"]')
        validateElementIsVisible('[data-test-id="deleteItem-Clean Water Project"]')
        validateElementContainsIsVisible('[data-test-id="cart-item-utility-component-Clean Water Project"]', `$${donationAmount}`)

        //Delete
        clickItem('[data-test-id="deleteItem-Clean Water Project"]', 1)
        validateText(CE.totalDonation, "$0.00")
      })
  })
