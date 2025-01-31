import Logger from '../common/loggers';
import Check from './validations';
import assert from '../common/assert';
import Utils from './utils';

/**
 * This is a class which contains the action methods
 */
class Actions {
    /**
     * Clearing the inputfield on the given element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async clearInputField(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Clearing the ${selectorName}`);
        try {
            await obj.waitForDisplayed({ timeout: 10000 });
            await obj.clearValue();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${selectorName} is not cleared`);
        }
    }

    /**
     * Maximize the window to the screen size
     */
    async maximizeWindow() {
        Logger.info(`Maximizing the window`);
        try {
            await browser.maximizeWindow();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Window is not maximized`);
        }
    }

    /**
     * This method is to get the list of window handles for every open top-level browsing context
     * @returns {String} It returns the aplhanumeric value. For Ex: ["CDwindow-2D68A4601C2DDE4F756AC374BB588712"]
     */
    async getWindowHandles() {
        Logger.info(`Getting the info of opened windows`);
        try {
            return await browser.getWindowHandles();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Window is not maximized`);
        }
    }

    /**
     * This method is to perform an click/doubleClick action on the given element
     * @param {string} action The action to perform i.e., click/doubleClick
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async clickElement(action, selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        let activity = action.toLowerCase();
        Logger.info(`Clicking on the ${selectorName}`);
        let method = activity === 'click' ? 'click' : 'doubleClick';
        try {
            await obj.waitForDisplayed({ timeout: 10000 });
            await obj[method]();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${selectorName} is not clickable`);
        }
    }

    /**
     * This method is to perform an single click on the given element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async click(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Clicking on the ${selectorName}`);
        try {
            await obj.waitForDisplayed({ timeout: 10000 });
            await obj.click();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${selectorName} is not clickable`);
        }
    }

    /**
     * This method is to Wait until the page loads
     * @param {string} page Page/url info on which we want to wait. For Ex: "Allegiant", "amazon"
     */
    async waitUntilPageLoad(page) {
        console.time(`waiting for Page Load`);
        await browser.waitUntil(
            async function () {
                const state = await browser.execute(async function () {
                    return document.readyState;
                });
                return state === 'complete';
            },
            {
                timeout: 240000, //60secs
                timeoutMsg: 'Oops! Check your internet connection',
            },
        );
        console.timeEnd(`waiting for ${page} till it's load`);
    }

    /**
     * This method is to perform an double click action on the given element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async doubleClick(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Double Clicking on the ${selectorName}`);
        try {
            await obj.waitForDisplayed({ timeout: 10000 });
            await obj.doubleClick();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${selectorName} is not clickable`);
        }
    }

    /**
     * This method is to close all the tabs apart from the first tab
     * @param {string} TabName Tab info on which page we want to be in For Ex: allegiant
     */
    async closeAllButFirstTab(TabName) {
        Logger.info('Closing All tabs apart from first tab');
        try {
            const windowHandles = await browser.getWindowHandles();
            await windowHandles.reverse();
            let firstTab = windowHandles[windowHandles.length - 1];
            await windowHandles.forEach(async (handle, index) => {
                await browser.switchToWindow(handle);
                if (index < windowHandles.length - 1) {
                    await browser.closeWindow();
                }
            });
            let windowHandle = await browser.getWindowHandles();
            assert(firstTab, windowHandle[0], 'Wrong window handle');
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Error in closing all tabs apart from ${TabName}`);
        }
    }

    /**
     * This method is to close the last opened window/tab
     * @param {string} TabName Last Tab/window info which needs to be closed For Ex: confirmation Tab, etc.,
     */
    async closeLastOpenedWindow(TabName) {
        Logger.info('Closing Last opened window');
        try {
            const windowHandle = await browser.getWindowHandles();
            const lastWindowHandle = await windowHandle.slice(-1)[0];
            await browser.closeWindow();
            await browser.switchToWindow(lastWindowHandle);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Error in closing the ${TabName}`);
        }
    }

    /**
     * Switch focus to a particular tab / window
     * @param {string} windowName Name of the Window(i.e., URL, Title, valid Regex) Ex: https://www.google.com/ or Google
     */
    async switchWindow(windowName) {
        Logger.info(`Switching to a new winodw/tab ${windowName}`);
        try {
            await browser.switchWindow(windowName);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${windowName} is not switched in a new window/tab`);
        }
    }

    /**
     * Open a new window in browser
     * @param {string} url web url to open For Ex: https://stg.allegiantair.com/
     * @param {string} urlName Name of the Window(i.e., URL or Title) Ex: https://www.google.com/ or Google
     */
    async newWindow(url, urlName) {
        Logger.info(`Opening a new window in browser ${url}`);
        try {
            await browser.newWindow(url);
            await this.focusLastOpenedWindow(urlName);
            await Check.checkURL(url, urlName);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${urlName} is not opened in a new window`);
        }
    }

    /**
     * This method is to delete the cookies
     * @param {string} name The name of the cookie to delete Fo
     */
    async deleteCookies(name) {
        Logger.info(`Deleting the cookies ${name}`);
        try {
            await browser.deleteCookies([name]);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${name} cookie is not deleted`);
        }
    }

    /**
     * Fetches the text of alert box
     * @param {string} alertboxName Name of the alert box. For Ex: signin alertbox, confirmation alertbox etc.,
     */
    async getAlertText(alertboxName) {
        Logger.info(`Fetching the text of ${alertboxName} Alert box`);
        try {
            await browser.getAlertText();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to fetch the ${alertboxName} alert box text`);
        }
    }

    /**
     * Accepts the alert box
     * @param {string} alertboxName Name of the alert box. For Ex: signin alertbox, confirmation alertbox etc.,
     */
    async acceptAlert(alertboxName) {
        Logger.info(`Accepting the ${alertboxName} alert box`);
        try {
            await browser.acceptAlert();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${alertboxName} alert box is not displayed`);
        }
    }

    /**
     * Dismiss the alert box
     * @param {string} alertboxName Name of the alert box. For Ex: signin alertbox, confirmation alertbox etc.,
     */
    async dismissAlert(alertboxName) {
        Logger.info(`Dismissing the ${alertboxName} alert box`);
        try {
            await browser.dismissAlert();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${alertboxName} alert box is not displayed`);
        }
    }

    /**
     * This method is to delete All the cookies
     * @param {string} Page Name of the Page on which we want to clear all cookies
     */
    async deleteAllCookies(Page) {
        Logger.info(`Deleting all cookies`);
        try {
            await browser.deleteAllCookies();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`All cookies are not deleted on ${Page}`);
        }
    }

    /**
     * Drag a element to a given destination
     * @param {string} sourceSelector  The selector for the source element For Ex: ID,xpath,etc.,
     * @param {string} destinationSelector The selector for the destination element For Ex: ID,xpath,etc.,
     * @param {string} sourceSelectorName The name for the source element Fox Ex: Dragbox,Dragfield
     * @param {string} destinationSelectorName The name for the source element Fox Ex: Dragbox,Dropfield
     */
    async dragElement(
        sourceSelector,
        destinationSelector,
        sourceSelectorName,
        destinationSelectorName,
    ) {
        Logger.info(`Dragging the ${sourceSelectorName} to ${destinationSelectorName}`);
        let sel = await $(sourceSelector);
        let dest = await $(destinationSelector);
        try {
            await sel.dragAndDrop(dest);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to drag element ${sourceSelectorName}`);
        }
    }

    /**
     * Focusing on the last open windowg
     * @param {string} page Name of the last opened page that we want to be in For Ex: Confirmation Page
     */
    async focusLastOpenedWindow(page) {
        Logger.info('Focusing on the last opened window');
        const windowHandle = await browser.getWindowHandles();
        const lastWindowHandle = await windowHandle.slice(-1)[0];
        try {
            await browser.switchToWindow(lastWindowHandle);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to focus on the last opened ${page}`);
        }
    }

    /**
     * This method is to get the property of particular element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} value Vlaue of the particular element For Ex: attribute name like name,value,etc.,
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     * @returns {String} returns the property of particular element
     */
    async getProperty(selector, value, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Getting the property of ${selectorName}`);
        let propertyValue = '';
        try {
            propertyValue = await obj.getProperty(value);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to get property of ${selectorName}`);
        }
        return propertyValue;
    }

    /**
     * This method is to get the text of particular element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     * @returns {String} returns the value of particular element
     */
    async getText(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Getting the value of ${selectorName}`);
        let getText;
        try {
            getText = await obj.getText();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to get text of ${selectorName}`);
        }
        return getText;
    }

    /**
     * This method is to get the value of particular element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     * @returns {String} returns the value of particular element
     */
    async getValue(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Getting the value of ${selectorName}`);
        let getValue;
        try {
            getValue = await obj.getValue();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to get text of ${selectorName}`);
        }
        return getValue;
    }

    /**
     * This method is to get the value of a a particular attribute
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} attributeName Name of the attribute For Ex: name, class,etc.,
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     * @returns {String} returns the attribute of particular element
     */
    async getAttribute(selector, attributeName, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Getting the value of ${selectorName}`);
        let getAttribute;
        try {
            getAttribute = await obj.getAttribute(attributeName);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to get attribute of ${selectorName}`);
        }
        return getAttribute;
    }

    /**
     * This method is to Handle a  modal/accept alert box
     * @param {string} action Action to perform on the modal Either accept or dismiss
     * @param {string} modalType Type of modal (alertbox, confirmbox, prompt)
     */
    async handleModal(action, modalType) {
        Logger.info(`Handling the ${modalType}`);
        let command = `${action.slice(0, 1).toLowerCase()}${action.slice(1)}Alert`;
        if (modalType === 'alertbox' && action.toLowerCase().includes('ac')) {
            command = 'acceptAlert';
        } else if (modalType === 'alertbox' && action.toLowerCase().includes('dis')) {
            command = 'dismissAlert';
        }
        try {
            await browser[command]();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to handle modal ${modalType}`);
        }
    }

    /**
     * Move to the given selector with an optional offset on a X and Y position
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} x X coordinate to move to
     * @param {string} y Y coordinate to move to
     * @param {string} selectorName The name of element For Ex: Checkbox, inputfield
     */
    async moveTo(selector, x, y, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Moving the ${selectorName} to ${x} and ${y}`);
        const intX = parseInt(x, 10) || undefined;
        const intY = parseInt(y, 10) || undefined;
        try {
            await obj.moveTo(intX, intY);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to moveTo ${selectorName}`);
        }
    }

    /**
     * This method is to Open the URL
     * @param {string} page The URL to navigate For Ex: www.google.com
     */
    async openWebsite(page) {
        Logger.info(`Opening the URL ${page}`);
        let url = page;
        try {
            await browser.url(url);
            await browser.maximizeWindow();
            let browserUrl = await browser.getUrl();
            if (browserUrl.includes(url)) {
                console.log('Url is matching');
            } else {
                console.warn('Url is not matching');
            }
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to open website ${page}`);
        }
    }

    /**
     * Perform a key press
     * @param {string} key The key to press For Ex: Enter, Tab, etc.,
     */
    async pressButton(key) {
        Logger.info(`Pressing the ${key} keyword`);
        try {
            await browser.keys(key);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to press button: ${key}`);
        }
    }

    /**
     * Scroll the page to the given element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {string} selectorName The name of the selector For Ex: inputfield, checkbox
     */
    async scroll(selector, selectorName) {
        Logger.info(`Scrolling to the element ${selectorName}`);
        let obj = selector instanceof Object ? selector : await $(selector);
        try {
            await obj.scrollIntoView({ block: 'center', inline: 'center' });
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to scroll to the element ${selectorName}`);
        }
    }

    /**
     * Select an option of a select element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {String} selectionType  Type of method to select by (name, value or text)
     * @param  {String} selectionValue Value to select by
     */
    async selectOption(selector, selectionType, selectionValue) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Selecting the ${selectionValue} from the dropdown`);
        let command = '';
        const commandArguments = [selectionValue];
        switch (selectionType) {
            case 'name': {
                command = 'selectByAttribute';

                // The selectByAttribute command expects the attribute name as it
                // second argument so let's add it
                commandArguments.unshift('name');
                break;
            }
            case 'value': {
                // The selectByAttribute command expects the attribute name as it
                // second argument so let's add it
                commandArguments.unshift('value');
                command = 'selectByAttribute';
                break;
            }
            case 'text': {
                command = 'selectByVisibleText';
                break;
            }
            default: {
                throw new Error(`Unknown selection type "${selectionType}"`);
            }
        }
        try {
            await this.waitForDisplayed(selector, selectionValue, 20000);
            await obj[command](...commandArguments);
            await this.isSelected(selector, selectionValue);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to select the option: ${selectionValue}`);
        }
    }

    /**
     * Select a option from a select element by it's index
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} index The index of the option
     * @param {string} selectorName The name of the selector For Ex: inputfield, checkbox
     */
    async selectOptionByIndex(selector, index, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Selecting the value with the help of ${index}`);
        const optionIndex = parseInt(index, 10);
        try {
            await this.waitForDisplayed(selector, 'dropdown', 20000);
            await obj.selectByIndex(optionIndex);
            await this.isSelected(selector, 'dropdown');
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to select option by index on ${selectorName}`);
        }
    }

    /**
     * Set a given cookie to a given value. When the cookies does not exist it will be created
     * @param  {String}   cookieName    The name of the cookie For Ex: skin
     * @param  {String}   cookieContent The value of the cookie For Ex: noskin
     */
    async setCookie(cookieName, cookieContent) {
        Logger.info(`Setting the ${cookieName} and ${cookieContent}`);
        try {
            await browser.setCookies({
                name: cookieName,
                value: cookieContent,
            });
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to setCookie ${cookieName}`);
        }
    }

    /**
     * Set the value of the given input field to a new value
     * @param  {String}   method  The method to use, Either addvalue or setValue
     * @param  {String}   value   The value to set the selector to For Ex:Name, Origin, Destination, etc.,
     * @param  {String}  selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {string} selectorName The name of the selector For Ex: inputfield, checkbox
     */
    async setInputField(method, value, selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Setting the ${value} to ${selectorName}`);
        const command = method === 'add' ? 'addValue' : 'setValue';
        try {
            await obj.waitForDisplayed({ timeout: 10000 });
            await obj[command](value);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to set the value to ${selectorName}`);
        }
    }

    /**
     * Setting a value to the Input Field
     * @param  {String}   value   The value to set the selector to For Ex:Name, Origin, Destination, etc.,
     * @param  {String}  selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {string} selectorName The name of the selector For Ex: inputfield, checkbox
     */
    async setValue(value, selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Setting the ${value} to ${selectorName}`);
        try {
            await obj.setValue(value);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to setValue for ${selectorName}`);
        }
    }

    /**
     * Adding a value to the existing value
     * @param  {String}   value   The value to set the selector to For Ex:Name, Origin, Destination, etc.,
     * @param  {String}  selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {string} selectorName The name of the selector For Ex: inputfield, checkbox
     */
    async addValue(value, selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Adding the ${value} to ${selectorName}`);
        try {
            await obj.addValue(value);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to addValue for ${selectorName}`);
        }
    }

    /**
     * Set the text of the current prompt
     * @param  {String}   modalText The text to set to the prompt For Ex:Name, etc.,
     * @param  {String}   modalName The name of the modal For Ex: Name Field prompt, Password Field prompt, etc.,
     */
    async setPromptText(modalText, modalName) {
        Logger.info(`Setting the ${modalText} to the modal`);
        try {
            await browser.sendAlertText(modalText);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`A ${modalName} prompt was not open when it should have been open`);
        }
    }

    /**
     * Resize the browser window
     * @param  {String}   screenWidth  The width of the window to resize to For Ex: 1024
     * @param  {String}   screenHeight The height of the window to resize to For Ex: 768
     */
    async setWindowSize(screenWidth, screenHeight) {
        Logger.info(`Setting the window size to ${screenWidth} and ${screenHeight}`);
        try {
            await browser.setWindowSize(parseInt(screenWidth, 10), parseInt(screenHeight, 10));
            const newwindowSize = await browser.getWindowSize();
            let width = JSON.stringify(newwindowSize).split(',')[0].split(':')[1];
            let height = JSON.stringify(newwindowSize).split(',')[1].split(':')[1].slice(0, -1);
            assert(width === screenWidth, true, 'Verifying Window width');
            assert(height === screenHeight, true, 'Verifying Window height');
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`Unable to set window size to ${screenWidth} and ${screenHeight}`);
        }
    }

    /**
     * Switching into the frame
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the selectors For Ex: inputfield, checkbox, etc.,
     */
    async switchToFrame(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Switching into the ${selectorName} frame`);
        let iframe = await obj;
        try {
            await browser.switchToFrame(iframe);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to switch to frame ${selectorName}`);
        }
    }

    /**
     * Switch back to the Parent Frame
     * @param {string} selectorName The name of the selectors For Ex: inputfield, checkbox, etc.,
     */
    async switchToParentFrame(selectorName) {
        Logger.info('Switching to the parent frame');
        try {
            await browser.switchToParentFrame();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to switch to ${selectorName} parent frame`);
        }
    }

    /**
     * Wait for the given element to be enabled, displayed, or to exist
     * @param  {String}  selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {String}   ms Wait duration (optional) For Ex: 2000,3000
     * @param  {String}   falseState if true it waits for the opposite (default: false) For Ex: ""(Don't pass anything inside "") for false and any String value like "Allegiant", "random" for true
     * @param  {String}   state State to check for whether wait till displayed, enabled, clickable.
     * For Ex: be enabled/enabled, be clickable/clickable, be displayed/displayed, exist, stable
     * @param  {string}   selectorName The name of the element For Ex: checkbox, dropdown
     * @returns {boolean} returns true/false
     */
    async waitFor(selector, ms, falseState, state, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`wait till ${state} on ${selectorName} for ${ms} ms`);
        let intMs = parseInt(ms) || 15000;
        let command = 'waitForExist';
        let boolFalseState = !!falseState;
        let parsedState = '';

        if (falseState || state) {
            parsedState =
                state.indexOf(' ') > -1 ? state.split(/\s/)[state.split(/\s/).length - 1] : state;

            if (parsedState) {
                command = `waitFor${parsedState[0].toUpperCase()}` + `${parsedState.slice(1)}`;
            }
        }

        if (typeof falseState === 'undefined') {
            boolFalseState = false;
        }

        let params = { timeout: intMs, reverse: boolFalseState };

        try {
            await obj[command](params);
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not ${parsedState}`);
            return false;
        }
    }

    /**
     * Wait for an element for the provided amount of milliseconds to be present within the DOM
     * @param  {String}  selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {string} selectorName The name of the element For Ex: checkbox, inputfield
     * @param  {String}   ms Wait duration (optional) For Ex: 2000,3000
     * @returns {boolean} returns true/false
     */
    async waitForExist(selector, selectorName, ms) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Waiting on ${selectorName} till it's exist`);
        let intMs = parseInt(ms, 10) || 120000;
        let time = { timeout: intMs };
        try {
            await obj.waitForExist(time);
        } catch (error) {
            Logger.warn(`${selectorName} is not present within the DOM`);
            return false;
        }
    }

    /**
     * Wait for the  element to be clicked
     * @param  {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {string} selectorName The name of the element For Ex: checkbox, inputfield
     * @param  {String}   ms Wait duration (optional) For Ex: 2000,3000
     * @returns {boolean} returns true/false
     */
    async waitForClickable(selector, selectorName, ms) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Waiting on ${selectorName} till it's clickable`);
        let intMs = parseInt(ms, 10) || 120000;
        let time = { timeout: intMs };
        try {
            await obj.waitForClickable(time);
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not clickable`);
            return false;
        }
    }

    /**
     * Wait on the given element till it's displayed based on user specified time
     * @param  {String}  selector  Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox, inputfield
     * @param  {String}   ms Wait duration (optional) For Ex: 2000,3000
     * @returns {boolean} returns true/false
     */
    async waitForDisplayed(selector, selectorName, ms) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Waiting on ${selectorName} till it's displayed`);
        let intMs = parseInt(ms, 10) || 120000;
        let time = { timeout: intMs };
        try {
            await obj.waitForDisplayed(time);
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not displayed`);
            return false;
        }
    }

    /**
     * Wait on the given element till it's displayed based on user specified time method3
     * @param  {...any} args Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @returns {boolean} returns true/false
     */
    async waitForDisplayed(...args) {
        let obj = args[0] instanceof Object ? args[0] : await $(args[0]);
        try {
            if (args.length === 2) {
                Logger.info(`Waiting on ${args[1]} till it's displayed`);
                await obj.waitForDisplayed();
            } else {
                Logger.info(`Waiting on ${args[1]} for ${args[2]}`);
                let intMs = parseInt(args[2], 10);
                let time = { timeout: intMs };
                await obj.waitForDisplayed(time);
            }
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${args[1]} is not displayed`);
            return false;
        }
    }

    /**
     * Wait for the given element to become visible
     * @param  {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Then name of the element For Ex: checkbox, inputfield
     * @param  {String}   ms Wait duration (optional) For Ex: 2000,3000
     * @returns {boolean} returns true/false
     */
    async waitUntil(selector, selectorName, ms) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Waiting on ${selectorName} until it's is displayed`);
        let intMs = parseInt(ms, 10) || 120000;
        try {
            await browser.waitUntil(
                async () => {
                    return await obj.isDisplayed();
                },
                { timeout: intMs },
            );
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${selectorName} is not displayed`);
        }
    }

    /**
     * Wait on the given element either till it's enabled or till the given time finish off
     * @param  {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Then name of the element For Ex: checkbox, inputfield
     * @param  {String}   ms Wait duration (optional) For Ex: 2000,3000
     * @returns {boolean} returns true/false
     */
    async waitForEnabled(selector, selectorName, ms) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Waiting on ${selectorName} till it's enabled`);
        let intMs = parseInt(ms, 10) || 120000;
        let time = { timeout: intMs };
        try {
            return await obj.waitForEnabled(time);
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not enabled`);
            return false;
        }
    }

    /**
     * Check whether the given element is clicking or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @returns {boolean} returns true/false
     */
    async isClickable(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Checking whether the ${selectorName} is clickable or not`);
        try {
            return await obj.isClickable();
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not clickable`);
            return false;
        }
    }

    /**
     * Check whether the given element is displayed or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @returns {boolean} returns true/false
     */
    async isDisplayed(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Checking whether the ${selectorName} is displayed or not`);
        try {
            return await obj.isDisplayed();
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not displayed`);
            return false;
        }
    }

    /**
     * Check whether the given element is enabled or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @returns {boolean} returns true/false
     */
    async isEnabled(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Checking whether the ${selectorName} is enabled or not`);
        try {
            return await obj.isEnabled();
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not enabled`);
            return false;
        }
    }

    /**
     * Check whether the given element is existing or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @returns {boolean} returns true/false
     */
    async isExisting(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Checking whether the ${selectorName} is existing within the viewport or not`);
        try {
            return await obj.isExisting();
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not existing`);
            return false;
        }
    }

    /**
     * Check whether the given element is selected or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @returns {boolean} returns true/false
     */
    async isSelected(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Checking whether the ${selectorName} is selected or not`);
        try {
            return await obj.isSelected();
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not selected`);
            return false;
        }
    }

    /**
     * Check whether the given element is Displaying within the port or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @returns {boolean} returns true/false
     */
    async isDisplayedViewport(selector, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        Logger.info(`Checking whether the ${selectorName} is existing within the viewport or not`);
        try {
            return await obj.isDisplayedInViewport();
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`${selectorName} is not displayed in viewport`);
            return false;
        }
    }

    /**
     * Get the title of current opened website/Page
     * @returns {boolean} returns true/false
     */
    async getTitle() {
        Logger.info(`Fetching the Tiltle`);
        try {
            await browser.getTitle();
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`Unable to get title of current opened website/page`);
            return false;
        }
    }

    /**
     * It reloads the browser page/tab
     * @param {String} pageName Name of the Page/Tab
     */
    async refresh(pageName) {
        Logger.info(`Refreshing the ${pageName} tab`);
        try {
            await browser.refresh();
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`Unable to refresh the page ${pageName}`);
        }
    }

    /**
     * Pauses execution for a specific amount of time
     * @param {String} ms Wait duration (optional) For Ex: 2000,3000
     */
    async pause(ms) {
        let intMs = parseInt(ms) || 5000;
        Logger.info(`Pause the execution for ${ms}`);
        try {
            await browser.pause(intMs);
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`Issue with the browser object`);
            return false;
        }
    }

    /**
     * Resize the browser window
     * @param  {String}   XAxis Horizontal Size of the window  For Ex: 0
     * @param  {String}   YAxis Vertical Size of the window For Ex: 800
     */
    async scrollbyCoordinate(XAxis, YAxis) {
        await browser.execute(
            (XAxis, YAxis) => {
                window.scrollTo(XAxis, YAxis);
            },
            XAxis,
            YAxis,
        );
    }

    /**
     * Zoom In/OUT for the web based execution
     * @param {int} percentage Zoom In/OUT For Ex: 85,60
     */
    async zoomInOutByPercentage(percentage) {
        const client = await browser.getWindowHandle();

        // Zoom in
        if (percentage > 100) {
            const zoomFactor = percentage / 100;
            await browser.execute((zoomFactor) => {
                document.body.style.transform = `scale(${zoomFactor})`;
            }, zoomFactor);
            Logger.info('Zoomed in by ' + zoomFactor + '%');
        }
        // Zoom out
        else if (percentage < 100) {
            const zoomFactor = percentage / 100;
            await browser.execute((zoomFactor) => {
                document.body.style.transform = `scale(${zoomFactor})`;
            }, zoomFactor);
            Logger.info('Zoomed out by ' + zoomFactor + '%');
        }
        // Reset to default zoom (100%)
        else {
            await browser.execute(() => {
                document.body.style.zoom = 1;
            });
        }
    }

    /**
     * Get the size/length of the elements/selectors
     *  @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @returns {int} returns length of the elements
     */
    async getElementSize(selector) {
        Logger.info(`Getting the length of the selector`);
        const elements = await $$(selector);
        try {
            return elements.length;
        } catch (er) {
            Logger.error(`Unable to get the length of selector`);
        }
    }

    /**
     * Fetch and return the dataLayers from the browser and filter by event name or manifest ID
     * @returns {string} returns dataLayer
     */
    async fetctDataLayer() {
        // Wait for the page to load completely
        await browser.waitUntil(async () => {
            const state = await browser.execute(() => document.readyState);
            return state === 'complete';
        });

        // Execute JavaScript to get window.dataLayer
        const dataLayer = await browser.execute(() => window.dataLayer);
        return dataLayer;
    }

    /**
     * Check if the given element is existing or not
     * @param {array} dataLayer dataLayer should be array format. Either you call fetchDataLayer() or store that fn and pass that value
     * @param {string} eventInfo The eventInfo can be an object or string.For Ex: {'key':'value','key':'value'} or "anyValue". By default string will search on event
     * @returns {string} returns array of values
     */
    async getEventsDetails(dataLayer, eventInfo) {
        let eventsFromDataLayer = [];
        let obj = eventInfo instanceof Object;
        if (obj) {
            console.log('Looking for a results via object');
            eventsFromDataLayer = Utils.filterJsonArray(dataLayer, eventInfo);
        } else {
            console.log('Looking for a results via String');
            for (let i = 0; i < dataLayer.length; i++) {
                if (dataLayer[i].event === eventInfo) {
                    eventsFromDataLayer.push(dataLayer[i]);
                }
            }
        }
        return eventsFromDataLayer;
    }
    /**
     * This method is to close all the tabs apart from the current tab
     * @param {string} TabName Tab info on which page we want to be in For Ex: allegiant
     */
    async closeAllButCurrentTab(TabName) {
        Logger.info('Closing All tabs apart from current tab');
        try {
            let flag;
            const windowHandles = await browser.getWindowHandles();
            await windowHandles.reverse();
            let currentTab = await browser.getWindowHandle();
            for (let i = 0; i < windowHandles.length; i++) {
                await browser.switchToWindow(windowHandles[i]);
                if (windowHandles[i] !== currentTab) {
                    await browser.closeWindow();
                } else {
                    flag = i;
                }
            }
            if (currentTab === windowHandles[flag]) {
                console.error('Correct Window Handle');
            } else {
                console.error('Wrong window Handle');
            }
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Error in closing all tabs apart from ${TabName}`);
        }
    }
    /**
     * This method is to switch to the new window/tab using Handles
     * @param {String} handle provide the winodwID. To fetch windowID use getWinodwHandles method. For Ex: ["CDwindow-2D68A4601C2DDE4F756AC374BB588712"]
     */
    async switchToNewWindowHandle(handle) {
        Logger.info(`Getting the info of opened windows`);
        try {
            await browser.switchToWindow(handle);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Window is not maximized`);
        }
    }
}
export default new Actions();
