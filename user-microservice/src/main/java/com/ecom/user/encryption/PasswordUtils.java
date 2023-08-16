package com.ecom.user.encryption;

import com.ecom.user.exception.LogExceptionWithMessage;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.Base64;
import java.util.logging.Level;

public class PasswordUtils {
    private static final int ITERATIONS = 10000;
    private static final int KEY_LENGTH = 256;

    public static byte[] hash(char[] password, byte[] salt) {
        PBEKeySpec spec = new PBEKeySpec(password, salt, ITERATIONS, KEY_LENGTH);
        Arrays.fill(password, Character.MIN_VALUE);
        try {
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            return skf.generateSecret(spec).getEncoded();
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new AssertionError("Error while hashing a password: " + e.getMessage(), e);
        } finally {
            spec.clearPassword();
        }
    }

    public static String generateSecurePassword(String password, String salt) {
        String securedPassword = null;
        try {
            byte[] securePassword = hash(password.toCharArray(), salt.getBytes());
            securedPassword = Base64.getEncoder().encodeToString(securePassword);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception generating password", e);
        }

        return securedPassword;
    }

    public static boolean verifyUserPassword(String providedPassword, String securedPassword, String salt) {
        boolean isPasswordValid = false;
        String newSecurePassword = generateSecurePassword(providedPassword, salt);
        isPasswordValid = newSecurePassword.equalsIgnoreCase(securedPassword);

        return isPasswordValid;
    }
}