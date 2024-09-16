package io.flexwork.security.web.rest;

import lombok.Getter;
import lombok.Setter;

/** View Model object for storing the user's key and password. */
@Setter
@Getter
public class KeyAndPasswordVM {

    private String key;

    private String newPassword;
}
