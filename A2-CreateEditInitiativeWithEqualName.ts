const faker = require('faker');

import {Env} from '../../Config'
import * as Utils from "../../utils/utils";
import * as Basic_Initiative from "../../utils/Helpers/pageObject/Basic_Initiative";
import * as Common_Actions from "../../utils/Helpers/pageObject/Common_Actions";
import {create_organization_api} from "../../utils/Helpers/pageObject/Home_Organizations_api";

describe('Specs - Create | Same Initiative', () => {
    let fixture: any;
    let userRole: any;

    // Error message text
    const error_msg_text = 'The initiative name must be unique in your organization';

    // Initiative name
    const initName = `${faker.fake("{{finance.accountName}}")}_${faker.random.number({
        'min': 0,
        'max': 100000000
    })}`;

    beforeEach(() => {
        cy.fixture('SmokeFixture').then((data) => {
            fixture = data;
            userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local;
            Utils.simpleLoginAs(userRole.TestAdminAccount);

            create_organization_api({
                need_to_navigate: true,
                navigate_to: 'Organization/Initiatives'
            })
        })
    });

    afterEach(() => {
        Utils.simpleLogout()
    });

    // Preconditions:
    // User is logged in
    // Organization/Initiatives/New is opened
    //
    // Test Case Descriptions
    // 5. Fill Valid data into Initiative page labels
    // 6. Create new Initiative
    // 7. Create initiative with name from 4th step
    // 9. Verify that Error message has correct text
    // 10. Verify that "Save" button is disabled
    it('Create the Same Name Initiative', () => {
        Basic_Initiative.create_init(initName);
        cy.go('back');
        Basic_Initiative.enter_init_name(initName);
        Common_Actions.check_element_text(Basic_Initiative.error_msg_xpath, error_msg_text, 0, true);
        Basic_Initiative.check_init_save_button_status(true);
    })
})
