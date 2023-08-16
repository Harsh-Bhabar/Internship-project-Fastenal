package com.ecom.user.exception;

import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.Logger;

public class LogExceptionWithMessage {
    static Logger logger = LogManager.getLogManager().getLogger(Logger.GLOBAL_LOGGER_NAME);

    public static void throwExceptionWithMessage(Level exceptionLevel, String exceptionMessage, Exception exception) {
        logger.log(exceptionLevel, exceptionMessage + ": " + exception.getMessage());
    }
}
