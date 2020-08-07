import {
    Env
} from '../Config'
import * as Common_Actions from "./Helpers/pageObject/Common_Actions";

import * as CE from './Helpers/pageObject/Common_Elements'

import expect from 'expect'

export const url = {
    adminHost: Env.adminHost || 'http://localhost:3000',
    publicHost: Env.publicHost || 'http://localhost:8000',
    orgPath: '/organizations/org-2',
    initiativePath: '/organizations/org-3',
    orgInitPath: '/initiatives/org-2',
    subOrgInitPath: '/initiatives/org-3',
    initTeamPath: '/team/org-3/init-2',
    initAboutPath: 'initiatives/about/org-3/init-2',
    initPaymentsPath: '/initiatives/payments/org-3/init-2',
    initFundsPath: '/initiatives/payments/org-3/init-2/funds',
    initStoriesDashboard: '/stories/org-3/init-2',
    initStoryFundsPath: '/stories/payments/org-3/init-2/sty-2',
    activeIdeaPath: '/o/3core-ca/i/books-for-children-idea',
    rewardPath: '/incentives/rewards/org-3/init-2',
    storyAbout: '/stories/about/org-3/init-2/sty-2',
    donationBookForChildren: '/o/3core-ca/i/books-for-children'
}

export const adminLoginPage = `${url.adminHost}`

export function visitPage(page: string, waitTime: number = 0): void {
    cy.visit(page)
    if (waitTime > 0)
        cy.wait(waitTime * 1000)
}

export function clickItem(itemId: string, waitTime: number = 0): void {
    cy.get(itemId).click()
    if (waitTime > 0)
        cy.wait(waitTime * 1000)
}

export function clickToSelectCheckbox(itemId: string, waitTime: number = 0): void {
    cy.get(itemId).check()
    if (waitTime > 0)
        cy.wait(waitTime * 1000)
}

export function clickToDeselectCheckbox(itemId: string, waitTime: number = 0): void {
    cy.get(itemId).uncheck()
    if (waitTime > 0)
        cy.wait(waitTime * 1000)
}

export function selectItem(itemId: string, value: string, waitTime: number = 0): void {
    cy.get(itemId).select(value)
    if (waitTime > 0)
        cy.wait(waitTime * 1000)
}

export function clickItemContains(elementType: string, elementText: string, waitTime: number = 0): void {
    cy.get(elementType).contains(elementText).click()
    if (waitTime > 0)
        cy.wait(waitTime * 1000)
}

export function findAndClickItem(parentItemId: string, itemId: string, waitTime: number = 0): void {
    cy.get(parentItemId).find(itemId).click()
    if (waitTime > 0)
        cy.wait(waitTime * 1000)
}

export function focusItem(itemId: string): void {
    cy.get(itemId).focus()
}

export function findAndValidateElementVisible(parentItemId: string, itemId: string): void {
    cy.get(parentItemId).find(itemId).should('be.visible')
}

export function clickPaymentToggle(button: string): void {
    cy
        .wait(2 * 1000)
        .get('body').then((body) => {
        if (body.find('[aria-checked="false"]').length > 0) {
            cy.log('I\'m going to activate the payment manager')
            clickItem(button)
            cy.get('[aria-checked="true"]').should('be.visible')
        } else {
            cy.log('the payment manager already assigned')
        }
    })
        .wait(2 * 1000)
}

export function inputText(element: string, value: string): void {
    cy.get(element).clear().type(value)
}

export function inputTextWithoutClear(element: string, value: string): void {
    cy.get(element).type(value)
}

export function clearText(element: string): void {
    cy.get(element).clear()
}

export function validateText(element: string, text: string): void {
    cy.get(element).should('contain', text)
}

export function validateTextShould(element: string, value: string): void {
    cy.get(element).should(value)
}

export function validateElementExists(element: string): void {
    cy.get(element).should('exist')
}

export function validateElementDoesNotExist(element: string): void {
    cy.get(element).should('not.exist')
}

export function validateElementEnabled(element: string): void {
    cy.get(element).should('be.enabled')
}

export function validateElementNotEnabled(element: string): void {
    cy.get(element).should('not.be.enabled')
}

export function validateElementContainsTextEnabled(elementType: string, elementText: string): void {
    cy.get(elementType).contains(elementText).should('be.enabled')
}

export function validateElementContainsTextNotEnabled(elementType: string, elementText: string): void {
    cy.get(elementType).contains(elementText).should('not.be.enabled')
}

export function validateElementContainsIsVisible(elementType: string, elementText: string): void {
    cy.get(elementType).contains(elementText).should('be.visible')
}

