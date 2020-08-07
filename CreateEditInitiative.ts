const faker = require('faker');

import {Env} from '../../Config'
import * as Utils from "../../utils/utils";
import {create_organization_api} from "../../utils/Helpers/pageObject/Home_Organizations_api";
import * as Basic_Initiative from "../../utils/Helpers/pageObject/Basic_Initiative";

describe('Specs - Create | Edit an Initiative', () => {
    let fixture: any;
    let userRole: any;

    // Initiative name
    const initName = `${faker.fake("{{finance.accountName}}")}_${faker.random.number({
        'min': 0,
        'max': 100000000
    })}`;

    const init_name_label_text = 'Initiative Name';
    const init_org_dropdown_label_text = 'Select hosting parent organization';
    const init_summary_label_text = 'Summary';
    const summary = '';

    beforeEach(() => {
        cy.fixture('SmokeFixture').then((data) => {
            fixture = data;
            userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
            Utils.simpleLoginAs(userRole.TestAdminAccount)

            create_organization_api({
                org_name: initName,
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
    // Organization is created
    // Organization/Initiatives/New is opened
    //
    // Test Case Descriptions
    // 1. Fill Valid data into Initiative page labels
    // 2. Create new Initiative
    // 3. Verify that initiative was created successfully
    it('Select to Create New Initiative', () => {
        Basic_Initiative.create_init(initName);
        Basic_Initiative.check_init_setup_page_labels_has_text(init_name_label_text, init_org_dropdown_label_text, init_summary_label_text);
        Basic_Initiative.check_init_setup_page_fields_contains_text(initName, initName, summary);
    })
});
