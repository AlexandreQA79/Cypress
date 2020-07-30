--------------------------------------------------------------------- READ ME ---------------------------------------------------------------------
-- ############################################################################################################################################# --
-- ##   Dave Bell Note: I removed about 700 lines from this file on 6/8/2020.                                                                 ## --
-- ##   If you're looking for anything regarding audit_log data or id sequence updates, look at this file in the repo before 5/5/2020.        ## --
-- ##   Do not adjust existing users, user permissions, orgs, initiatives, or stories, without discussing it with the team.                   ## --
-- ############################################################################################################################################# --
------------------------------------------------------------------- END READ ME -------------------------------------------------------------------

ALTER TABLE "image" DISABLE TRIGGER ALL;
ALTER TABLE "person" DISABLE TRIGGER ALL;
ALTER TABLE "address" DISABLE TRIGGER ALL;
ALTER TABLE "organization" DISABLE TRIGGER ALL;
ALTER TABLE "audit_log" DISABLE TRIGGER ALL;
ALTER TABLE "video" DISABLE TRIGGER ALL;
ALTER TABLE "user" DISABLE TRIGGER ALL;
ALTER TABLE "initiative" DISABLE TRIGGER ALL;
ALTER TABLE "user_role" DISABLE TRIGGER ALL;
ALTER TABLE "story_initiative" DISABLE TRIGGER ALL;
ALTER TABLE "story_organization" DISABLE TRIGGER ALL;
ALTER TABLE "spreedly_log" DISABLE TRIGGER ALL;
ALTER TABLE "phone" DISABLE TRIGGER ALL;
ALTER TABLE "redirect" DISABLE TRIGGER ALL;
ALTER TABLE "fund" DISABLE TRIGGER ALL;
ALTER TABLE "story" DISABLE TRIGGER ALL;
ALTER TABLE "spreedly_gateway" DISABLE TRIGGER ALL;
ALTER TABLE "spreedly_receiver" DISABLE TRIGGER ALL;
ALTER TABLE "donation" DISABLE TRIGGER ALL;
ALTER TABLE "import_log" DISABLE TRIGGER ALL;
ALTER TABLE "story_fund" DISABLE TRIGGER ALL;
ALTER TABLE "sponsor" DISABLE TRIGGER ALL;
ALTER TABLE "champion_story_initiative" DISABLE TRIGGER ALL;
ALTER TABLE "reviewer" DISABLE TRIGGER ALL;
ALTER TABLE "cart" DISABLE TRIGGER ALL;
ALTER TABLE "challenge" DISABLE TRIGGER ALL;
ALTER TABLE "challenge_story_initiative" DISABLE TRIGGER ALL;
ALTER TABLE "channel" DISABLE TRIGGER ALL;
ALTER TABLE "initiative_fund" DISABLE TRIGGER ALL;
ALTER TABLE "match" DISABLE TRIGGER ALL;
ALTER TABLE "match_story_initiative" DISABLE TRIGGER ALL;
ALTER TABLE "reward" DISABLE TRIGGER ALL;
ALTER TABLE "reward_story_initiative" DISABLE TRIGGER ALL;
ALTER TABLE "taxonomy" DISABLE TRIGGER ALL;
ALTER TABLE "story_taxonomy" DISABLE TRIGGER ALL;
ALTER TABLE "page" DISABLE TRIGGER ALL;
ALTER TABLE "geocode" DISABLE TRIGGER ALL;

TRUNCATE TABLE "image" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "person" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "address" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "organization" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "audit_log" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "video" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "initiative" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "user_role" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "story_initiative" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "story_organization" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "spreedly_log" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "phone" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "redirect" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "fund" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "story" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "spreedly_gateway" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "spreedly_receiver" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "donation" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "import_log" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "story_fund" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "sponsor" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "champion_story_initiative" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "reviewer" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "cart" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "challenge" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "challenge_story_initiative" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "channel" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "initiative_fund" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "match" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "match_story_initiative" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "reward" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "reward_story_initiative" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "taxonomy" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "story_taxonomy" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "page" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "geocode" RESTART IDENTITY CASCADE;

--
-- PostgreSQL database dump
--

