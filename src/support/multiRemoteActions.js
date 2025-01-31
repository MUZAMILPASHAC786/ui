import Logger from '../common/loggers';
import Check from './validations';
import assert from '../common/assert';

/**
 * This is a class which contains action methods pf Web and Mobile for Multi-Remote Purpose.
 */
class MultiRemoteActions {
    /**
     * constructs multi-remote action methods
     * @param {String} instance converts string to object and added to all methods. For Ex: myMobile, myChrome, myFirefox, etc.,
     */
    constructor(instance) {
        this.currentInstance = new Function('return ' + instance)();
    }

    /**
     * Clearing the inputfield on the given element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async clearInputField(selector, selectorName) {
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
            await this.currentInstance.maximizeWindow();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Window is not maximized`);
        }
    }

    /**
     * get the window size
     * @returns {String} browser window size.
     */
    async getWindowSize() {
        Logger.info(`Fetching browser window size`);
        try {
            return await this.currentInstance.getWindowSize();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to fetch window size`);
        }
    }

    /**
     * Launches the App mentioned in capabilities
     */
    async launchApp() {
        Logger.info(`Launching the App`);
        try {
            await this.currentInstance.launchApp();
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to launch App`);
        }
    }

    /**
     * This method is to get the list of window handles for every open top-level browsing context
     * @returns {*} It returns the aplhanumeric value. For Ex: ["CDwindow-2D68A4601C2DDE4F756AC374BB588712"]
     */
    async getWindowHandles() {
        Logger.info(`Getting the info of opened windows`);
        try {
            return await this.currentInstance.getWindowHandles();
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        await this.currentInstance.waitUntil(
            async function () {
                const state = await this.currentInstance.execute(async function () {
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
     * Perform an double click action on the given element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async doubleClick(selector, selectorName) {
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
     * Close all the tabs apart from the first tab
     * @param {string} TabName Tab info on which page we want to be in For Ex: allegiant
     */
    async closeAllButFirstTab(TabName) {
        Logger.info('Closing All tabs apart from first tab');
        try {
            const windowHandles = await this.currentInstance.getWindowHandles();
            await windowHandles.reverse();
            let firstTab = windowHandles[windowHandles.length - 1];
            await windowHandles.forEach(async (handle, index) => {
                await this.currentInstance.switchToWindow(handle);
                if (index < windowHandles.length - 1) {
                    await this.pause(2000);
                    await this.currentInstance.closeWindow();
                }
            });
            let windowHandle = await this.currentInstance.getWindowHandles();
            assert(firstTab, windowHandle[0], 'Wrong window handle');
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Error in closing all tabs apart from ${TabName}`);
        }
    }

    /**
     * Close the last opened window/tab
     * @param {string} TabName Last Tab/window info which needs to be closed For Ex: confirmation Tab, etc.,
     */
    async closeLastOpenedWindow(TabName) {
        Logger.info('Closing Last opened window');
        try {
            const windowHandle = await this.currentInstance.getWindowHandles();
            const lastWindowHandle = await windowHandle.slice(-1)[0];
            await this.currentInstance.closeWindow();
            await this.currentInstance.switchToWindow(lastWindowHandle);
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
            await this.currentInstance.switchWindow(windowName);
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
            await this.currentInstance.newWindow(url);
            await this.focusLastOpenedWindow(urlName);
            await Check.checkURL(url, urlName);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${urlName} is not opened in a new window`);
        }
    }

    /**
     * Deleting the cookies
     * @param {string} name The name of the cookie to delete Fo
     */
    async deleteCookies(name) {
        Logger.info(`Deleting the cookies ${name}`);
        try {
            await this.currentInstance.deleteCookies([name]);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`${name} cookie is not deleted`);
        }
    }

    /**
     * Deleting all the cookies
     * @param {string} Page Name of the Page on which we want to clear all cookies
     */
    async deleteAllCookies(Page) {
        Logger.info(`Deleting all cookies`);
        try {
            await this.currentInstance.deleteAllCookies();
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
        let sel = await this.currentInstance.$(sourceSelector);
        let dest = await this.currentInstance.$(destinationSelector);
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
        const windowHandle = await this.currentInstance.getWindowHandles();
        const lastWindowHandle = await windowHandle.slice(-1)[0];
        try {
            await this.currentInstance.switchToWindow(lastWindowHandle);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to focus on the last opened ${page}`);
        }
    }

    /**
     * Getting the property of particular element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} value Vlaue of the particular element For Ex: attribute name like name,value,etc.,
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     * @returns {String} returns propertyValue
     */
    async getProperty(selector, value, selectorName) {
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
     * Getting the text of particular element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     * @returns {String} returns text
     */
    async getText(selector, selectorName) {
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
     * Getting the value of particular element
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     * @returns {String} returns value of particular element
     */
    async getValue(selector, selectorName) {
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
     * Getting the value of a a particular attribute
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} attributeName Name of the attribute For Ex: name, class,etc.,
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     * @returns {String} returns value of particular attribute
     */
    async getAttribute(selector, attributeName, selectorName) {
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
     * Handle a  modal/accept alertbox
     * @param {string} action Action to perform on the modal Either accept or dismiss
     * @param {string} modalType Type of modal (alertbox, confirmbox, prompt)
     */
    async handleModal(action, modalType) {
        Logger.info(`Handling the ${modalType}`);
        let command = `${action.slice(0, 1).toLowerCase()}${action.slice(1)}Alert`;
        if (modalType === 'alertbox') {
            command = 'acceptAlert';
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
     * Opening the URL
     * @param {string} page The URL to navigate For Ex: www.google.com
     */
    async openWebsite(page) {
        Logger.info(`Opening the URL ${page}`);
        let url = page;
        try {
            await this.currentInstance.url(url);
            await this.currentInstance.maximizeWindow();
            let urlSlice = !url.endsWith('/') ? url.concat('/') : url;
            assert(await this.currentInstance.getUrl(), urlSlice, `Verify the ${url}`);
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
            await this.currentInstance.keys(key);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
     * @param  {String}   selectionType  Type of method to select by (name, value or text)
     * @param  {String}   selectionValue Value to select by
     */
    async selectOption(selector, selectionType, selectionValue) {
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
     * @param  {string} selectorName The name of the selector For Ex: inputfield, checkbox
     */
    async selectOptionByIndex(selector, index, selectorName) {
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
            await this.currentInstance.setCookies({
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
            await this.currentInstance.sendAlertText(modalText);
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
            await this.currentInstance.setWindowSize(
                parseInt(screenWidth, 10),
                parseInt(screenHeight, 10),
            );
            const newwindowSize = await this.currentInstance.getWindowSize();
            let width = JSON.stringify(newwindowSize).split(',')[0].split(':')[1];
            let height = JSON.stringify(newwindowSize).split(',')[1].split(':')[1].slice(0, -1);
            assert(width, (parseInt(screenWidth) + 2).toString(), 'Wrong Window width');
            assert(height, (parseInt(screenHeight) + 2).toString(), 'Wrong Window height');
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
        Logger.info(`Switching into the ${selectorName} frame`);
        let iframe = await obj;
        try {
            await this.currentInstance.switchToFrame(iframe);
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
            await this.currentInstance.switchToParentFrame();
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            args[0] instanceof Object
                ? await this.currentInstance.args[0]
                : await this.currentInstance.$(args[0]);
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
     */
    async waitUntil(selector, selectorName, ms) {
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
        Logger.info(`Waiting on ${selectorName} until it's is displayed`);
        let intMs = parseInt(ms, 10) || 120000;
        try {
            await this.currentInstance.waitUntil(
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
        let obj =
            selector instanceof Object
                ? await this.currentInstance.selector
                : await this.currentInstance.$(selector);
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
            await this.currentInstance.getTitle();
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
            await this.currentInstance.refresh();
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
            await this.currentInstance.pause(intMs);
        } catch (error) {
            Logger.warn(error.message);
            Logger.warn(`Issue with the browser object`);
            return false;
        }
    }

    /**
     * Scrolls to the specific element only downwards and the co-ordinates may vary.
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     */
    async scrollToElement(selector) {
        var { width, height } = await this.currentInstance.getWindowSize();
        let elementVisibilty;
        let startX;
        let startY;
        let endX;
        let endY;
        do {
            elementVisibilty = await this.currentInstance.$(selector).isDisplayed();
            if (elementVisibilty === false) {
                startX = parseInt(width * 0.5);
                startY = parseInt(height * 0.5);
                endX = parseInt(width * 0.5);
                endY = parseInt(height * 0.1);
                await this.currentInstance.touchAction([
                    { action: 'press', x: startX, y: startY },
                    { action: 'wait', ms: 2000 },
                    { action: 'moveTo', x: endX, y: endY },
                    'release',
                ]);
            }
        } while (elementVisibilty === false);
    }

    /**
     * Scrolls to the specific element only downwards and the co-ordinates may vary.
     * @param {String} direction Up or Down
     */
    async scrolling(direction) {
        let side = direction.toLowerCase();
        var { width, height } = await this.getWindowSize();
        let startX;
        let startY;
        let endX;
        let endY;

        if (side === 'down') {
            startX = parseInt(width * 0.5);
            startY = parseInt(height * 0.9);
            endX = parseInt(width * 0.5);
            endY = parseInt(height * 0.5);
        }
        if (side === 'up') {
            startX = parseInt(width * 0.5);
            startY = parseInt(height * 0.4);
            endX = parseInt(width * 0.5);
            endY = parseInt(height * 0.9);
        }
        await this.currentInstance.touchAction([
            { action: 'press', x: startX, y: startY },
            { action: 'wait', ms: 2000 },
            { action: 'moveTo', x: endX, y: endY },
            'release',
        ]);
    }
    /**
     * This method hides keyboard
     *  @param {String} strategy  'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'
     */
    async hideKeyboard(strategy) {
        Logger.info(`Hiding the keyboard`);
        try {
            await this.currentInstance.hideKeyboard(strategy);
        } catch (error) {
            Logger.warn(error.message);
            Logger.error(`Unable to hide Keyboard`);
        }
    }
}
export default MultiRemoteActions;
