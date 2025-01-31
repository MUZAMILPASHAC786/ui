import { assert } from "chai";

let Logger = {    
    log(input){        
        console.log('\u001b[36m' +input + "\u001B[0m"); 
    },
    info(input){
        console.info('\u001b[32m' + input + "\u001B[0m")
    },
    debug(input){
        console.debug('\u001b[35m' + input + "\u001B[0m")
    },
    warn(input){
        console.log('\u001b[33m' + input + "\u001B[0m")
    },
    error(input){
        console.error('\u001b[31m' + input + "\u001B[0m")
        assert.fail(input)
    },
}

export default Logger
