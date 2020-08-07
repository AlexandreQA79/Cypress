const faker = require('faker');

import {Env} from '../../Config'
import {
    api_complex_action,
    enable_donation_for_initiative
} from "../../utils/Helpers/pageObject/CreateEdit_Organization_Initiatives_api";
import {simpleLoginAs, simpleLogout} from "../../utils/utils";
import * as Initiative_page from "../../utils/Helpers/pageObject/CreateEdit_Initiative_Setup";
import * as Common_Actions from "../../utils/Helpers/pageObject/Common_Actions";
import * as Basic_Initiative from "../../utils/Helpers/pageObject/Basic_Initiative";

describe('Details of Initiative.', () => {

    let fixture: any;
    let userRole: any;
    const story_name = `Test story`;
    const fund_name = `Test Fund Name`;

    context('Tags tab.', () => {

        const tag_name = `test tag`;

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data;
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
                simpleLoginAs(userRole.TestAdminAccount)
            });
            enable_donation_for_initiative({
                story_name: [story_name],
                fund_name: [fund_name],
                navigate_to: `Initiative/Details/Tags`
            });
        });

        afterEach(() => {
            simpleLogout();
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Details/Tags is opened
        //
        // Test Case Description
        // 1. Verify that tag contains valid symbols
        // Notes:
        // -§±|{}_/" symbols are not supported
        // Verified symbols are: !@#$%^&*()=+/?.<>,[]:;''
        it('Trying to create not unique tags.', () => {
            Initiative_page.add_new_tag(tag_name);
            Initiative_page.add_new_tag(tag_name);
            cy.get(`button`).contains(tag_name).its('length').should('eq', 1);
            Initiative_page.add_new_tag(`!@#$%^&*()=+/?.<>,[]:;''`);
            cy.get(`button`).contains(`!@#$%^&*()=+/?.<>,[]:;''`).its('length').should('eq', 1);
            Initiative_page.add_new_tag(`qwertyuiopasdfghjklzxcvbnm`);
            Initiative_page.add_new_tag(`QWERTYUIOPASDFGHJKLZXCVBNM`, false);
            Initiative_page.add_new_tag(`qwertyuiopasdfghjklzxcvbnm`);
            cy.get(`button`).contains(`qwertyuiopasdfghjklzxcvbnm`).its('length').should('eq', 1);
        });

    });

    context('Payment tab.', () => {

        const donat_1 = 30;
        const donat_2 = 90;
        const donat_3 = 130;
        const other_don = false;
        const min_donat = 11;
        const min_donat_over = 1111;
        const save_change = true;
        const success_msg_header = `Success`;
        const success_msg_body_1 = `Initiative `;
        const success_msg_body_2 = ` updated`;

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
                simpleLoginAs(userRole.TestAdminAccount)
            }).wait(10);
            enable_donation_for_initiative({
                story_name: [story_name],
                fund_name: [fund_name],
                navigate_to: `Initiative/Payment/Donation Options`
            });
        });

        afterEach(() => {
            simpleLogout;
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Payment/Donation Options is opened
        //
        // Test Case Description
        // 1. Set donation options with a valid amount
        // 2. Verify that Success save message header is visible
        // 3. Verify that Success save message contains valid text
        it('Success setting of custom donation options.', () => {
            Initiative_page.set_donation_options({
                donation_option_1: donat_1, donation_option_2: donat_2, donation_option_3: donat_3,
                other_donation_option: other_don, min_donation_amount: min_donat, save_changes: save_change
            });
            Common_Actions.check_element_text(Initiative_page.success_save_message_header_xpath, success_msg_header, 0, true);
            Common_Actions.check_element_contains_text(Initiative_page.success_save_message_body_xpath, success_msg_body_1, 0, true);
            Common_Actions.check_element_contains_text(Initiative_page.success_save_message_body_xpath, success_msg_body_2, 0, true)
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Payment/Donation Options is opened
        //
        // Test Case Description
        // 1. Set donation options with higher that any of optional donations
        // 2. Verify that Save button is disabled
        it('Setting minimal donation higher that any of optional donations.', () => {
            Initiative_page.set_donation_options({
                donation_option_1: donat_1, donation_option_2: donat_2, donation_option_3: donat_3,
                other_donation_option: other_don, min_donation_amount: min_donat_over, save_changes: save_change
            });
            Common_Actions.check_element_is_disabled(Initiative_page.save_btn_xpath, 0, true)
        });

    });

    context('Payments -> Funds tab.', () => {
        const active = true;
        const fund_name_2 = `Test Fund Name 2`;

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
                simpleLoginAs(userRole.TestAdminAccount)
            }).wait(10);
            enable_donation_for_initiative({
                story_name: [story_name],
                fund_name: [fund_name],
                navigate_to: `Initiative/Payment/Funds`
            });
        });

        afterEach(() => {
            simpleLogout();
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Payment/Funds is opened
        //
        // Test Case Description
        // 1. Add new fund
        // 2. Verify that Cancel button is present on the page
        // 3. Verify that fields contain correct data
        it('Successfully add new fund.', () => {
            Basic_Initiative.add_new_fund({status: active, name: fund_name_2});
            Common_Actions.check_element_is_absent(Basic_Initiative.add_new_fund_cancel_btn);
            Basic_Initiative.check_fund_fields({index: 0, fund_status: `Active`, name: fund_name});
            Basic_Initiative.check_fund_fields({index: 1, fund_status: `Active`, name: fund_name_2})
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Payment/Funds is opened
        //
        // Test Case Description
        // 1. Click on "Add New Fund" button
        // 2. Verify that Save button is disabled
        // 3. Fill Fund name with valid data
        // 4. Verify that Save button is disabled
        // 5. Click on Cancel Button
        // 6. Verify that Save button is absent
        it('Check mandatory fields for adding a new fund.', () => {
            cy.xpath(Basic_Initiative.add_new_fund_btn_xpath).click();
            Common_Actions.check_element_is_disabled(Basic_Initiative.add_new_fund_save_btn);
            Basic_Initiative.add_new_fund_enter_name(fund_name_2);
            Common_Actions.check_element_is_enabled(Basic_Initiative.add_new_fund_save_btn);
            cy.get(Basic_Initiative.add_new_fund_cancel_btn).click();
            Common_Actions.check_element_is_absent(Basic_Initiative.add_new_fund_cancel_btn);
        });

    });

    context('Details -> Impact tab.', () => {
        const init_name = `${faker.fake("{{finance.accountName}}")}_${faker.random.number({
            'min': 0,
            'max': 100000000
        })}`;
        const invalid_total_fundraising_goal = `$ 999,999,999,999`;
        const valid_total_fundraising_goal = `$ 1,001`;
        const negative_total_fundraising_goal = `-99999999999`;
        const positive_total_fundraising_goal = `$ 99,999,999,999`;
        const participation_goal = `100,055`;
        const total_fundraising_goal_error_message_text = `monetaryGoal must be less than 100000000000`;
        const initiativeSuccessMessage = `Initiative ${init_name} updated`;

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
                simpleLoginAs(userRole.TestAdminAccount)
            }).wait(10);
            enable_donation_for_initiative({
                init_name: init_name,
                story_name: [story_name],
                fund_name: [fund_name],
                navigate_to: `Initiative/Details/Impact`
            });
        });

        afterEach(() => {
            simpleLogout();
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Details/Impact is opened
        //
        // Test Case Description
        // 1. Create fundraising goal and enter invalid total amount
        // 2. Verify that element has value from previous step
        // 3. Verify that Error message is shown
        // 4. Verify that Error message contains correct text
        // 5. Enter valid total amount
        // 6. Verify that Error message is shown
        // 7. Enter negative total amount
        // 8. Verify that Error message is shown
        // 9. Click "Save" button
        // 10. Verify that Success message exists
        it('Enter boundary values for Total Fundraising Goal.', () => {
            Basic_Initiative.enter_total_fundraising_goal(invalid_total_fundraising_goal);
            Common_Actions.check_element_has_value(Basic_Initiative.total_fundraising_goal_field, invalid_total_fundraising_goal);
            Common_Actions.check_element_text(Basic_Initiative.total_fundraising_goal_error_message, total_fundraising_goal_error_message_text);
            Basic_Initiative.enter_total_fundraising_goal(valid_total_fundraising_goal);
            Common_Actions.check_element_has_value(Basic_Initiative.total_fundraising_goal_field, valid_total_fundraising_goal);
            Common_Actions.check_element_is_absent(Basic_Initiative.total_fundraising_goal_error_message);
            Basic_Initiative.enter_total_fundraising_goal(negative_total_fundraising_goal);
            Common_Actions.check_element_has_value(Basic_Initiative.total_fundraising_goal_field, positive_total_fundraising_goal);
            Common_Actions.check_element_is_absent(Basic_Initiative.total_fundraising_goal_error_message);
            Basic_Initiative.click_save_changes_btn();
            cy.get(`body`).contains(initiativeSuccessMessage).should('exist', 5);
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Details/Impact is opened
        //
        // Test Case Description
        // 1. Fill Impact with valid data
        // 2. Verify that Success massage is shown
        // 3. Verify that Success massage contains correct text
        // 3. Verify that Total gift radiobutton is enabled
        it('Enter valid values for Impact.', () => {
            Basic_Initiative.fill_impact({
                fundraising_goal: valid_total_fundraising_goal,
                participation_goal: participation_goal,
                click_gifts_rbtn: true
            });
            cy.get(`body`).contains(initiativeSuccessMessage).should('exist', 5);
            Common_Actions.check_element_has_value(Basic_Initiative.total_fundraising_goal_field, valid_total_fundraising_goal);
            Common_Actions.check_element_has_value(Basic_Initiative.total_participation_goal_field, participation_goal);
            Common_Actions.check_radiobutton_is_selected(Basic_Initiative.total_gifts_rbtn)
        });

    });

    context('Preview of `Donor Checkout Form`', () => {

        const prefix_dropdown_label_text = `Prefix`;
        const first_name_label_text = `First Name`;
        const last_name_label_text = `Last Name`;
        const message_field_label_text = `Add a special message to this donation?`;
        const email_field_label_text = `Email Address`;
        const phone_field_label_text = `Phone Number`;
        const phone_type_dropdown_label_text = `Phone Type`;
        const street_address_field_label_text = `Street Address`;
        const select_country_dropdown_label_text = `Country`;
        const province_abbreviation_field_label_text = `State/Province`;
        const city_field_label_text = `City`;
        const postal_code_field_label_text = `Postal Code`;
        const should_be_displayed = true;

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data;
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local;
                simpleLoginAs(userRole.TestAdminAccount)
            });
            enable_donation_for_initiative({
                story_name: [story_name],
                fund_name: [fund_name],
                navigate_to: `Initiative/Setup/Pages`
            });
        });

        afterEach(() => {
            simpleLogout();
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Setup/Pages is opened
        //
        // Test Case Description
        // 1. Click on "Donor Checkout Form" button
        // 2. Verify that donor page labels contain correct text
        // 3. Verify that donor page labels are displayed
        it('`Donor Checkout Form` field labels verification.', () => {
            Common_Actions.wait_for_element(Initiative_page.pages_dropdown_xpath, 20, true);
            Initiative_page.select_pages(`Donor Checkout Form`);
            cy.wait(10*1000);
            Initiative_page.check_donor_page_field_labels({
                prefix_dropdown: prefix_dropdown_label_text,
                first_name: first_name_label_text,
                last_name: last_name_label_text,
                message_field: message_field_label_text,
                email_field: email_field_label_text,
                phone_field: phone_field_label_text,
                phone_type_dropdown: phone_type_dropdown_label_text,
                street_address_field: street_address_field_label_text,
                select_country_dropdown: select_country_dropdown_label_text,
                province_abbreviation_field: province_abbreviation_field_label_text,
                city_field: city_field_label_text,
                postal_code_field: postal_code_field_label_text
            });

            Initiative_page.check_donor_page_fields({
                prefix_dropdown: should_be_displayed,
                first_name_field: should_be_displayed,
                last_name_field: should_be_displayed,
                anonymous_checkbox: should_be_displayed,
                spouse_checkbox: should_be_displayed,
                message_field: should_be_displayed,
                email_field: should_be_displayed,
                phone_field: should_be_displayed,
                phone_type_dropdown: should_be_displayed,
                street_address_field: should_be_displayed,
                select_country_dropdown: should_be_displayed,
                province_abbreviation_field: should_be_displayed,
                city_field: should_be_displayed,
                postal_code_field: should_be_displayed,
                terms_and_conditions_checkbox: should_be_displayed,
                proceed_to_payment_btn: should_be_displayed
            })
        });
    });

    context('Preview of `Home - Live Event Page`', () => {

        const initiative = String(`Test_` + Common_Actions.random_organization_name());
        const url = `https://www.google.com`;
        const initiative_header = `Initiative Header Text`;
        const initiative_field_message = `For public display. This won't change your initiative's name.`;
        const headers = `Media`;
        const banner_image = `Banner Image`;
        const banner_image_sm_message = `870px x 475px minimum. 1920px x 1200px or larger recommended.`;
        const video_url = `Video URL`;
        const video_url_sm_message = `Paste the link to your YouTube video here.`;
        const welcome_heading = `Welcome test header.`;
        const welcome_text = `Welcome test text!`;
        const donate_button_label = `Donate test button name.`;
        const share_button_label = `Share test button name.`;
        const welcome_heading_label = `Welcome Heading Text`;
        const welcome_heading_sm_message_text = `characters remaining`;
        const welcome_text_label = `Welcome Text`;
        const welcome_text_sm_message = `characters remaining`;
        const donate_button_label_text = `Donate Button Label`;
        const share_button_label_text = `Share Button Label`;
        const funding_stats_option = `Show Total Only`;
        const participation_stats_option = `Show Goal Only`;
        const time_left_stats = `Show`;
        const funding_stats = `Funding Stats`;
        const participation_stats = `Participation Stats`;
        const time_left_stats_label = `Time Left Stats`;

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data;
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local;
                simpleLoginAs(userRole.TestAdminAccount)
            });
            api_complex_action({
                // init_name: [initiative],
                navigate_to: `Initiative/Setup/Pages`
            });
        });

        afterEach(() => {
            simpleLogout();
        });

        /*
        Test Description:
        Prerequisite:
        1) User is logged in
        2) User is on Organization/Initiative/Setup/Pages page
        Test Steps:
        1. Expand Pages dropdown
        2. Select `Home - Live Event Page` item
        3. Verify `Home - Live Event Page` content section (all elements)
        */

        it('`Home - Live Event Page` field labels verification.', () => {
            Initiative_page.select_pages(`Home - Live Event Page`);
            Initiative_page.click_content_section(`Page Header`);
            Initiative_page.fill_page_header_section({
                initiative: initiative,
                image_name: false,
                url: url
            });
            Initiative_page.check_page_header_section_labels({
                initiative_header: initiative_header,
                initiative_field_message: initiative_field_message,
                headers: headers,
                banner_image: banner_image,
                banner_image_sm_message: banner_image_sm_message,
                video_url: video_url,
                video_url_sm_message: video_url_sm_message
            });
            Initiative_page.click_content_section(`Welcome & Actions`);
            Initiative_page.fill_welcome_actions_section({
                welcome_heading: welcome_heading,
                welcome_text: welcome_text,
                donate_button_label: donate_button_label,
                share_button_label: share_button_label
            });
            Initiative_page.check_welcome_actions_section_labels({
                welcome_heading: welcome_heading_label,
                welcome_heading_sm_message_text: welcome_heading_sm_message_text,
                welcome_text: welcome_text_label,
                welcome_text_sm_message: welcome_text_sm_message,
                donate_button_label: donate_button_label_text,
                share_button_label: share_button_label_text
            });
            Initiative_page.click_content_section(`Statistics`);
            Initiative_page.fill_statistics_section({
                funding_stats_option: funding_stats_option,
                participation_stats_option: participation_stats_option,
                time_left_stats: time_left_stats
            });
            Initiative_page.check_statistics_section_labels({
                funding_stats: funding_stats,
                participation_stats: participation_stats,
                time_left_stats: time_left_stats_label
            });
        });

        /*
        Test Description:
        Prerequisite:
        1) User is logged in
        2) User is on Organization/Initiative/Setup/Pages page
        Test Steps:
        1. Expand Pages dropdown
        2. Select `Home - Live Event Page` item
        3. Verify `Home - Live Event Page` page preview (all elements)
        */

        // Test is skipped till the fix appears
        it.skip('`Home - Live Event Page` preview page verification.', () => {
            Initiative_page.select_pages(`Home - Live Event Page`);
            Initiative_page.click_content_section(`Page Header`);
            cy.wait(3*1000);
            Initiative_page.fill_page_header_section({
                initiative: initiative,
                image_name: false,
                url: url
            });
            Initiative_page.click_content_section(`Welcome & Actions`);
            Initiative_page.fill_welcome_actions_section({
                welcome_heading: welcome_heading,
                welcome_text: welcome_text,
                donate_button_label: donate_button_label,
                share_button_label: share_button_label
            });
            Initiative_page.click_content_section(`Statistics`);
            Initiative_page.fill_statistics_section({
                funding_stats_option: funding_stats_option,
                participation_stats_option: participation_stats_option,
                time_left_stats: time_left_stats
            });
            Initiative_page.clickSaveChangesButton();
            cy.wait(5*1000);
            Initiative_page.check_home_live_event_page_preview({
                initiative_header_page: initiative,
                welcome_heading_text_page: welcome_heading,
                welcome_text_page: welcome_text,
                donate_now_button_page: donate_button_label,
                share_button_page: share_button_label
            })
        });
    })
});
