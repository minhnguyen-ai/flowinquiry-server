package io.flexwork.exceptions;

public class SystemErrorException extends RuntimeException{
    public SystemErrorException(String message) {
        super(message);
    }
}
