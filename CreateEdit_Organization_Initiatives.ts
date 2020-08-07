import {Env} from '../../Config'
import * as Utils from "../../utils/utils";
import {api_complex_action} from "../../utils/Helpers/pageObject/CreateEdit_Organization_Initiatives_api";
import * as Home_Initiatives from "../../utils/Helpers/pageObject/Home_Initiatives";
import * as Common_Actions from "../../utils/Helpers/pageObject/Common_Actions";

describe('Initiative page.', () => {
    let fixture: any;
    let userRole: any;

    context('Create Initiative.', () => {
        const fund_name = `Test Fund Name`;
        const challenge_name = `Test challenge name`;
        const init_name = `Initiative 1`;
        const alert_text = `The initiative name must be unique in your organization`;

        before( () => {

            cy.fixture('SmokeFixture').then((data) => {
                fixture = data;
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local;
                Utils.simpleLoginAs(userRole.TestAdminAccount)
            });

            api_complex_action({
                init_name: [init_name],
                fund_name: [fund_name],
                challenge_name: [challenge_name],
                navigate_to: `Organization/Initiatives`
            });
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Organization/Initiatives is opened
        //
        // Test Case Description
        // 1. Fill in the name of the initiative with the name of the organization
        // 2. Verify that Save and Continue button are disabled
        // 3. Verify that alert has a correct text
        it('Try to create initiative with NOT unique name.', () => {
            Home_Initiatives.fill_initiative_name(init_name);
            cy.wait(1 * 1000);
            Common_Actions.check_element_is_disabled(Home_Initiatives.save_and_continue_btn);
            Common_Actions.check_element_text(Home_Initiatives.sm_message, alert_text, 1)
        });

        after(() => {
            Utils.simpleLogout()
        });
    });


});
