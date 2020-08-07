import {Env} from '../Config'

export interface LoginUser {
  email: string
  password: string
}

export interface LoginOptions {
  embed: boolean
}

export function login(user: LoginUser, options: LoginOptions = {embed: false}) {
  if (options.embed) {
    const loginPage = `${Env.embedHost ||
      'http://127.0.0.1:8800'}/vanilla-js/champions/login/`

    cy.visit(loginPage, {
      onBeforeLoad: (win) => {
        win.onerror = null
      }
    })
      .wait(3000)
      .get('.zoid-component-frame')
      .should('exist')
      .get('.zoid-component-frame')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body')[0]

        cy.wait(1000)
          .wrap($body)
          .find('#text-field-username')
          .should('exist')
          .then((usernameField) => {
            cy.wrap(usernameField).type(user.email)
            cy.wrap($body)
              .find('#text-field-password')
              .type(user.password)
            cy.wrap($body)
              .find('button')
              .contains('Log In')
              .click()
          })
      })
      .wait(2000)
  } else {
    const loginPage = Env.adminHost || 'http://localhost:3000'

    cy.visit(`${loginPage}/`, {
      onBeforeLoad: (win) => {
        win.onerror = null
      }
    })
      .get('#text-field-username')
      .type(user.email)
      .get('#text-field-password')
      .type(user.password)
      .get('button')
      .contains('Log In')
      .click()
      .wait(3000)
  }
}
