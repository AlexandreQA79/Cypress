const faker = require('faker');
import {simpleLoginAs, simpleLogout} from '../../../utils/utils'
import {Env} from '../../../Config'
import * as Home_Organizations from "../../../utils/Helpers/pageObject/Home_Organizations";
import * as CreateEdit_Organization_Setup from "../../../utils/Helpers/pageObject/CreateEdit_Organization_Setup";
import * as Common_Actions from "../../../utils/Helpers/pageObject/Common_Actions";
import {
    api_complex_action,
    enable_donation_for_initiative
} from "../../../utils/Helpers/pageObject/CreateEdit_Organization_Initiatives_api";
import * as CreateEdit_Initiative_Setup from "../../../utils/Helpers/pageObject/CreateEdit_Initiative_Setup";
import {create_organization_api} from "../../../utils/Helpers/pageObject/Home_Organizations_api";
import * as Basic_Initiative from "../../../utils/Helpers/pageObject/Basic_Initiative";
import {linkCopier} from "../../../utils/Helpers/pageObject/Common_Elements";
import * as CreateEdit_Initiative_Champions from "../../../utils/Helpers/pageObject/CreateEdit_Initiative_Champions";
import * as Utils from "../../../utils/utils";

describe('Smoke test - Data seeding', () => {

    let fixture: any;
    let userRole: any;

    context('Organization.', () => {

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local;
                simpleLoginAs(userRole.TestAdminAccount)
            });
        });

        afterEach(() => {
            simpleLogout()
        });

        /*
        Test Description:
        Prerequisite:
        1) User is logged in
        Test Steps:
        1) Create new Organization
        2) Verify that organization has been created with correct name
         */

        it('Create organization.', () => {

            const parentOrg = `Community Funded`;
            const orgName = Common_Actions.random_organization_name();
            const role = `Admin`;
            const status = `Active`;

            Home_Organizations.create_organization(orgName);
            CreateEdit_Organization_Setup.check_organization_page_elements({
                org_page_header: orgName,
                org_name: orgName,
                parent_org_name: parentOrg,
                check_url: true
            });
            Home_Organizations.check_organization_details({
                name: orgName,
                role: role,
                contact: true,
                status: status,
                navigate_to_organizations_page: true
            })

        });

    });

    context('Initiative.', () => {
        const email = `sergey@communityfunded.com`;
        const message = `This is test message to Champion.`;
        const email_sent_notification_text = `Your email has been sent.Thank you!`;

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data;
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local;
                simpleLoginAs(userRole.TestAdminAccount)
            });

            enable_donation_for_initiative({
                navigate_to: `Initiative/Champions`
            });
        });

        afterEach(() => {
            simpleLogout()
        });
    });

});