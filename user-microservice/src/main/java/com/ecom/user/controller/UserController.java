package com.ecom.user.controller;

import com.ecom.user.dto.User;
import com.ecom.user.exception.LogExceptionWithMessage;
import com.ecom.user.response.ResponseHandler;
import com.ecom.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Level;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getUsers() {
        try {
            List<User> users = userService.getUsers();
            return ResponseHandler.generateResponse("Users retrieved successfully!", HttpStatus.OK, users);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting all users", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping(path = "{userName}")
    public ResponseEntity<Object> getUser(@PathVariable("userName") String userName) {
        try {
            Optional<User> user = userService.getUser(userName);
            if (user.isPresent())
                return ResponseHandler.generateResponse("User retrieved successfully!", HttpStatus.OK, user);
            else
                return ResponseHandler.generateResponse("Unable to retrieve user!", HttpStatus.NOT_FOUND, user);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting user with userName: " + userName, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping
    public ResponseEntity<Object> addUser(@RequestBody User user) {
        try {
            userService.addUser(user);
            HashMap<String, String> userNameMap = new HashMap<>();
            userNameMap.put("userName", user.getUserName());
            return ResponseHandler.generateResponse("User added successfully!", HttpStatus.OK, userNameMap);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception adding user", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping(path = "/verify-password/{userName}")
    public ResponseEntity<Object> verifyPassword(@PathVariable("userName") String userName, @RequestBody Map<String, String> user) {
        try {
            boolean isUserPasswordValid = userService.verifyPassword(userName, user.get("password"));
            HashMap<String, Object> passwordValidationMap = new HashMap<>();
            passwordValidationMap.put("userName", userName);
            passwordValidationMap.put("isUserPasswordValid", isUserPasswordValid);
            return ResponseHandler.generateResponse("User password verification result.", HttpStatus.OK, passwordValidationMap);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception verifying user password", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PutMapping(path = "{userName}")
    public ResponseEntity<Object> updateUser(@PathVariable("userName") String userName, @RequestBody(required = false) User user) {
        try {
            userService.updateUser(userName, user);
            HashMap<String, String> userNameMap = new HashMap<>();
            userNameMap.put("userName", userName);
            return ResponseHandler.generateResponse("User updated successfully!", HttpStatus.OK, userNameMap);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception updating user", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @DeleteMapping(path = "{userName}")
    public ResponseEntity<Object> deleteUser(@PathVariable("userName") String userName) {
        try {
            userService.deleteUser(userName);
            return ResponseHandler.generateResponse("User deleted successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception deleting user", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
}
