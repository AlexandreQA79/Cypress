const faker = require('faker');

import {Env} from '../../Config'
import * as Utils from "../../utils/utils";
import {enable_donation_for_initiative} from "../../utils/Helpers/pageObject/CreateEdit_Organization_Initiatives_api";
import * as Basic_Story from '../../utils/Helpers/pageObject/Basic_Story'

describe('Create | Edit a Story', () => {
    let fixture: any;
    let userRole: any;

    // Labels text
    const story_name_description_label_hardcoded_text = 'Use this space for a quick overview of the impact of support, example: Help us reach our goal of sending 10 students to the annual Leadership Conference!';
    const story_name_label_text = 'Story Name';
    const story_url_label_text = 'URL String';
    const story_summary_label_text = 'Summary';

    const summary = '';

    // Story name
    const storyName = `${faker.fake("{{finance.accountName}}")}_${faker.random.number({
        'min': 0,
        'max': 100000000
    })}`;
    const newStoryName = `${faker.fake("{{finance.accountName}}")}_${faker.random.number({
        'min': 0,
        'max': 100000000
    })}`;

    beforeEach(() => {
        cy.fixture('SmokeFixture').then((data) => {
            fixture = data
            userRole = Env.adminHost ? fixture.UserRole.ci : fixture.UserRole.local
            Utils.simpleLoginAs(userRole.TestAdminAccount)

            enable_donation_for_initiative({
                story_name: [],
                navigate_to: `Initiative/Stories`
            })
        })
    });

    afterEach(() => {
        Utils.simpleLogout()
    });

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit Story page
    // 2. Fill valid data into labels on Story page
    // 3. Create new story
    // 4. Verify that new story has created and has valid data
    it('Select to Create New Story', () => {
        Basic_Story.create_story(storyName);
        Basic_Story.check_story_setup_page_fields_contain_text(storyName, summary);
        Basic_Story.check_story_setup_page_labels_text(
            story_name_label_text,
            story_url_label_text,
            story_summary_label_text,
            storyName,
            story_name_description_label_hardcoded_text,
            )
    });

    // Preconditions:
    // User is logged in
    //
    // Test Case Description
    // 1. Visit Story page
    // 2. Fill valid data into labels on Story page
    // 3. Create new story
    // 4. Verify that new story has created and has valid data
    // 5. Edit story
    // 6. Verify that story can be edited
    it('Select to Edit New Story', () => {
        Basic_Story.create_story(storyName);
        Basic_Story.enter_story_name(newStoryName, true);
        Basic_Story.save_changes_story();
        Basic_Story.check_story_setup_page_fields_contain_text(newStoryName, summary, false);
    })
});
