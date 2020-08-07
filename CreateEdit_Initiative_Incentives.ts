import {Env} from '../../Config'
import * as Utils from "../../utils/utils";
import {enable_donation_for_initiative} from "../../utils/Helpers/pageObject/CreateEdit_Organization_Initiatives_api";
import * as Common_Actions from "../../utils/Helpers/pageObject/Common_Actions";
import * as Incentives from "../../utils/Helpers/pageObject/CreateEdit_Initiative_Incentives";

describe('Organization -> Initiative -> Incentives.', () => {
    let fixture: any;
    let userRole: any;
    const add_new_challange_btn_text_1 = `Add a New`;
    const add_new_challange_btn_text_2 = `challenge`;
    const story_name = `Test Story Name`;

    const publish_now_switcher_text = `Publish Now`;
    const participation_switcher_text = `Enable Participation`;
    const name_field_text = `Name`;
    const description_field_text = `Description`;
    const share_this_incentive_switcher_text = `Share this Incentive`;
    const sponsor_dropdown_text = `Select Existing Sponsor`;
    const banner_image_btn_text = `Banner Image`;
    const badge_icon_dropdown_text = `Badge Icon`;
    const challenge_type_dropdown_text = `Challenge Type`;
    const award_type_dropdown_text = `Award Type`;
    const award_amount_field_text = `Award Amount`;
    const minimum_donation_amount_field_text = `Minimum Donation Amount`;
    const maximum_donation_amount_field_text = `Maximum Donation Amount`;
    const winner_determination_method_dropdown_text = `Winner Determination Method`;
    const measure_type_dropdown_text = `Measure Type`;
    const goal_amount_field_text = `Goal Amount`;
    const competitors_dropdown_text = `Competitors`;
    const eligible_participants_text = `Eligible Participants`;


    context('Challenges tab', () => {

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data;
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local;
                Utils.simpleLoginAs(userRole.TestAdminAccount)
            });
            enable_donation_for_initiative({
                story_name: [story_name],
                challenge_name: [],
                navigate_to: `Organization/Initiatives/Incentives/Challenges`
            });
        });

        afterEach(() => {
            Utils.simpleLogout()
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Organization/Initiatives/Incentives/Challenges is opened
        //
        // Test Case Description
        // 1. Verify that "Add A New Challenge" button contains text
        // 2. Click "Add A New Challenge" button
        // 3. Verify that all field labels contain correct text
        it('Checking of field labels for `Add new Challange` page.', () => {
            Common_Actions.check_element_contains_text(Incentives.add_new_challange_btn, add_new_challange_btn_text_1);
            Common_Actions.check_element_contains_text(Incentives.add_new_challange_btn, add_new_challange_btn_text_2);
            Incentives.click_add_new_challange_btn();
            Incentives.fill_new_challenge_page({competitors: story_name, click_save: false});
            Incentives.check_new_challenge_page_labels({
                publish_now_switcher_xpath: publish_now_switcher_text,
                participation_switcher_xpath: participation_switcher_text,
                name_field: name_field_text,
                description_field: description_field_text,
                share_this_incentive_switcher_xpath: share_this_incentive_switcher_text,
                sponsor_dropdown: sponsor_dropdown_text,
                banner_image_btn: banner_image_btn_text,
                badge_icon_dropdown: badge_icon_dropdown_text,
                challenge_type_dropdown: challenge_type_dropdown_text,
                award_type_dropdown: award_type_dropdown_text,
                award_amount_field: award_amount_field_text,
                minimum_donation_amount_field: minimum_donation_amount_field_text,
                maximum_donation_amount_field: maximum_donation_amount_field_text,
                winner_determination_method_dropdown: winner_determination_method_dropdown_text,
                measure_type_dropdown: measure_type_dropdown_text,
                goal_amount_field: goal_amount_field_text,
                competitors_dropdown: competitors_dropdown_text,
                eligible_participants: eligible_participants_text
            })
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Organization/Initiatives/Incentives/Challenges is opened
        //
        // Test Case Description
        // 1. Verify that "Add A New Challenge" button contains text
        // 2. Click "Add A New Challenge" button
        // 3. Fill all fields with correct data
        // 4. Verify that "Add a New Challenge" fields contains text from previous step
        // 5. Click "Add A New Challenge" button
        // 6. Fill all fields with correct data
        // 7. Verify that "Add a New Challenge" field contains text from previous step
        it('Creating several new Challanges.', () => {
            const challenge_data = `Test Challange.`;
            const challenge_description = `Test Desctiption.`;
            const shareable_data = true;
            const published_data = true;
            const participation_data = true;
            const schedule_data = ``;
            const award_type_data = `Tier 1: 100`;
            const minimum_data = 1;
            const maximum_data = 999;
            const winner_determination_method_data = `First to Goal in`;
            const winner_determination_method_data_shown = `FIRST_TO_GOAL`;
            const sponsor_data = ``;
            const status_data = `Active`;

            const challenge_data_2 = `Test Challange_2.`;
            const challenge_description_2 = `Test Desctiption_2.`;
            const shareable_data_2 = true;
            const published_data_2 = true;
            const participation_data_2 = true;
            const schedule_data_2 = ``;
            const award_type_data_2 = `Tier 1: 100`;
            const minimum_data_2 = 2;
            const maximum_data_2 = 1002;
            const winner_determination_method_data_2 = `First to Goal in`;
            const winner_determination_method_data_shown_2 = `FIRST_TO_GOAL`;
            const sponsor_data_2 = ``;
            const status_data_2 = `Active`;

            Incentives.click_add_new_challange_btn();
            Incentives.fill_new_challenge_page({
                name: challenge_data,
                description: challenge_description,
                minimum_donation_amount: minimum_data,
                donation_amount: maximum_data,
                winner_determination_method: winner_determination_method_data,
                competitors: story_name
            });

            Incentives.click_add_new_challange_btn();
            Incentives.fill_new_challenge_page({
                name: challenge_data_2,
                description: challenge_description_2,
                minimum_donation_amount: minimum_data_2,
                donation_amount: maximum_data_2,
                winner_determination_method: winner_determination_method_data_2,
                competitors: story_name
            });

            Incentives.check_challenge_field_data({
                challenge_title: challenge_data,
                challenge_description: challenge_description,
                shareable_switcher_xpath: shareable_data,
                published_switcher_xpath: published_data,
                participation_switcher_xpath: participation_data,
                // schedule_switcher_xpath: schedule_data,
                award_type: award_type_data,
                minimum: minimum_data,
                maximum: maximum_data,
                winner_determination_method: winner_determination_method_data_shown,
                competitors_xpath: story_name,
                // sponsor: sponsor_data,
                status_xpath: status_data,
                index: 0
            });

            Incentives.check_challenge_field_data({
                challenge_title: challenge_data_2,
                challenge_description: challenge_description_2,
                shareable_switcher_xpath: shareable_data_2,
                published_switcher_xpath: published_data_2,
                participation_switcher_xpath: participation_data_2,
                // schedule_switcher_xpath: schedule_data_2,
                award_type: award_type_data_2,
                minimum: minimum_data_2,
                maximum: maximum_data_2,
                winner_determination_method: winner_determination_method_data_shown_2,
                competitors_xpath: story_name,
                // sponsor: sponsor_data_2,
                status_xpath: status_data,
                index: 1
            })
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Organization/Initiatives/Incentives/Challenges is opened
        //
        // Test Case Description
        // 1. Create New challenge with correct data
        // 2. Create New challenge with identical data from previous step
        // 2. Verify that fields of new challenges has correct data
        // 3. Verify that identical challenges is not created
        it('Creating identical Challenges.', () => {
            const challenge_data = `Test Challange.`;
            const challenge_description = `Test Desctiption.`;
            const shareable_data = true;
            const published_data = true;
            const participation_data = true;
            const schedule_data = ``;
            const award_type_data = `Tier 1: 100`;
            const minimum_data = 1;
            const maximum_data = 999;
            const winner_determination_method_data = `First to Goal in`;
            const winner_determination_method_data_shown = `FIRST_TO_GOAL`;
            const sponsor_data = ``;
            const status_data = `Active`;

            Incentives.click_add_new_challange_btn();
            Incentives.fill_new_challenge_page({
                name: challenge_data,
                description: challenge_description,
                minimum_donation_amount: minimum_data,
                donation_amount: maximum_data,
                winner_determination_method: winner_determination_method_data,
                competitors: story_name
            });

            Incentives.click_add_new_challange_btn();
            Incentives.fill_new_challenge_page({
                name: challenge_data,
                description: challenge_description,
                minimum_donation_amount: minimum_data,
                donation_amount: maximum_data,
                winner_determination_method: winner_determination_method_data,
                competitors: story_name
            });

            Incentives.check_challenge_field_data({
                challenge_title: challenge_data,
                challenge_description: challenge_description,
                shareable_switcher_xpath: shareable_data,
                published_switcher_xpath: published_data,
                participation_switcher_xpath: participation_data,
                // schedule_switcher_xpath: schedule_data,
                award_type: award_type_data,
                minimum: minimum_data,
                maximum: maximum_data,
                winner_determination_method: winner_determination_method_data_shown,
                competitors_xpath: story_name,
                // sponsor: sponsor_data,
                status_xpath: status_data,
                index: 0
            });

            Incentives.check_challenge_field_data({
                challenge_title: challenge_data,
                challenge_description: challenge_description,
                shareable_switcher_xpath: shareable_data,
                published_switcher_xpath: published_data,
                participation_switcher_xpath: participation_data,
                // schedule_switcher_xpath: schedule_data,
                award_type: award_type_data,
                minimum: minimum_data,
                maximum: maximum_data,
                winner_determination_method: winner_determination_method_data_shown,
                competitors_xpath: story_name,
                // sponsor: sponsor_data,
                status_xpath: status_data,
                index: 0
            });
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Organization/Initiatives/Incentives/Challenges is opened
        //
        // Test Case Description
        // 1. Click "Add A New Challenge" button
        // 2. Fill all fields with correct data
        // 3. Click "Save" button
        // 4. Verify that challenge labels contain text
        it('Field labels checking.', () => {

            const challenge_data = `Challenge`;
            const shareable_data = `Shareable`;
            const published_data = `Published`;
            const participation_data = `Participation`;
            const schedule_data = `Schedule`;
            const award_type_data = `Award Type`;
            const minimum_data = `Minimum`;
            const maximum_data = `Maximum`;
            const winner_determination_method_data = `Winner(s) Determination Method`;
            const competitors_data = `Competitors`;
            const sponsor_data = `Sponsor`;
            const status_data = `Status`;

            Incentives.click_add_new_challange_btn();
            Incentives.fill_new_challenge_page({competitors: story_name});
            Incentives.check_challenge_field_labels({
                challenge: challenge_data,
                shareable: shareable_data,
                published: published_data,
                participation: participation_data,
                schedule: schedule_data,
                award_type: award_type_data,
                minimum: minimum_data,
                maximum: maximum_data,
                winner_determination_method: winner_determination_method_data,
                competitors: competitors_data,
                sponsor: sponsor_data,
                status: status_data
            })
        })
    });

});