export function validateElementContainsIsNotVisible(elementType: string, elementText: string): void {
    cy.get(elementType).contains(elementText).should('not.be.visible')
}

export function validateElementContainsExist(elementType: string, elementText: string): void {
    cy.get(elementType).contains(elementText).should('exist')
}

export function validateElementFindContainsExists(elementType: string, element: string, elementText: string): void {
    cy.get(elementType).find(element).contains(elementText).should('exist')
}

export function validateElementIsVisible(element: string): void {
    cy.get(element).should('be.visible')
}

export function validateElementIsNotVisible(element: string): void {
    cy.get(element).should('not.be.visible')
}

export function validateElementHasAttribute(element: string, attribute: string): void {
    cy.get(element).should('have.attr', attribute)
}

export function validateElementDoesNotHaveAttribute(element: string, attribute: string): void {
    cy.get(element).should('not.have.attr', attribute)
}

export function validateValue(element: string, value: string): void {
    cy.get(element).should('have.value', value)
}

export function validateCheckboxIsChecked(id: string): void {
    cy.get(id).should('be.checked')
}

export function validateCheckboxIsNotChecked(id: string): void {
    cy.get(id).should('not.be.checked')
}

export function validateUrl(url: string): void {
    cy.location().should((loc) => {
        expect(loc.href).toEqual(url)
    });
    cy.log('URL: ' + url)
}

export function validateUrlShouldContain(urlComponent: string): void {
    cy.url().should('include', urlComponent)
}

export function validateIframeExists(): void {
  cy.get('.zoid-component-frame').should('exist')
}

export function validateIframeContents(contents: string, waitTime: number = 0): void {
    cy.iframe('.zoid-component-frame').wait(waitTime * 1000).should('contain', contents)
}

export function validateIframeElementContents(element: string, contents: string, waitTime: number = 0): void {
  cy.get('.zoid-component-frame')
  .then(($iframe) => {
    const $body = $iframe.contents().find('body')[0]
    cy.wrap($body)
    .find(element)
    .contains(contents)
    .should('exist')
  })
}

export function scrollToAndFindVisible(element: string, searchFor: string): void {
    cy.get(element).scrollIntoView().find(searchFor).should('be.visible')
}

export function scrollToContainsElementWithTextIsVisible(element: string, searchIn: string, searchFor: string): void {
    cy.get(element).scrollIntoView().find(searchIn).contains(searchFor).should('be.visible')
}

export function scrollToContainsTextIsVisible(element: string, searchFor: string): void {
    cy.get(element).scrollIntoView().contains(searchFor).should('be.visible')
}

export function scrollToFindAndClick(element: string, searchFor: string, waitTime: number = 0): void {
    cy.get(element).scrollIntoView().find(searchFor).click()
    if (waitTime > 0)
        cy.wait(waitTime * 1000)
}

export function randomNumber(multiplier: number = 10000): number {
    return Math.floor(Math.random() * multiplier)
}

export function clearStorage(): void {
    log('Start Clear Storage')
    cy.clearCookies()
    cy.clearLocalStorage()
    log('End Clear Storage')
}

export function log(text: string = '') {
    cy.log(text)
}

export const loginAs = (userRole: any) => {
    log('Start Login As')
    clearStorage()
    visitPage(adminLoginPage, 2)

    log(`Login as: ${userRole.FullName}`)
    cy.url().then((emailUrl) => {
        log('User Name URL')
        if (emailUrl !== adminLoginPage && emailUrl !== `${adminLoginPage}/`) {
            log('User Name: Not Admin Page')
            logoutNoCheck()
        }
        inputText('#text-field-username', userRole.userName)

        cy.url().then((passwordUrl) => {
            log('Password URL')
            if (passwordUrl !== adminLoginPage && passwordUrl !== `${adminLoginPage}/`) {
                log('Password: Not Admin Page')
                logoutNoCheck()
                inputText('#text-field-username', userRole.userName)
            }
            inputText('#text-field-password', userRole.password)

            cy.url().then((loginUrl) => {
                log('Login URL')
                if (loginUrl !== adminLoginPage && loginUrl !== `${adminLoginPage}/`) {
                    log('Login URL: Not Admin Page')
                    logoutNoCheck()
                    inputText('#text-field-username', userRole.userName)
                    inputText('#text-field-password', userRole.password)
                }
            })
        })
    });
    clickItemContains('button', 'Log In', 3)
    log('End Login As')
};