--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.person (first_name, last_name, display_name, email)
VALUES
('Organization', 'Administrator', 'org_admin', 'qa+org_admin@communityfunded.com'),
('Initiative', 'Administrator', 'init_admin', 'qa+init_admin@communityfunded.com'),
('Story', 'Teller', 'story_teller', 'qa+story_teller@communityfunded.com'),
('Sergey', 'Kay', 'Sergey_Kay', 'sergey@communityfunded.com'),
('Api', 'Account', 'Api_Account', 'qa+api@communityfunded.com');

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.user (is_suspended, invite_status, login_id, invite_expire_date, person_id)
VALUES
(false, 'COMPLETED', 'qa+org_admin@communityfunded.com', '2030-12-31 23:59:59', 1),
(false, 'COMPLETED', 'qa+init_admin@communityfunded.com', '2030-12-31 23:59:59', 2),
(false, 'COMPLETED', 'qa+story_teller@communityfunded.com', '2030-12-31 23:59:59', 3),
(false, 'COMPLETED', 'sergey@communityfunded.com', '2030-12-31 23:59:59', 4),
(false, 'COMPLETED', 'qa+api@communityfunded.com', '2030-12-31 23:59:59', 5);

--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.organization (name, api_key, is_active, attributes, fund_template, mailing_address_id, billing_address_id, primary_user_id, parent_org_id, slug)
VALUES
('Community Funded', NULL, true, '{"misc": {}, "theme": {"fonts": {"bodyFont": "Open Sans", "headingFont": "Open Sans"}, "colors": {"button": {"color": "#ffA578", "transparent": false}, "primary": {"color": "#31d869", "transparent": false}, "secondary": {"color": "#2099b6", "transparent": false}}, "background": {}}, "header": {"links": {"navItems": [{"url": "/", "label": "Home"}, {"url": "/services", "label": "Services"}, {"url": "/about", "label": "About"}, {"url": "/contact", "label": "Contact"}, {"url": "/updates", "label": "Updates"}]}, "colors": {"linkColor": {"color": "#2099b6", "transparent": false}, "navBgColor": {"color": "#f8f8f8", "transparent": false}, "headerBgColor": {"color": "#ffffff", "transparent": false}, "selectedLinkColor": {"color": "#045c82", "transparent": false}, "selectedLinkBgColor": {"color": "#e2e2e2", "transparent": false}}, "design": {"navSize": {"key": "normal", "name": "normal", "label": "Normal"}, "navAlignment": {"key": "center", "name": "centered", "label": "Centered"}, "navPlacement": {"key": "bottom", "name": "belowLogo", "label": "Beneath Logo"}, "logoAlignment": {"key": "center", "name": "centered", "label": "Centered"}, "navigationFont": "Open Sans", "headerPlacement": {"key": "aboveLogo", "name": "aboveLogo", "label": "Embedded in Page"}}}, "displayGlobalHeader": true, "overrideGlobalTheme": false, "overrideGlobalHeader": false}', '[{"id": "QBqbPGKhX", "name": "Name", "isActive": true, "fieldType": "singleLineText", "isRequired": true, "isRemovable": false}, {"id": "MxAPcQcEZ", "name": "Code", "isActive": true, "fieldType": "singleLineText", "isRequired": true, "isRemovable": false}]', NULL, NULL, 1, NULL, 'community-funded'),
('CF Test Org', NULL, true, '{"misc": {}, "theme": {"fonts": {"bodyFont": "Open Sans", "headingFont": "Open Sans"}, "colors": {"button": {"color": "#ffA578", "transparent": false}, "primary": {"color": "#31d869", "transparent": false}, "secondary": {"color": "#2099b6", "transparent": false}}, "background": {}}, "header": {"links": {"navItems": [{"url": "/", "label": "Home"}, {"url": "/services", "label": "Services"}, {"url": "/about", "label": "About"}, {"url": "/contact", "label": "Contact"}, {"url": "/updates", "label": "Updates"}]}, "colors": {"linkColor": {"color": "#2099b6", "transparent": false}, "navBgColor": {"color": "#f8f8f8", "transparent": false}, "headerBgColor": {"color": "#ffffff", "transparent": false}, "selectedLinkColor": {"color": "#045c82", "transparent": false}, "selectedLinkBgColor": {"color": "#e2e2e2", "transparent": false}}, "design": {"navSize": {"key": "normal", "name": "normal", "label": "Normal"}, "navAlignment": {"key": "center", "name": "centered", "label": "Centered"}, "navPlacement": {"key": "bottom", "name": "belowLogo", "label": "Beneath Logo"}, "logoAlignment": {"key": "center", "name": "centered", "label": "Centered"}, "navigationFont": "Open Sans", "headerPlacement": {"key": "aboveLogo", "name": "aboveLogo", "label": "Embedded in Page"}}}, "displayGlobalHeader": true, "overrideGlobalTheme": false, "overrideGlobalHeader": false}', '[{"id": "QBqbPGKhX", "name": "Name", "isActive": true, "fieldType": "singleLineText", "isRequired": true, "isRemovable": false}, {"id": "MxAPcQcEZ", "name": "Code", "isActive": true, "fieldType": "singleLineText", "isRequired": true, "isRemovable": false}]', NULL, NULL, 1, 1, 'cf-test-org');

