import { assert } from "chai";
/**
 * This is a class which contains the generator methods
 */
class Generator {

    /**
     * This method will generate random alphabet char's with camel case
     * @param {value} length Enter the length For Ex: 1 or 5 or 10
     * @returns {String} returns string of characters with camel case
     */
    async randomStringCamel(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * This method will generate random alphabet char's with Upper Case
     * @param {value} length Enter the length For Ex: 1 or 5 or 10
     * @returns {String} returns string of characters in uppercase
     */
    async randomStringUpper(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * This method will generate random alphabet char's with Lower Case
     * @param {value} length Enter the length For Ex: 1 or 5 or 10
     * @returns {String} returns string of characters in lowercase
     */
    async randomNumbersLower(length) {
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * This method will generate random Alpha Numeric char's
     * @param {value} length  Enter the length For Ex: 1 or 5 or 10
     * @returns {String} returns string of alphneumeric characters
     */
    async randomAlphaNumeric(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * This method will generate random Numeric char's
     * @param {value} length  Enter the length For Ex: 1 or 5 or 10
     * @returns {String} returns string of alphneumeric characters
     */
    async randomNumbers(length) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


}
export default new Generator()