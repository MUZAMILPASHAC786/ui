import Logger from './loggers'

export default (actual, expected, message) => {
    Logger.info(message)
    if(actual === expected) {
        Logger.info(`Working as expected: ${message}`)
    } else {
        Logger.error(`Failed while ${message}`)
    }
}