export const logoutNoCheck = () => {
    log('Start Logout No Check')
    validateElementIsNotVisible('[data-test-id="loader"]')
    cy
        .get('body').then((body) => {
        if (body.find('[data-test-id="appbar-user-dropdown"]').length > 0) {
            clickItem('[data-test-id="appbar-user-dropdown"]')
            clickItemContains('button', 'Log Out')
            validateElementIsVisible(CE.loginSubmit)
        }
    })
    clearStorage()
    log('End Logout No Check')
};

// Removed logout() Function. If still in use, use logoutNoCheck instead.

export const simpleLoginAs = (userRole: any) => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(adminLoginPage, {
        onBeforeLoad: (win) => {
            win.onerror = null
        }
    });
    cy.log(`Login with userRole: ` + userRole.userName + `/` + userRole.password);
    cy.get('#text-field-username', {timeout: 15 * 1000}).should(`be.visible`, 10).type(userRole.userName).wait(2 * 1000);
    cy.get(`body`).then(($res) => {
        if ($res.find(`[data-test-id="feature-menu-dashboard-button"]`).length > 0) {
            if ($res.find(`[data-test-id="feature-menu-stories-button"]`).length < 0) {
                log_in(userRole)
                // cy.clearLocalStorage();
                // cy.clearCookies();
                // cy.visit(adminLoginPage);
                // cy.get('#text-field-username', { timeout: 15*1000 }).should(`be.visible`, 10).type(userRole.userName).wait(2 * 1000);
                // cy.get('#text-field-password').should(`be.visible`, 10).type(userRole.password);
                // cy.get(`[data-test-id="login-submit"]`).should(`be.visible`, 10).click();
            }
        } else {
            cy.get('#text-field-password', {timeout: 15 * 1000}).should(`be.visible`, 10).type(userRole.password);
            cy.get(`[data-test-id="login-submit"]`).should(`be.visible`, 10).click();
        }
    });
    cy.get(`body`).then(($res) => {
        if ($res.find(`[data-test-id="feature-menu-stories-button"]`).length < 0) {
            log_in(userRole)
        }
    });
    cy.get(`[data-test-id="appbar-user-dropdown"]`).should('be.visible', 20)

};

export function log_in(userRole: any) {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit(adminLoginPage);
    cy.get('#text-field-username', {timeout: 15 * 1000}).should(`be.visible`, 10).type(userRole.userName).wait(2 * 1000);
    cy.get('#text-field-password').should(`be.visible`, 10).type(userRole.password);
    cy.get(`[data-test-id="login-submit"]`).should(`be.visible`, 10).click();
}

export const simpleLogout = () => {
    cy.get('body').then((body) => {
        if (body.find('[data-test-id="appbar-user-dropdown"]').length > 0) {
            cy.get('[data-test-id="appbar-user-dropdown"]').click();
            cy.wait(1000);
            cy.get(`[data-test-id="user-menu-logout-button"]`, {timeout: 10 * 1000}).click();
            Common_Actions.wait_until(`[data-test-id="login-submit"]`, 30);
            cy.clearLocalStorage();
            cy.clearCookies();
        } else {
            cy.log(`User dropdown is NOT shown. Log Out can NOT be performed.`)
        }
    })
};

//export const checkEmail = (from, to, subject, searchTerm) => {return 'voila'}

export const checkEmail = (delay, from: string, to: any, subject: string, searchTermList: any[]) => {
    let result = ''
    cy.wait(delay)
        .task("gmail:get-messages", {
            options: {
                from: from, //"info@communityfunded.com",
                to: to,
                subject: subject, //"Welcome to the team!",
                include_body: true//,
                //before: new Date(2019, 8, 24, 12, 31, 13), // Before September 24rd, 2019 12:31:13
                //after: new Date(2019, 7, 23) // After August 23, 2019
            }
        })
        .then((emails) => {
            assert.isAtLeast(
                emails ? emails.length : '',
                1,
                "Expected to find at least one email, but none were found!"
            );
            const body = emails[0].body.html;
            result = body;
            console.log(`Email body is: ${body}`);
            for (let i = 0; i < searchTermList.length; i++) {
                assert.isTrue(
                    body.indexOf(
                        searchTermList[i]
                    ) >= 0,
                    `Expected email to contains the following text: "${searchTermList[i]}"`
                );
            }


            /*
            var el = document.createElement( 'html' );
            el.innerHTML = body
            el.querySelector('div>a')

            let voila = el.querySelector('div>a') //el.getElementsByTagName( 'a' ); // Live NodeList of your anchor elements
            //cy.log(el.innerText)
            //console.log(body)
            console.log('The signup link is: ', voila?voila.href:null)

            console.log(voila)*/
            return 'voila1'

        });
    return result
};
