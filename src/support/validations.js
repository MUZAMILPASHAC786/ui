import assert from '../common/assert'

/**
 * This is a class which contains the validation methods 
 */
class Check {

    /**
     * Check if the given element has the given class
     * @param  {String} selector Element Selector can be a string or object. For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {String}   expectedClassValue The class value to check. For Ex: "widget-content", "clear", etc.,
     * @param  {string}   selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean}   expectedResult Whether to check for the class to exist or not (true or false). For Ex: "true" if contains classand attribute "false" not contains class attribute.
     * @returns {boolean} returns true/false
     */
    async checkClass(selector, expectedClassValue, selectorName, expectedResult) {
        let obj = selector instanceof Object ? selector : await $(selector);
        let checkClass = await obj.getAttribute('class');
        if (expectedResult) {
            assert(checkClass.includes(expectedClassValue), true, `verifying if ${selectorName} contains class attribute`)
        } else {
            assert(checkClass.includes(expectedClassValue), false, `verifying if ${selectorName} not contains class attribute`)
        }
        return checkClass
    }

    /**
     * Check if the given elements contains any text
     * @param  {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string}    selectorName The name of the selector For Ex: inputfield, checkbox
     * @param  {boolean}  falseCase  Whether to check if the inputfield contains text or not. For Ex: "true" if field contains text and "false" if field contains no text.
     * @returns {boolean} returns true/false
     */
    async checkContainsAnyText(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        let command = 'getValue';

        let selectorValue = await obj.getAttribute('value')

        if (selectorValue === null || selectorValue === '') {
            command = 'getText';
            selectorValue = await await $(selector)[command]();
        }

        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(selectorValue.length > 0, true, `verifying if ${selectorName} contains any text`)
        } else {
            assert(selectorValue.length > 0, false, `verifying if ${selectorName} does not contain any text`)
        }
        return selectorValue

    }

    /**
     * Check if element is empty
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if element is empty or not For Ex: "true" if inputfield is empty and "false" if inputfield is not empty
     * @returns {boolean} returns true/false 
     */
    async checkIsEmpty(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);

        let command = 'getValue';

        let selectorValue = await obj.getAttribute('value')

        if (selectorValue === null || selectorValue === '') {
            command = 'getText';
        }
        const textValue = await obj[command]();
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(textValue.length === 0, true, `verifying if ${selectorName} is empty`)
        } else {
            assert(textValue.length === 0, false, `verifying if ${selectorName} is not empty`)
        }
        return textValue
    }


    /**
     * Check if the given elements contains text
     * @param  {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {String}   expectedText  The text to check against. For Ex: "Musk", "Obama"
     * @param  {boolean}   falseCase     Whether to check if the element contains the given text or not (true/false). For Ex: "true" if contains any text and "false" if contains no text
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield 
     */
    async checkContainsText(selector, expectedText, falseCase, selectorName) {
        let obj = selector instanceof Object ? selector : await $(selector);
        let command = 'getValue';

        let selectorValue = await obj.getAttribute('value')

        if (selectorValue === null || selectorValue === '') {
            command = 'getText';
        }
        const selectorText = await obj[command]();

        assert(selectorText.includes(expectedText), falseCase === true || falseCase === undefined || falseCase === null, `verifying if the ${selectorName} contains any text`)
    }

    /**
     * Check if a cookie with the given name exists
     * @param {string} cookieName The name of the cookie. For Ex: "skin"
     * @param {boolean} falseCase Whether to check if the cookie exists or not. For Ex: "true" if that cookie exits and "false" if it's not
     */
    async checkCookieExists(cookieName, falseCase) {
        const cookie = await browser.getCookies(cookieName);
        assert(cookie.length > 0, falseCase === true || falseCase === undefined || falseCase === null, `verifying if the cookiee ${cookieName} exists`)
    }

    /**
     * Check the content of a cookie against a given value
     * @param  {String}   cookieName    The name of the cookie. For Ex: "skin"
     * @param  {String}   expectedvalue The value to check against. For Ex: "noskin"
     * @param  {boolean}  falseCase     Whether or not to check if the value matches or not. For Ex: "true" if the value matches and "false" if not
     */
    async checkCookieContains(cookieName, expectedvalue, falseCase) {
        const cookie = await browser.getCookies(cookieName);
        assert((cookie[0].value).includes(expectedvalue), falseCase === true || falseCase === undefined || falseCase === null, `verifying if the cookiee ${cookieName} contains value ${expectedvalue}`)
    }

    /**
     * Check if the given element has the focus
     * @param  {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName  The name of the element For Ex: checkbox,inputfield
     * @param  {boolean}  falseCase Whether to check if the given element has focus or not. For Ex: "true" if the element focused and "false" if not
     */
    async checkFocus(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        const hasFocus = await obj.isFocused();
        assert(hasFocus, falseCase === true || falseCase === undefined || falseCase === null, `verifying if the ${selectorName} is focused`)
    }

    /**
     * Check if the given element exists in the DOM one or more times
     * @param  {String}  selector  Element selector For Ex: ID, xpath, etc.,
     * @param {string} selectorName  The name of the element For Ex: checkbox,inputfield
     * @param  {Boolean} falseCase Check if the element (does not) exists. For Ex" "true" if element exits and "false" if not
     */
    async checkIfElementExists(selector, selectorName, falseCase) {
        const nrOfElements = await $$(selector);
        assert(nrOfElements.length > 0, falseCase === true || falseCase === undefined || falseCase === null, `verifying if ${selectorName} exists`)
    }

    /**
     *  Check if the given URL was opened in a new window
     * @param  {String} expectedUrl The URL to check for. For Ex: "https://www.stg.allegiantair.com/"
     */
    async checkIsOpenedInNewWindow(expectedUrl) {
        const windowHandles = await browser.getWindowHandles();
        assert(windowHandles.length !== 1, true, 'A popup was not opened')
        const lastWindowHandle = await windowHandles.slice(-1);
        // Make sure we focus on the last opened window handle
        await browser.switchToWindow(lastWindowHandle[0]);
        const windowUrl = await browser.getUrl();
        assert(windowUrl.includes(expectedUrl), true, 'The popup has a incorrect getUrl')
        await browser.closeWindow();
    }

    /**
     * Check if a modal was opened
     * @param  {String}   modalType  The type of modal that is expected (alertbox, confirmbox or prompt)
     * @param {boolean} falseCase Whether to check if the modal was opened or not.For Ex: "true" if modal opens and "false" if not
     * @returns {boolean} returns true/false
     */
    async checkModal(modalType, falseCase) {
        let checkModal = '';
        try {
            checkModal = await browser.getAlertText();
            if (falseCase === true || falseCase === undefined || falseCase === null) {
                assert(checkModal.length > 0, true, `verify if Modal window ${modalType} is opened`)
            } else {
                assert(checkModal.length > 0, false, `verify if Modal window ${modalType} is not opened`)
            }
        } catch (e) {
            console.info("No Modal is displayed")
        }
        return checkModal
    }

    /**
     * Check the text of a modal
     * @param  {String}   modalinfo    The type of modal that is expected (alertbox, confirmbox or prompt)
     * @param  {String}   expectedText  The text to check against. For Ex: "Enter the name", "Hello user" 
     * @param {boolean}   falseCase Whether to check if the text matches or not. For Ex: "true" if the text matches and "false" if not
     * @returns {boolean} returns true/false
     */
    async checkModalText(modalinfo, expectedText, falseCase) {
        const checkModalText = await browser.getAlertText();
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(checkModalText === expectedText, true, `verifying if the modal text ${modalinfo} is opened`)
        } else {
            assert(checkModalText === expectedText, false, `verifying if the modal text ${modalinfo} is not opened`)
        }

        return checkModalText
    }

    /**
     * Check the text of a modal
     * @param  {String}   modalinfo    The type of modal that is expected (alertbox, confirmbox or prompt)
     * @param {boolean}   falseCase Whether to check if the text matches or not. For Ex: "true" if the text matches and "false" if not
     * @returns {boolean} returns true/false
     */
    async checkModalOpen(modalinfo, falseCase) {
        const isOpened = await browser.isAlertOpen();
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(isOpened, true, `verifying if the ${modalinfo} is opened`)
        } else {
            assert(isOpened, false, `verifying if the ${modalinfo} is not opened`)
        }
        return isOpened
    }

    /**
     * Check if a new window or tab is opened
     * @param {string} windowinfo The type of opened object (window or tab). For Ex: "allegiant", "google.
     * @param {boolean} falseCase Whether to check if a new window/tab was opened or not. For Ex: "true" if the new window opens and "false" if not
     * @returns {boolean} returns true/false
     */
    async checkNewWindow(windowinfo, falseCase) {
        const checkNewWindow = await browser.getWindowHandles();
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(checkNewWindow.length > 1, true, `verifying if the new window ${windowinfo} is open`)
        } else {
            assert(checkNewWindow.length > 1, false, `verifying if the new window ${windowinfo} is not open`)
        }
        return checkNewWindow
    }

    /**
     * Check the offset of the given element
     * @param  {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {String}   expectedPosition  The position to check against. For Ex: "1080", "480"
     * @param  {String}   axis              The axis to check on (x or y). For Ex: "1020", "380"
     * @param {string}    selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean}   falseCase Whether to check if the offset matches or not. For Ex: "true" if the axis are matched and "false" if not
     * @returns {boolean} returns true/false
     */
    async checkOffset(selector, expectedPosition, axis, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        const checkOffset = await obj.getLocation(axis);

        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(checkOffset.toString() === expectedPosition, true, `verifying if the ${selectorName} is matched`)
        } else {
            assert(checkOffset.toString() === expectedPosition, false, `verifying if the ${selectorName} is not matched`)
        }
        return checkOffset
    }

    /**
     * Check the dimensions of the given element
     * @param  {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param  {String}   expectedSize Expected size. For Ex: "370", "130"
     * @param  {String}   dimension    Dimension to check (broad or tall). For Ex: "370", "130"
     * @param {boolean}   falseCase Whether to check if the dimensions match or not (true or false). For Ex: "true" if dimensions match and "false" if not
     */
    async checkDimension(selector, expectedSize, dimension, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        const elementSize = await obj.getSize();
        const intExpectedSize = parseInt(expectedSize, 10);

        let originalSize = elementSize.height;
        let label = 'height';

        if (dimension === 'broad') {
            originalSize = elementSize.width;
            label = 'width';
        }

        if (falseCase) {
            assert(originalSize === intExpectedSize, false, `Element "${selector}" should not have a ${label} of ` + `${intExpectedSize}px`)
        } else {
            assert(originalSize === intExpectedSize, true, `Element "${selector}" should have a ${label} of ` +
                `${intExpectedSize}px, but is ${originalSize}px`)
        }
    }

    /**
     * Check the given property of the given element
     * @param {boolean} isCSS Whether to check for a CSS property or an attribute (false if it's not CSS)
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} attrName The name of the attribute to check. For Ex: "data-version", "id"
     * @param {string} expectedValue The value to match against.For Ex: "1", "hexen"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield 
     * @param {boolean} falseCase Whether to check if the value of the attribute matches or not. For Ex: "true" if attribute value matches and "false" if not
     */
    async checkProperty(isCSS, selector, attrName, expectedValue, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        const command = isCSS ? 'getCSSProperty' : 'getAttribute';
        let attributeValue = await obj[command](attrName);
        expectedValue = Number.isFinite(expectedValue) ? parseFloat(expectedValue) : expectedValue;
        if (attrName.match(/(color|font-weight)/)) {
            attributeValue = attributeValue.value;
        }
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(attributeValue === expectedValue, true, `verify if the Property of selector ${selectorName} is ${expectedValue}`)
        } else {
            assert(attributeValue === expectedValue, false, `verify if the Property of selector ${selectorName} is not ${expectedValue}`)
        }
    }

    /**
     * Check the selected state of the given element
     * @param  {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element. For Ex: "First Name Input field", "T&C checkbox"
     * @param {boolean} falseCase Whether to check if the element is elected or not. For Ex: "true" if checkbox/dropdown value is selected and "false" if not.
     * @returns {boolean} returns true/false
     */
    async checkSelected(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        const checkSelected = await obj.isSelected();
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(checkSelected, true, `verifying if the ${selectorName} is checked`)
        } else {
            assert(checkSelected, false, `verifying if the ${selectorName} is not checked`)
        }
        return checkSelected
    }

    /**
     * Check the title of the current browser window
     * @param {string} expectedTitle The expected title. For Ex: "webdriverIO", "omayo"
     * @param {string} titleInfo Title information. For Ex: "Omayo website", "webdriverIO page"
     * @param {boolean} falseCase Whether to check if the title matches the expected value or not. For Ex: "true" if the title matches and "false" if not
     * @returns {boolean} returns true/false
     */
    async checkTitle(expectedTitle, titleInfo, falseCase) {
        const checkTitle = await browser.getTitle();

        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(checkTitle === expectedTitle, true, `verifying if title ${titleInfo} is matched`)
        } else {
            assert(checkTitle === expectedTitle, false, `verifying if title ${titleInfo} is not matched`)
        }
        return checkTitle
    }

    /**
     * Check the URL of the given browser window
     * @param {string} expectedUrl The expected URL to check against.For Ex: "https://www.google.com/"
     * @param {string} urlname Name of the URL. For Ex: "Google"
     * @param {boolean} falseCase Whether to check if the URL matches the expected value or not.For Ex: "true" if the URL matches and "false" if not
     * @returns {boolean} returns true/false
     */
    async checkURL(expectedUrl, urlname, falseCase) {
        const checkURL = await browser.getUrl();

        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(checkURL === expectedUrl, true, `verifying if url ${urlname} is matched`)
        } else {
            assert(checkURL === expectedUrl, false, `verifying if url ${urlname} is notmatched`)
        }
        return checkURL
    }

    /**
     * Check if the current URL path matches the given path
     * @param {string} expectedPath The expected path to match against.For Ex: "/index.html"
     * @param {string} pathName Path information. For Ex: "Index Page"
     * @param {boolean} falseCase Whether to check if the path matches the expected value or not.For Ex: "true" if path matches with url and "false" if not
     * @returns {boolean} returns true/false
     */
    async checkURLPath(expectedPath, pathName, falseCase) {
        let getUrl = await browser.getUrl();
        let checkURLPath = getUrl.replace(/http(s?):\/\//, '');
        let domain = `${checkURLPath.split('/')[0]}`;

        checkURLPath = checkURLPath.replace(domain, '');
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(checkURLPath === expectedPath, true, `verifying if path name ${pathName} is matched`)
        } else {
            assert(checkURLPath === expectedPath, false, `verifying if path name ${pathName} is not matched`)
        }
        return checkURLPath
    }

    /**
     * Check if the given element is visible inside the current viewport
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if the element is visible within the current viewport or not. For Ex: "true" if elements exits within the viewport and "false" if not
     * @returns {boolean} returns true/false
     */
    async checkWithinViewport(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        const checkWithinViewport = await obj.isDisplayedInViewport();

        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(checkWithinViewport, true, `verifying if ${selectorName} is displayed in view`)
        } else {
            assert(checkWithinViewport, false, `verifying if ${selectorName} is not displayed in view`)
        }

        return checkWithinViewport
    }

    /**
     * Compare the contents of two elements with each other
     * @param {string} selector1 Element selector For Ex: ID, xpath, etc., for the first element
     * @param {string} selector2 Element selector For Ex: ID, xpath, etc., for the second element
     * @param {boolean} falseCase Whether to check if the contents of both elements match or not. For Ex: "true" if texts are matching and "false" if not
     * @returns {boolean} returns true/false
     */
    async compareText(selector1, selector2, falseCase) {
        let text1 = await $(selector1).getText();
        let text2 = await $(selector2).getText();
        let compareText = text1 === text2

        assert(compareText, falseCase === true || falseCase === undefined || falseCase === null, `verifying if text of the provided selectors is equal`)
        return compareText
    }

    /**
     * Check if the given element is clicking or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if the element is clicking or not. For Ex: "true" if element clickable and "false" if not.
     * @returns {boolean} returns true/false
     */
    async isClickable(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        const isClickable = await obj.isClickable();
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(isClickable, true, `verifying if ${selectorName} is clickable`)
        } else {
            assert(isClickable, false, `verifying if ${selectorName} is not clickable`)
        }
        return isClickable
    }

    /**
     * Check if the given element is displayed or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if the element is displayed or not. For Ex: "true" if element displayed and "false" if not.
     * @returns {boolean} returns true/false
     */
    async isDisplayed(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        let isDisplayed = await obj.isDisplayed();
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(isDisplayed, true, `verifying if ${selectorName} is displayed`)
        } else {
            assert(isDisplayed, false, `verifying if ${selectorName} is not displayed`)
        }
        return isDisplayed
    }

    /**
     * Check if the given element is enabled or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if the element is displaying or not. For Ex: "true" if element enabled and "false" if not.
     * @returns {boolean} returns true/false
     */
    async isEnabled(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await $(selector);
        const isEnabled = await obj.isEnabled();

        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(isEnabled, true, `verifying if ${selectorName} is enabled`)
        } else {
            assert(isEnabled, false, `verifying if ${selectorName} is not enabled`)
        }

        return isEnabled
    }

    /**
     * Check if the given element is existing or not
     * @param {String} selector Element Selector can be a string or object For Ex: $('anyValue') or "#anyValue", ".anyValue", "//anyValue"
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if the element is existing or not. For Ex: "true" if element exits and "false" if not.
     */
    async isExisting(selector, selectorName, falseCase) {
        const elements = await $$(selector);
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(elements.length > 0, true, `verifying if ${selectorName} exists`)
        } else {
            assert(elements.length > 0, false, `verifying ${selectorName} does not exist`)
        }
    }
}
export default new Check()