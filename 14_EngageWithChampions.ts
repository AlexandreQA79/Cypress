import {
  visitPage,
  clickItem,
  clickToSelectCheckbox,
  clickToDeselectCheckbox,
  selectItem,
  inputText,
  validateText,
  findAndClickItem,
  validateElementIsVisible,
  validateElementFindContainsExists,
  validateElementNotEnabled,
  validateElementContainsIsVisible,
  validateCheckboxIsChecked,
  validateCheckboxIsNotChecked,
  findAndValidateElementVisible,
  url
} from '../../../utils/utils'

import * as CE from '../../../utils/Helpers/pageObject/Common_Elements'
const initiativePath = `${url.publicHost}/o/3core-ca/i/books-for-children`

import {
  Env
} from '../../../Config'

  describe('Data seed - Engage with Champions Public UX', () => {

    let fixture: any
    let userRole: any

      before(() => {

        cy.fixture('SmokeFixture').then((data) => {
          fixture = data
          userRole = Env.adminHost?fixture.UserRole.ci:fixture.UserRole.local
        })
      })

    // Test Case Description
    // 1. Login as User
    // 2. Visit Initiative page
    // 3. Visit Champions page
    // 4. Verify that Champions page is correct
    // 5. Donate with correct data
    // 6. Verify that donate is performed successfully
    // 7. Visit Donation page and make donation
    // 8. Verify that donation fields are correct
      it('Engage with Champions Public UX', () => {

        const spouseFirstName = 'Champion'
        const spouseLastName = 'Spouse'
        const runId = Math.floor(Math.random() * 10000)
        const username = userRole.InitiativeAdministrator1.userName
        const password = userRole.InitiativeAdministrator1.password
        const firstName = fixture.ManageDonationCartItems.firstName
        const lastName = `${fixture.ManageDonationCartItems.lastName}-${runId}`
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
        cy.wait(3000)
        clickItem(CE.loginButton)
        inputText(CE.fieldUsername, username)
        inputText(CE.fieldPassword, password)
        clickItem(CE.loginSubmit,3)
        clickItem('[data-test-id="storyCardContentWrap_/o/3core-ca/i/books-for-children/s/all-disney-a-1alldisneya1]', 3)
        clickItem(CE.champsShareLink,2)
        cy.pause()
        validateElementContainsIsVisible(CE.header,'My Championed Stories')
        validateElementIsVisible('[data-test-id="champion-story-2-button"]')
        validateElementIsVisible('[data-test-id="champion-story-3-button"]')
        clickItem('[data-test-id="champion-story-2-button"]', 2)
        validateText('body', 'Champion this Story!')
        clickItem(CE.quickDonate100,2)
        clickItem(CE.quickDonate500,2)
        clickItem(CE.quickDonate1000,2)
        clickItem(CE.quickDonateOther)
        inputText(CE.fieldDonation, '999')
        inputText(CE.fieldParticipationGoal, '599')
        validateElementFindContainsExists(CE.dialog, `button`, 'Cancel')
        clickItem(CE.saveContinueButton)
        findAndValidateElementVisible(CE.dialog, CE.header)
        findAndValidateElementVisible(CE.dialog, CE.publicLink)
        findAndValidateElementVisible(CE.dialog, CE.linkCopier)
        findAndValidateElementVisible(CE.dialog, CE.facebookButton)
        findAndValidateElementVisible(CE.dialog, CE.twitterButton)
        findAndValidateElementVisible(CE.dialog, CE.emailButton)
        clickItem(CE.closeDialogButton)
        findAndValidateElementVisible(CE.dialog, CE.publicLink)
        //go make a donation for this champ
          cy.getText().then(publicUrl => {
            cy.log('The public url is: ', publicUrl)

            cy.visit(String(publicUrl), {
              onBeforeLoad: (win) => {
                win.onerror = null
              }
            })

            .get(`[data-test-id="user-initiative-popover"]`).click()
            .get(`[data-test-id="logout-button-button"]`).click()
            cy.visit(String(publicUrl), {
              onBeforeLoad: (win) => {
                win.onerror = null
              }
            })
          })
          clickItem(CE.donateNowButton, 2)
          clickItem(CE.quickDonate25, 2)
          selectItem(CE.dropdownChooseFund, 'Clean Water Project')
          findAndClickItem(CE.dialog, CE.donateNowButton, 2)

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
          clickItem(`[data-test-id="Billing Address is the Same-checkbox"]`,1)
          inputText(CE.fieldAddressOneBilling, addressOne)
          inputText(CE.fieldAddressTwoBilling, addressTwo)
          selectItem(`[data-test-id="dropdown-option-billing-state-dropdown"]`,state)
          inputText(CE.fieldCityBilling, city)
          inputText(CE.fieldPostalCodeBilling, postalCode)
          clickItem(`[data-test-id="Billing Address is the Same-checkbox"]`)

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
      })
  })
