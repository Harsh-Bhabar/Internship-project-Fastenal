package com.ecom.user.service;

import com.ecom.user.dto.User;
import com.ecom.user.encryption.PasswordUtils;
import com.ecom.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ArrayList<String> userTypesList = new ArrayList<>(List.of("admin", "customer"));

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public void addUser(User user) {
        Optional<User> userNameOptional = userRepository.findUserByUserName(user.getUserName());
        Optional<User> userEmailOptional = userRepository.findUserByEmailId(user.getEmailId());

        if (userNameOptional.isPresent()) {
            throw new IllegalStateException("UserName taken");
        }
        if (userEmailOptional.isPresent()) {
            throw new IllegalStateException("Email taken");
        }

        // Validates user details and throws exception if any field is incorrect
        validateUserDetails(user);

        String securedPassword = PasswordUtils.generateSecurePassword(user.getPassword(), user.getUserName());
        user.setPassword(securedPassword);

        userRepository.save(user);
    }

    private void validateUserDetails(User user) {
        if (user.getName().length() == 0)
            throw new IllegalStateException("Name cannot be empty");
        if (user.getUserName().length() == 0)
            throw new IllegalStateException("User Name cannot be empty");
        if (!isUserTypeValid(user.getUserType()))
            throw new IllegalStateException("Invalid user type. Allowed types: [admin, customer]");
        if (!isEmailValid(user.getEmailId()))
            throw new IllegalStateException("Invalid email id");
        if (!isPhoneNumberValid(user.getPhoneNumber()))
            throw new IllegalStateException("Invalid phone number");
        if (!isPasswordValid(user.getPassword()))
            throw new IllegalStateException("Invalid password. Password must be 8-20 characters, contain at least one uppercase and one lowercase alphabet, must have a special character: [@, #,$, %], must contain numbers.");
        if (!isDateOfBirthValid(user.getDateOfBirth()))
            throw new IllegalStateException("Invalid date of birth entered! (YYYY/MM/dd");
        if (user.getProfilePicUrl().toString().length() == 0)
            throw new IllegalStateException("Invalid profile pic URL");
        if (user.getAddress().length() == 0)
            throw new IllegalStateException("Address invalid!");
    }

    private boolean isDateOfBirthValid(LocalDate dateOfBirth) {
        String strDate = dateOfBirth.toString();
        if (strDate.trim().equals("")) {
            return true;
        } else {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd");
            simpleDateFormat.setLenient(false);
            try {
                Date javaDate = simpleDateFormat.parse(strDate);
                return true;
            } catch (Exception e) {
                return false;
            }
        }
    }

    private boolean isPhoneNumberValid(String phoneNumber) {
        Pattern pattern = Pattern.compile("(0/91)?[7-9][0-9]{9}");
        Matcher matcher = pattern.matcher(phoneNumber);
        return (matcher.find() && matcher.group().equals(phoneNumber));
    }

    private boolean isUserTypeValid(String userType) {
        return userTypesList.contains(userType);
    }

    private boolean isPasswordValid(String password) {
        String regex = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    private boolean isEmailValid(String emailId) {
        String regex = "^(.+)@(.+)$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(emailId);
        return matcher.matches();
    }

    public void deleteUser(String userName) {
        boolean userExists = userRepository.existsByUserName(userName);

        if (!userExists) {
            throw new IllegalStateException(userName + " does not exist");
        }
        userRepository.deleteByUserName(userName);
    }

    public Optional<User> getUser(String userName) {
        return userRepository.findUserByUserName(userName);
    }

    @Transactional
    public void updateUser(String userName, User user) {
        User userOptional = userRepository.findUserByUserName(userName)
                .orElseThrow(() -> new IllegalStateException(userName + " does not exist"));
        if (!userRepository.existsByUserName(userName)) {
            throw new IllegalStateException(userName + " does not exist");
        }

        if (user.getName() != null && user.getName().length() > 0 && !Objects.equals(userOptional.getName(), user.getName())) {
            System.out.println(user.getName());
            userOptional.setName(user.getName());
        }

        if (user.getDateOfBirth() != null && isDateOfBirthValid(user.getDateOfBirth())) {
            System.out.println(user.getDateOfBirth());
            userOptional.setDateOfBirth(user.getDateOfBirth());
        }

        if (user.getPhoneNumber() != null && isPhoneNumberValid(user.getPhoneNumber())) {
            System.out.println(user.getPhoneNumber());
            userOptional.setPhoneNumber(user.getPhoneNumber());
        }

        if (user.getPassword() != null && isPasswordValid(user.getPassword())) {
            System.out.println(user.getPassword());
            String securedPassword = PasswordUtils.generateSecurePassword(user.getPassword(), userName);
            userOptional.setPassword(securedPassword);
        }

        if (user.getProfilePicUrl() != null && user.getProfilePicUrl().toString().length() != 0)
            userOptional.setProfilePicUrl(user.getProfilePicUrl());

        if (user.getAddress() != null && user.getAddress().length() != 0)
            userOptional.setAddress(user.getAddress());

        userRepository.save(userOptional);
    }

    public boolean verifyPassword(String userName, String providedPassword) {
        boolean isPasswordValid = false;
        User user = userRepository.findUserByUserName(userName)
                .orElseThrow(() -> new IllegalStateException(userName + " does not exist"));
        String securedPassword = user.getPassword();

        if (PasswordUtils.verifyUserPassword(providedPassword, securedPassword, userName)) {
            isPasswordValid = true;
        }

        return isPasswordValid;
    }
}
