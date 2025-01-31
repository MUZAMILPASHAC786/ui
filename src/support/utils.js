
/**
 * This is a class which contains the Utils methods 
 */
class Utils {


    /**
    * Function to filter array of JSON objects based on specific fields
    * @param {array} array array should be array format
    * @param {string} filters The filters can be an object or string.For Ex: {'key':'value','key':'value'} or "anyValue". By default string will search on event
    * @returns {array} it will return the valid date's
    */
    filterJsonArray(array, filters) {
        return array.filter(obj => {
            for (let key in filters) {
                if (obj[key] !== filters[key]) {
                    return false;
                }
            }
            return true;
        });
    }


}
export default new Utils()