--
-- Data for Name: initiative; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.initiative(name,is_active,is_published,donations_enabled,display_global_header,override_global_theme,attributes,checkout_questions,donor_checkout_receipt,quick_donate_amounts,organization_id,created_user_id,primary_user_id)
VALUES
('CF Test Initiative',TRUE,FALSE,TRUE,TRUE,TRUE,NULL,NULL,'{"bcc": ["qa+org_admin@communityfunded.com"], "content": {"html": "<p>Thank you for your donation.</p>", "json": {"blocks": [{"key": "f4qvs", "data": {}, "text": "Thank you for your donation.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}}, "enabled": false, "subject": "Thank you for your donation!", "fromName": "Org Administrator", "fromAddress": "gifts@communityfunded.com", "replyAddress": "qa+org_admin@communityfunded.com", "taxDeductible": false, "salutationHeader": "Dear", "salutationLastName": true, "salutationFirstName": true}','{"first": 25, "other": true, "third": 100, "second": 50}',2,2,1);

--
-- Data for Name: channel; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.channel(name,channel_type,attributes,initiative_id)
VALUES
('Web','WEB','{"misc": {}, "theme": {"fonts": {"bodyFont": "Open Sans", "headingFont": "Open Sans"}, "colors": {"button": {"color": "#ffA578", "transparent": false}, "primary": {"color": "#33cf66", "transparent": false}, "secondary": {"color": "#2099b6", "transparent": false}}, "background": {"backgroundImage": null}}, "header": {"links": {"navItems": [{"url": "/", "label": "Home"}, {"url": "/services", "label": "Services"}, {"url": "/about", "label": "About"}, {"url": "/contact", "label": "Contact"}, {"url": "/blog", "label": "Blog"}]}, "colors": {"linkColor": {"color": "#1d5c6b", "transparent": false}, "navBgColor": {"color": "#f8f8f8", "transparent": false}, "headerBgColor": {"color": "#ffffff", "transparent": false}, "selectedLinkColor": {"color": "#778f9a", "transparent": false}, "selectedLinkBgColor": {"color": "#1a4260", "transparent": false}}, "design": {"navSize": {"key": "normal", "name": "normal", "label": "Normal"}, "navAlignment": {"key": "center", "name": "centered", "label": "Centered"}, "navPlacement": {"key": "bottom", "name": "belowLogo", "label": "Beneath Logo"}, "logoAlignment": {"key": "center", "name": "centered", "label": "Centered"}, "navigationFont": "Open Sans", "headerPlacement": {"key": "aboveLogo", "name": "aboveLogo", "label": "Embedded in Page"}}}, "displayGlobalHeader": true, "overrideGlobalTheme": false, "overrideGlobalHeader": false}',1);

--
-- Data for Name: donor_segment; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.donor_segment(name,alias,donor_wall_enabled,icon,sort_order,is_active,initiative_id)
VALUES
('All Donors',NULL,FALSE,NULL,0,TRUE,1);

