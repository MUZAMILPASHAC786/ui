import checks from '../support/validations.js'
import actions from '../support/actions'
import { Then } from '@cucumber/cucumber';

Then(/^(I am (.*\s+)?Page, )?I expect that the title is( not)* "([^"]*)?"$/, async (page, falsecase, expectedTitle) => {
    await checks.checkTitle(expectedTitle, expectedTitle, falsecase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" is( not)* displayed$/, async (page, selector, falseCase) => {
    await checks.isDisplayed(selector, selector, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" is( not)* within the viewport$/, async (page, selector, falseCase) => {
    await checks.checkWithinViewport(selector, selector, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" does( not)* exist$/, async (page, selector, falseCase) => {
    await checks.isExisting(selector, selector, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?"( not)* contains the same text as "([^"]*)?"$/, async (page, selector1, falseCase, selector2) => {
    await checks.compareText(selector1, selector2, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?"( not)* contains the text "([^"]*)?"$/, async (page, selector, falseCase, expectedText) => {
    await checks.checkContainsText(selector, expectedText, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?"( not)* contains any text$/, async (page, selector, falseCase) => {
    await checks.checkContainsAnyText(selector, selector, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that the url is( not)* "([^"]*)?"$/, async (page, falseCase, expectedUrl) => {
    await checks.checkURL(expectedUrl, expectedUrl, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that the path is( not)* "([^"]*)?"$/, async (page, falseCase, expectedPath) => {
    await checks.checkURLPath(expectedPath, `${expectedPath}`, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that the( css)* attribute "([^"]*)?" from "([^"]*)?" is( not)* "([^"]*)?"$/, async (page, isCSS, attrName, selector, falseCase, expectedValue) => {
    await checks.checkProperty(isCSS, selector, attrName, expectedValue, attrName, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that checkbox "([^"]*)?" is( not)* checked$/, async (page, selector, falseCase) => {
    await checks.checkSelected(selector, selector, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" is( not)* selected$/, async (page, selector, falseCase) => {
    await checks.checkSelected(selector, selector, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" is( not)* enabled$/, async (page, selector, falseCase) => {
    await checks.isEnabled(selector, selector, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that cookie "([^"]*)?"( not)* exists$/, async (page, name, falseCase) => {
    await checks.checkCookieExists(name, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that cookie "([^"]*)?"( not)* contains the value "([^"]*)?"$/, async (page, name, falseCase, expectedValue) => {
    await checks.checkCookieContains(name, expectedValue, falseCase);
});

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" is( not)* positioned at ([\d+.?\d*]+)px on the (x|y) axis$/,
    async (page, selector, falseCase, expectedPosition, axis) => {
        await checks.checkOffset(selector, expectedPosition, axis, selector, falseCase);
    });

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" (has|does not have) the class "([^"]*)?"$/,
    async (page, selector, falseCase, expectedClassName) => {
        if (falseCase === "has") {
            await checks.checkClass(selector, expectedClassName, expectedClassName, true);
        }
        if (falseCase === "does not have") {
            await checks.checkClass(selector, expectedClassName, expectedClassName, false);
        }
    });

Then(/^(I am (.*\s+)?Page, )?I expect a new (window|tab) has( not)* been opened$/,
    async (page, windowOrTab, falseCase) => {
        await checks.checkNewWindow(windowOrTab, falseCase);
    });

Then(/^(I am (.*\s+)?Page, )?I expect the url "([^"]*)?" is opened in a new (tab|window)$/,
    async (page, expectedUrl, type) => {
        await checks.checkIsOpenedInNewWindow(expectedUrl, type);
    });

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" is( not)* focused$/,
    async (page, selector, falseCase) => {
        await checks.checkFocus(selector, selector, falseCase);
    });


Then(/^(I am (.*\s+)?Page, )?I expect that a (alertbox|confirmbox|prompt) is( not)* opened$/,
    async (page, modalType, falseState) => {
        await checks.checkModal(modalType, falseState);
    });

Then(/^(I am (.*\s+)?Page, )?I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "([^"]*)?"$/,
    async (page, modalType, falseState, expectedText) => {
        await checks.checkModalText(modalType, expectedText, falseState);
    });


Then(/^(I am (.*\s+)?Page, )?I expect the "([^"]*)" is( not)* clickable$/,
    async (page, selector, falseCase) => {
        await checks.isClickable(selector, falseCase);
    });

Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" is( not)* empty$/, async (page, element, falseCase) => {
    await checks.checkIsEmpty(element, element, falseCase);
});


// Below Steps:
Then(/^(I am (.*\s+)?Page, )?I expect the "([^"]*)" to( not)* wait till clicked$/,
    async (page, selector, falseCase) => {
        await actions.waitForClickable(selector, selector, falseCase);
    });

Then(/^(I am (.*\s+)?Page, )?I click on the "([^"]*)" will wait until the certain time$/,
    async (page, selector) => {
        await actions.waitUntil(selector,selector);
    });

Then(/^(I am (.*\s+)?Page, )?I get property "([^"]*)" from "([^"]*)"$/, async (page, value, selector) => {
    await actions.getProperty(selector, value, selector);
});

Then(/^(I am (.*\s+)?Page, )?I get the value of "([^"]*)"$/, async (page, selector) => {
    await actions.getValue(selector, selector);
});

Then(/^(I am (.*\s+)?Page, )?I wait on "([^"]*)?"(?: for (\d+)ms)*(?: to( not)* (be checked|be enabled|be selected|be displayed|contain a text|contain a value|exist))*$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },
    async (page, selector, ms, falseState, state) => {
        await actions.waitFor(selector, ms, falseState, state,selector);
    });


Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/, async (page, selector, falseCase, expectedSize, dimension) => {
    await checks.checkDimension(selector, expectedSize, dimension, falseCase);
});

// Then(/^(I am (.*\s+)?Page, )?I expect that the font( css)* attribute "([^"]*)?" from "([^"]*)?" is( not)* "([^"]*)?"$/, async (page, isCSS, attrName, elem, falseCase, expectedValue) => {
//     await checks.checkFontProperty(isCSS, attrName, elem, falseCase, expectedValue);
// });

// Then(/^(I am (.*\s+)?Page, )?I expect that "([^"]*)?" becomes( not)* visible$/, async (page, selector, falseCase) => {
//     await actions.waitForVisible(selector, falseCase);
// });

// Then(/^(I am (.*\s+)?Page, )?I expect the url to( not)* contain "([^"]*)?"$/, async (page, falseCase, expectedUrlPart) => {
//     await checks.checkInURLPath(falseCase, expectedUrlPart);
// });