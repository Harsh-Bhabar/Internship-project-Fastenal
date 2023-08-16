package com.ecom.user.dto;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.net.URL;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table
public class User {
    @NotNull
    private String name;
    @Id
    private String userName;
    @NotNull
    private String userType;
    // [admin, customer]
    @Column(unique = true)
    private String emailId;
    @NotNull
    private String password;
    @NotNull
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String address;
    @Transient
    private int age;
    private URL profilePicUrl;

    public User(String name, String userName, String userType, String emailId, String password, LocalDate dateOfBirth, String phoneNumber, String address, URL profilePicUrl) {
        this.setPhoneNumber(phoneNumber);
        this.setAddress(address);
        this.setName(name);
        this.setUserName(userName);
        this.setUserType(userType);
        this.setEmailId(emailId);
        this.setPassword(password);
        this.setDateOfBirth(dateOfBirth);
        this.setProfilePicUrl(profilePicUrl);
    }

    public User() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public int getAge() {
        return Period.between(this.dateOfBirth, LocalDate.now()).getYears();
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public URL getProfilePicUrl() {
        return profilePicUrl;
    }

    public void setProfilePicUrl(URL profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }
}