--
-- Data for Name: page; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.page(name,slug,label,page_type,attributes,channel_id)
VALUES
('Home Page','cf-test-initiative','Home - Live Event Page','HOME','{"type": "HOME", "media": {"bannerImage": {"id": 0, "largeUrl": "/img/initiative-homepage-default-bannerImage.jpg"}}, "stats": {"funding": "TOTAL_VS_GOAL", "showTimeLeft": "SHOW", "participationCounts": "TOTAL_VS_GOAL"}, "welcome": {"text": "Welcome!", "labels": {"share": "Share", "donate": "Donate Now"}, "heading": "Welcome header"}, "published": false, "headerText": "CF Test Initiative", "initiativeId": 1, "customContent": [{"id": "_XoYKrF-_", "data": {"title": "Stories", "display": {"images": true, "titles": true, "borders": true, "summaries": true}, "seeMoreLabel": "See More", "statsDisplay": {"funding": "GOAL", "showTimeLeft": "SHOW", "participationCounts": "GOAL"}, "defaultCardCount": 6, "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "STORIES", "displayed": true}, {"id": "C8bYJNPZXU", "data": {"title": "Challenges", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Inspire Action!", "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "CHALLENGES", "displayed": true}, {"id": "bfTP9TN-EO", "data": {"title": "Matching Gifts", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Multiply Your Impact!", "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "MATCHES", "displayed": true}, {"id": "55V9lTLz_n", "data": {"title": "Rewards", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Be Rewarded for Making an Impact!", "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "REWARDS", "displayed": true}, {"id": "ZdL1cV9s2l", "data": {"title": "Community", "donateLabel": "Donate Now!", "seeMoreLabel": "See More", "defaultCardCount": 8}, "type": "COMMUNITY", "displayed": true}]}',1),
('Coming Soon Page','cf-test-initiative-coming-soon','Home - Coming Soon Page','INIT_COMING_SOON','{"type": "INIT_COMING_SOON", "media": {"bannerImage": {"id": 0, "largeUrl": "/img/initiative-homepage-default-bannerImage.jpg"}}, "stats": {"funding": "TOTAL_VS_GOAL", "showTimeLeft": "SHOW", "participationCounts": "TOTAL_VS_GOAL"}, "welcome": {"text": "Welcome!", "labels": {"share": "Share", "donate": "Donate Now"}, "heading": "Welcome header"}, "headerText": "CF Test Initiative", "initiativeId": 1, "customContent": [{"id": "_XoYKrF-_", "data": {"title": "Stories", "display": {"images": true, "titles": true, "borders": true, "summaries": true}, "seeMoreLabel": "See More", "statsDisplay": {"funding": "GOAL", "showTimeLeft": "SHOW", "participationCounts": "GOAL"}, "defaultCardCount": 6, "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "STORIES", "displayed": true}, {"id": "C8bYJNPZXU", "data": {"title": "Challenges", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Inspire Action!", "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "CHALLENGES", "displayed": true}, {"id": "bfTP9TN-EO", "data": {"title": "Matching Gifts", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Multiply Your Impact!", "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "MATCHES", "displayed": true}, {"id": "55V9lTLz_n", "data": {"title": "Rewards", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Be Rewarded for Making an Impact!", "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "REWARDS", "displayed": true}]}',1),
('Donor Checkout Page','cf-test-initiative-checkout','Donor Checkout Page','INIT_CHECKOUT_FORM','{"type": "INIT_CHECKOUT_FORM", "fields": {"spouse": {"required": true, "displayed": true}, "honorific": {"required": false, "displayed": true}, "phoneType": {"required": true, "displayed": true}, "phoneNumber": {"required": true, "displayed": true}, "billingAddress": {"city": {"required": true, "displayed": true}, "country": {"required": true, "displayed": true}, "stateProvince": {"required": true, "displayed": true}, "streetAddress": {"required": true, "displayed": true}, "streetAddress2": {"required": true, "displayed": true}}, "mailingAddress": {"city": {"required": true, "displayed": true}, "country": {"required": true, "displayed": true}, "stateProvince": {"required": true, "displayed": true}, "streetAddress": {"required": true, "displayed": true}, "streetAddress2": {"required": false, "displayed": true}}}, "published": true, "customFields": [], "initiativeId": 1}',1),
('Story Page Defaults',NULL,'Story Fundraising Page Defaults','STORY_DEFAULTS','{"media": {"bannerImage": {"id": 0, "largeUrl": "/img/story-homepage-default-bannerImage.png"}}, "stats": {"funding": "GOAL", "showTimeLeft": "SHOW", "participationCounts": "GOAL"}, "initiativeId": 1, "titleActions": {"labels": {"share": "Share", "donate": "Donate Now"}}, "hideStoryCard": true}',1),
('Story Idea Form','cf-test-initiative-idea','Story Idea Submission Form','STORY_IDEA_FORM','{"terms": {"kind": "link", "linkValue": "https://qa-v2.communityfunded.com/terms"}, "fields": [], "boilerplate": {"header": {"text": "CF Test Initiative"}, "headerText": "CF Test Initiative", "callToAction": {"text": "Submit Your Story Idea"}, "instructions": {"text": "Fill out the form to submit your story idea."}, "phoneNumberRequired": false, "requestAddressFields": false}, "initiativeId": 1}',1),
('Donor Checkout Thank You Page',NULL,'Donor Checkout Thank You Page','INIT_CHECKOUT_THANK_YOU_FORM','{"type": "INIT_CHECKOUT_THANK_YOU_FORM", "media": {"videoLink": null, "bannerImage": null}, "pageTitle": "Thank You, {{name}}", "thankYouMessage": {"html": "<p>But don''t just take our word for it.</p>\\n<p>Hear it from your recipients and help them <strong>spread the word.</strong></p>\\n", "json": {"blocks": [{"key": "dh0f1", "data": {}, "text": "But don''t just take our word for it.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "fqdjs", "data": {}, "text": "Hear it from your recipients and help them spread the word.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "BOLD", "length": 16, "offset": 43}]}], "entityMap": {}}}}',1),
('Story Fundraising Page',NULL,NULL,'STORY','{"type": "STORY", "media": {"bannerImage": {"id": 0, "largeUrl": "/img/story-homepage-default-bannerImage.png"}}, "stats": {"funding": "GOAL", "showTimeLeft": "SHOW", "participationCounts": "GOAL"}, "terms": {"kind": "link", "linkValue": "https://qa-v2.communityfunded.com/terms"}, "fields": [], "storyId": 1, "boilerplate": {"header": {"text": "CF Test Initiative"}, "headerText": "CF Test Initiative", "callToAction": {"text": "Submit Your Story Idea"}, "instructions": {"text": "Fill out the form to submit your story idea."}, "phoneNumberRequired": false, "requestAddressFields": false}, "initiativeId": 1, "titleActions": {"labels": {"share": "Share", "donate": "Donate Now"}}, "customContent": [{"id": "CqTuPVnPu", "data": {"title": "Community", "donateLabel": "Donate Now!", "seeMoreLabel": "See More", "defaultCardCount": 8}, "type": "COMMUNITY", "displayed": true}, {"id": "9gblYODhn-", "data": {"title": "Challenges", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Inspire Action!", "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "CHALLENGES", "displayed": true}, {"id": "SZYoFnOkWn", "data": {"title": "Matching Gifts", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Multiply Your Impact!", "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "MATCHES", "displayed": true}, {"id": "q2OKjLCr63", "data": {"title": "Rewards", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Be Rewarded for Making an Impact!", "entityManagement": {"entities": {"showAll": true, "showcasedEntitiesIds": []}, "sortType": "AUTOMATIC"}}, "type": "REWARDS", "displayed": true}, {"id": "6xoQZjl90N", "data": {"title": "Story Updates", "callToAction": {"url": "", "label": "", "displayed": false}, "seeMoreLabel": "", "defaultCardCount": 6, "engagementHeader": "Keep your community informed!"}, "type": "STORY_UPDATE", "displayed": true}], "hideStoryCard": true}',1);

