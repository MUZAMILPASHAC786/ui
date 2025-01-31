import actions from '../support/actions'
import { When } from '@cucumber/cucumber';

When(/^(I am (.*\s+)?Page, )?I (click|doubleclick) on the "([^"]*)?"$/,
    async (page, action, selector) => {
        await actions.clickElement(action, selector, selector);
    });

When(/^(I am (.*\s+)?Page, )?I (add|set|enter) "([^"]*)?" to the inputfield "([^"]*)?"$/,
    async (page, method, value, selector) => {
        await actions.setInputField(method, value, selector, selector);
    });

When(/^(I am (.*\s+)?Page, )?I clear the inputfield "([^"]*)?"$/, async (page, selector) => {
    await actions.clearInputField(selector, selector);
});

When(/^(I am (.*\s+)?Page, )?I drag "([^"]*)?" to "([^"]*)?"$/, async (page, selector, destination) => {
    await actions.dragElement(selector, destination, selector, destination);
});


When(/^(I am (.*\s+)?Page, )?I set a cookie "([^"]*)?" with the content "([^"]*)?"$/,
    async (page, cookieName, cookieContent) => {
        await actions.setCookie(cookieName, cookieContent);
    },
);

When(/^(I am (.*\s+)?Page, )?I delete the cookie "([^"]*)?"$/, async (page, name) => {
    await actions.deleteCookies(name);
});

When(/^(I am (.*\s+)?Page, )?I press "([^"]*)?"$/, async (page, key) => {
    await actions.pressButton(key);
});

When(/^(I am (.*\s+)?Page, )?I (accept|dismiss) the (alertbox|confirmbox|prompt)$/,
    async (page, action, modalType) => {
        await actions.handleModal(action, modalType);
    });

When(/^(I am (.*\s+)?Page, )?I enter "([^"]*)?" into the prompt$/, async (page, modalText) => {
    await actions.setPromptText(modalText);
});

When(/^(I am (.*\s+)?Page, )?I scroll to "([^"]*)?"$/, async (page, selector) => {
    await actions.scroll(selector, selector);
});

When(/^(I am (.*\s+)?Page, )?I close the last opened (window|tab)$/, async (page, obsolete) => {
    await actions.closeLastOpenedWindow();
});

When(/^(I am (.*\s+)?Page, )?I focus the last opened (window|tab)$/, async (page, obsolete) => {
    await actions.focusLastOpenedWindow();
});

When(/^(I am (.*\s+)?Page, )?I select the (\d+)(st|nd|rd|th) option for "([^"]*)?"$/,
    async (page, index, obsolete, selector) => {
        await actions.selectOptionByIndex(selector, index);
    });

When(
    /^(I am (.*\s+)?Page, )?I select the option with the (name|value|text) "([^"]*)?" for "([^"]*)?"$/,
    async (page, selectionType, selectionValue, selector) => {
        await actions.selectOption(selector, selectionType, selectionValue);
    });

When(/^(I am (.*\s+)?Page, )?I move to "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/,
    async (page, selector, x, y) => {
        await actions.moveTo(selector, x, y, selector);
    });

When(/^(I am (.*\s+)?Page, )?I (select|selected) the value "([^"]*)" from dropdown$/,
    async (page, action, selector) => {
        await actions.clickElement(action, selector, selector);
        await browser.pause(2000);
    });

When(/^(I am (.*\s+)?Page, )?I switch to "([^"]*)" frame$/,
    async (page, selector) => {
        await actions.switchToFrame(selector, selector);
        await browser.pause(2000);
    });

When(/^(I am (.*\s+)?Page, )?I switch back to the parent frame$/,
    async (page) => {
        await actions.switchToParentFrame();
        await browser.pause(2000);
    });

When(/^(I am (.*\s+)?Page, )?I delete the all the cookies on the website "([^"]*)"$/,
    async (page, website) => {
        await actions.deleteAllCookies(website)
    });

When(/^(I am (.*\s+)?Page, )?I refresh the "([^"]*)" tab$/,
    async (page, tabName) => {
        await actions.refresh(tabName)
    });