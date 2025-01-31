import { Given } from '@cucumber/cucumber';

import actions from '../support/actions'
import checks from '../support/validations'

Given(/^(I am (.*\s+)?Page, )?I open the (site|url) "([^"]*)?"$/, async (page,type, url) => {
    await actions.openWebsite(url);
});

Given(/^(I am (.*\s+)?Page, )?I have a screen that is ([\d]+) by ([\d]+) pixels$/, async (page, screenWidth, screenHeight) => {
    await actions.setWindowSize(screenWidth, screenHeight);
});

Given(/^(I am (.*\s+)?Page, )?I have closed all but the first (window|tab)$/, async (page, obsolete) => {
    await actions.closeAllButFirstTab(obsolete);
});

Given(/^(I am (.*\s+)?Page, )?a (alertbox|confirmbox|prompt) is( not)* opened$/, async (page, modalType, falseState) => {
    await checks.checkModal(modalType, falseState);
});