--
-- Data for Name: user_permission; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.user_permission (permission_type, user_id, organization_id, initiative_id)
VALUES
('PAYMENT_MANAGEMENT', 1, 1, NULL),
('PAYMENT_MANAGEMENT', 1, 2, NULL),
('REVIEWER', 2, NULL, 1),
('PAYMENT_MANAGEMENT', 4, 1, NULL),
('PAYMENT_MANAGEMENT', 5, 1, NULL);

--
-- Data for Name: story; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.story(slug,title,summary,headline,is_active,created_user_id,primary_user_id)
VALUES
('cf-test-story','CF Test Story','Summary','Headline',TRUE,1,3);

--
-- Data for Name: story_initiative; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.story_initiative(participant_goal,participant_count_type,monetary_goal,status,visibility,impact_summary,is_active,is_published,donations_enabled,content_editing_enabled,idea_is_approved,initiative_id,story_id,created_user_id,primary_user_id)
VALUES
(0,'UNIQUE_DONORS',0,'DRAFT','PUBLIC','Impact Summary',TRUE,FALSE,FALSE,TRUE,FALSE,1,1,1,3);

--
-- Data for Name: story_initiative_log; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.story_initiative_log(story_initiative_id,initiative_id,story_id,status)
VALUES
(1,1,1,'DRAFT');

