interface UserObject {
  [name: string]: {
    name?: string
    email: string
    password: string
  }
}

export const users: Readonly<UserObject> = {
  God: {
    email: Cypress.env('ACCOUNT') || 'dev+god@communityfunded.com',
    password: `123Nsdap`,
  },
  McCabe: {
    email: `dev+mccabe@communityfunded.com`,
    password: `123Nsdap`,
  },
  Emma: {
    name: 'Emma Ramirez',
    email: `ramirez.emma.g@gmail.com`,
    password: `123Nsdap`,
  },
}

export default users
