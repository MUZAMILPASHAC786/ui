import Logger from '../common/loggers';

/**
 * This is a class which contains the Methods related to mobile actions
 */
class MobileActions {
    /**
     * Scroll the page based on the given direction
     * @param {string} side Direction for Scrolling For Ex: right, left, up, down
     */
    async scrolling(side) {
        Logger.info(`Scrolling to the ${side}`);
        try {
            let direction = side.toLowerCase();
            var { width, height } = await browser.getWindowSize();
            var startX;
            var startY;
            var endX;
            var endY;
            if (direction === 'left') {
                startX = parseInt(width * 0.9);
                startY = parseInt(height * 0.5);
                endX = parseInt(width * 0.1);
                endY = parseInt(height * 0.5);
            } else if (direction === 'right') {
                startX = parseInt(width * 0.1);
                startY = parseInt(height * 0.5);
                endX = parseInt(width * 0.9);
                endY = parseInt(height * 0.5);
            } else if (direction === 'up') {
                startX = parseInt(width * 0.5);
                startY = parseInt(height * 0.1);
                endX = parseInt(width * 0.5);
                endY = parseInt(height * 0.9);
            } else if (direction === 'down') {
                startX = parseInt(width * 0.5);
                startY = parseInt(height * 0.9);
                endX = parseInt(width * 0.5);
                endY = parseInt(height * 0.1);
            }
            await browser.touchAction([
                { action: 'press', x: startX, y: startY },
                { action: 'wait', ms: 2000 },
                { action: 'moveTo', x: endX, y: endY },
                'release',
            ]);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to scroll to the ${side}`);
        }
    }

    /**
     * Scrolling to the desired element
     * @param {string} selector Element selector For Ex: ID, xpath, etc.,
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield, etc.,
     */
    async scrollToElement(selector, selectorName) {
        Logger.info(`Scrolling to the ${selectorName}`);
        try {
            let elementVisibilty;
            do {
                elementVisibilty = await $(selector).isDisplayed();
                if (elementVisibilty == false) {
                    await this.scrolling('down');
                }
            } while (elementVisibilty === false);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to scroll to the element ${selectorName}`);
        }
    }

    /**
     * Scrolling the calendar to backward
     * @param {string} calendarName The name of the calendar type. Fox Ex: Year calendar, Monthe Calendar etc.,
     */
    async calendarScroll(calendarName) {
        Logger.info(`Scrolling the calendar to backward`);
        try {
            let bottomElementSelector = `new UiScrollable(new UiSelector().scrollable(true)).scrollBackward()`;
            await $(`android=${bottomElementSelector}`);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to scroll the ${calendarName} calendar`);
        }
    }

    /**
     * Starts an Android activity by providing package name and activity name.
     * @param {string} appPackage Name of app. For Ex: com.android.chrome, com.lixar.allegiant, etc.,
     * @param {string} appActivity Name of activity. For Ex: com.google.android.apps.chrome.Main, com.lixar.allegiant.environment.EnvironmentPickerActivity, etc.,
     * @param {string} appActivityName Name of app page that we are opening. For Ex: Chrome home Page, Allegiant env page, etc.,
     */
    async startActivity(appPackage, appActivity, appActivityName) {
        Logger.info(`Starting an activity of ${appActivityName}`);
        try {
            await driver.startActivity(appPackage, appActivity);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to launch the ${appActivityName}`);
        }
    }

    /**
     * Switch the views from Web and Native app and vice versa
     * @param {string} view Name of view. For Ex: WEBVIEW_chrome, NATIVE_APP
     */
    async switchContext(view) {
        Logger.info(`Switching to ${view}`);
        try {
            await browser.switchContext(view);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to switch to the ${view}`);
        }
    }

    /**
     * Getting all the view information
     * @returns {String} return getContexts
     */
    async getContexts() {
        Logger.info(`Getting the views`);
        let getContexts;
        try {
            getContexts = await driver.getContexts();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Error in getting the views`);
        }
        return getContexts;
    }

    /**
     * Close an app on device
     */
    async closeApp() {
        Logger.info(`Closing the App`);
        try {
            await driver.closeApp();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to close the App`);
        }
    }

    /**
     * Click based on user input text from Web and Native app and vice versa
     * @param {string} value Name of selectorText. For Ex: ClaimMyPoints
     */
    async clickonText(value) {
        Logger.info(`Clicking on Claim My Points Button`);
        try {
            let selectorText = `new UISelector().textContains("${value}")`(
                await $(`android=${selectorText}`),
            ).click();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to click Claim my Points button`);
        }
    }

    /**
     * Scroll to text from Web and Native app and vice versa
     * @param {string} value Name of selectorText. For Ex: ClaimMyPoints
     */
    async scrollToText(value) {
        Logger.info(`Scrolling to Required Section`);
        try {
            let selectorText = `new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${value}")`;
            await $(`android=${selectorText}`);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to scroll the Required element`);
        }
    }
    /**
     * This method hides keyboard
     *   @param {String} strategy  'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'
     */
    async hideKeyboard(strategy) {
        Logger.info(`Hiding the keyboard`);
        try {
            await driver.hideKeyboard(strategy);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to hide Keyboard`);
        }
    }
}
export default new MobileActions();