--
-- Data for Name: fund; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.fund (display_name, attributes, is_active, organization_id, initiative_id, is_action_needed)
VALUES
('CF-Unassigned', '[]', true, null, null, false);

--
-- Data for Name: story_organization; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.story_organization(organization_id,story_id)
VALUES
(2,1);

--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: cf_root
--

INSERT INTO public.user_role (role_name, user_id, organization_id, initiative_id, story_id)
VALUES
('ADMIN', 1, 2, NULL, NULL),
('ADMIN', 2, NULL, 1, NULL),
('STORY_TELLER', 3, NULL, NULL, 1),
('ADMIN', 4, 1, NULL, NULL),
('ADMIN', 5, 1, NULL, NULL);


-- Insert Colorado for smoke tests
INSERT INTO public.geocode (country_code, country_name, postal_code, city, state_code, state_province, latitude, longitude)
VALUES ( 'US', 'United States', '80260', 'Denver', 'CO', 'Colorado', 39.8672, -105.004);

INSERT INTO public.state_list(state_province,state_code,country_name,country_code)
VALUES ('Colorado','CO','United States','US');

--
-- PostgreSQL database dump complete
--

ALTER TABLE "image" ENABLE TRIGGER ALL;
ALTER TABLE "person" ENABLE TRIGGER ALL;
ALTER TABLE "address" ENABLE TRIGGER ALL;
ALTER TABLE "organization" ENABLE TRIGGER ALL;
ALTER TABLE "audit_log" ENABLE TRIGGER ALL;
ALTER TABLE "video" ENABLE TRIGGER ALL;
ALTER TABLE "user" ENABLE TRIGGER ALL;
ALTER TABLE "initiative" ENABLE TRIGGER ALL;
ALTER TABLE "user_role" ENABLE TRIGGER ALL;
ALTER TABLE "story_initiative" ENABLE TRIGGER ALL;
ALTER TABLE "story_organization" ENABLE TRIGGER ALL;
ALTER TABLE "spreedly_log" ENABLE TRIGGER ALL;
ALTER TABLE "phone" ENABLE TRIGGER ALL;
ALTER TABLE "redirect" ENABLE TRIGGER ALL;
ALTER TABLE "fund" ENABLE TRIGGER ALL;
ALTER TABLE "story" ENABLE TRIGGER ALL;
ALTER TABLE "spreedly_gateway" ENABLE TRIGGER ALL;
ALTER TABLE "spreedly_receiver" ENABLE TRIGGER ALL;
ALTER TABLE "donation" ENABLE TRIGGER ALL;
ALTER TABLE "import_log" ENABLE TRIGGER ALL;
ALTER TABLE "story_fund" ENABLE TRIGGER ALL;
ALTER TABLE "sponsor" ENABLE TRIGGER ALL;
ALTER TABLE "champion_story_initiative" ENABLE TRIGGER ALL;
ALTER TABLE "reviewer" ENABLE TRIGGER ALL;
ALTER TABLE "cart" ENABLE TRIGGER ALL;
ALTER TABLE "challenge" ENABLE TRIGGER ALL;
ALTER TABLE "challenge_story_initiative" ENABLE TRIGGER ALL;
ALTER TABLE "channel" ENABLE TRIGGER ALL;
ALTER TABLE "initiative_fund" ENABLE TRIGGER ALL;
ALTER TABLE "match" ENABLE TRIGGER ALL;
ALTER TABLE "match_story_initiative" ENABLE TRIGGER ALL;
ALTER TABLE "reward" ENABLE TRIGGER ALL;
ALTER TABLE "reward_story_initiative" ENABLE TRIGGER ALL;
ALTER TABLE "taxonomy" ENABLE TRIGGER ALL;
ALTER TABLE "story_taxonomy" ENABLE TRIGGER ALL;
ALTER TABLE "page" ENABLE TRIGGER ALL;
ALTER TABLE "geocode" ENABLE TRIGGER ALL;
