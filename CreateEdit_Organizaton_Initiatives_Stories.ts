import {Env} from '../../Config'
import * as Utils from "../../utils/utils";
import {api_complex_action} from "../../utils/Helpers/pageObject/CreateEdit_Organization_Initiatives_api";

describe('Story.', () => {
    let fixture: any;
    let userRole: any;

    context.skip('Create Story Idea.', () => {

        after(() => {
            Utils.simpleLogout()
        });

        before(() => {

            cy.fixture('SmokeFixture').then((data) => {
                fixture = data;
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local;
                Utils.simpleLoginAs(userRole.TestAdminAccount)
            });

            api_complex_action({
                navigate_to: `Organization/Initiatives`,
                create_story_idea: true,
                navigate_to_story_idea: true,
                story_name: []
            });
        });

        // https://cf-dev.atlassian.net/browse/V2DEV-5825 issue is raised for this case - further scripting
        // is blocked at the moment
        it('Check Story Idea.', () => {
            cy.log(`Started test.`)
        });
    });

});
