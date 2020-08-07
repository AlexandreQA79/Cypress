const faker = require('faker');

import {Env} from '../../Config'
import {enable_donation_for_initiative} from "../../utils/Helpers/pageObject/CreateEdit_Organization_Initiatives_api";
import {loginAs, simpleLoginAs, simpleLogout} from "../../utils/utils";
import * as Transaction from "../../utils/Helpers/pageObject/CreateEdit_Initiative_Transaction";
import * as Common_Actions from "../../utils/Helpers/pageObject/Common_Actions";

describe('Transactions for Initiative.', () => {

    let fixture: any;
    let userRole: any;
    const story_name = `Test story_1`;
    const fund_name = `Test Fund Name`;

    //Transaction form
    const transaction_amount = 111;
    const transaction_number_of_donors = 2;
    const donor_number_stories = 1;
    const donor_gifts = 1;
    const status = `Completed`;
    const prefix = `Mr.`;
    const first_name = `TestFirstName_`;
    const last_name = `TestLastName_`;
    const spouse_prefix = `Mrs.`;
    const spouse_first_name = `SpouseFirstName_`;
    const spouse_last_name = `SpouseLastName_`;
    const email = `sergey@communityfunded.com`;
    // const phone_number = faker.random.number({'min': 1000000000, 'max': 9999999999});
    const phone_number = `1111111111`;
    const phone_type = `Work`;
    const street_address = `Backer Street 221B`;
    const country = `UA`;
    const province = `Khar`;
    const city = `Kharkiv`;
    const postal_code = `12-345`;
    const notes = `Test notes.`;
    const type = `OFFLINE`;
    const transaction_type = `Donation`;


    context('Make Transactions.', () => {

        beforeEach(() => {
            cy.fixture('SmokeFixture').then((data) => {
                fixture = data
                userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local;
                simpleLoginAs(userRole.TestAdminAccount)
                cy.wait(5 * 1000)
            });
            enable_donation_for_initiative({
                story_name: [story_name],
                fund_name: [fund_name],
                navigate_to: `Initiative/Transactions/Add_Single_Transaction`
            });
        });

        afterEach(() => {
            simpleLogout()
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Transactions/Add_Single_Transaction is opened
        //
        // Test Case Description
        // 1. Fill Single Transaction Form with correct data
        // 2. Verify that Save button is enabled
        // 3. Click on Transaction Is For An Identifiable Person checkbox
        // 4. Verify that Save button is enabled
        // 5. Click on Transaction Is For An Identifiable Person checkbox
        // 6. Verify that Save button is enabled
        it('Add a Single Transaction.', () => {
            Transaction.fill_single_transaction_form({transaction_story: story_name});
            Common_Actions.check_element_is_enabled(Transaction.save_changes_btn);
            Transaction.click_transaction_is_for_an_identifiable_person_checkbox();
            Common_Actions.check_element_is_enabled(Transaction.save_changes_btn);
            Transaction.click_transaction_is_for_an_identifiable_person_checkbox();
            Common_Actions.check_element_is_enabled(Transaction.save_changes_btn);
        });

        // Preconditions:
        // User is logged in
        // Donation is enabled
        // Initiative/Transactions/Add_Single_Transaction is opened
        //
        // Test Case Description
        // 1. Fill Single Transaction Form with correct data
        // 2. Verify that Single Transaction Form has data from previous step
        // 3. Open "Donor" tab
        // 4. Verify that Donor fields contain data from step 2
        it('Add a Single Transaction.', () => {
            Transaction.fill_single_transaction_form({
                click_save_button: true,
                click_transactions_tab: true,
                transaction_amount: transaction_amount,
                transaction_number_of_donors: transaction_number_of_donors,
                transaction_story: story_name,
                prefix: prefix,
                first_name: first_name,
                last_name: last_name,
                spouse_prefix: spouse_prefix,
                spouse_first_name: spouse_first_name,
                spouse_last_name: spouse_last_name,
                email: email,
                phone_number: phone_number,
                phone_type: phone_type,
                notes: notes,
                street_address: street_address,
                country: country,
                province: province,
                city: city,
                postal_code: postal_code
            });

            cy.wait(3 * 1000);

            Transaction.check_transaction_section({
                status: status,
                prefix: prefix,
                first_name: first_name,
                last_name: last_name,
                spouse_prefix: spouse_prefix,
                spouse_first_name: spouse_first_name,
                spouse_last_name: spouse_last_name,
                amount: transaction_amount,
                type: type,
                transaction_type: transaction_type,
                story_name: story_name,
                email: email,
                phone: phone_number,
                phone_type: phone_type.toUpperCase(),
                city: city,
                postal_code: postal_code,
                country: country,
                notes: notes
            });

            Transaction.navigate_to_donor_tab();

            Transaction.check_donors_section({
                donor_prefix: prefix,
                donor_first_name: first_name,
                donor_last_name: last_name,
                donor_number_stories: donor_number_stories,
                donor_gifts: donor_gifts,
                donor_total: transaction_amount,
                donor_type: type,
                donor_date_added: Common_Actions.getDate(),
                donor_most_recent_gift: Common_Actions.getDate(),
                donor_email: email,
                donor_phone: phone_number,
                donor_phone_type: phone_type.toUpperCase(),
                donor_mailing_address: street_address,
                donor_city: city,
                donor_state_province: province,
                donor_postal_code: postal_code,
                donor_country: country
            });
        });

    })
});
