import { createLogger } from 'bunyan';


const bunyanLogger = createLogger({
    level: 'debug',
    streams:  [
        {
            level: 'debug',
            stream: process.stdout,
        },
    ],
    name: 'Genially APP',
    src: true,
});


export const logger = {
    error(message: string, any: any = null) {
        bunyanLogger.fields = { ...bunyanLogger.fields };
        bunyanLogger.error(any, message);
    },
    warn(message: string, any: any = null) {
        bunyanLogger.fields = { ...bunyanLogger.fields };
        bunyanLogger.warn(any, message);
    },
    info(message: string, any: any = null) {
        bunyanLogger.fields = { ...bunyanLogger.fields};
        bunyanLogger.info(any, message);
    },
    debug(message: string, any: any = null) {
        bunyanLogger.fields = { ...bunyanLogger.fields};
        bunyanLogger.debug(any, message);
    },
};
