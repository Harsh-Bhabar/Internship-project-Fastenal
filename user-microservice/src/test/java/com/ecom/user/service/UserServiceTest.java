package com.ecom.user.service;

import com.ecom.user.dto.User;
import com.ecom.user.repository.UserRepository;
import org.assertj.core.api.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    private UserService userServiceUnderTest;

    @BeforeEach
    void setUp() {
        userServiceUnderTest = new UserService(userRepository);
    }

    @Test
    void canGetUsers() {
        // given
        // when
        userServiceUnderTest.getUsers();
        // then
        Mockito.verify(userRepository).findAll();
    }

    @Test
    void canAddUser() throws MalformedURLException {
        // given
        User user = new User(
                "Test User",
                "testUser",
                "customer",
                "test@gmail.com",
                "Password123@123",
                LocalDate.now(),
                "9424144219",
                "Address",
                new URL("https://www.google.com")
        );
        // when
        userServiceUnderTest.addUser(user);
        // then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);

        Mockito.verify(userRepository).save(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();
        AssertionsForClassTypes.assertThat(capturedUser).isEqualTo(user);
    }

    @Test
    @Disabled
    void willThrowWhenUserNameIsTaken() throws MalformedURLException {
        // given
        User user = new User(
                "Test User",
                "testUser",
                "customer",
                "test@gmail.com",
                "Password123@123",
                LocalDate.now(),
                "9424144219",
                "Address",
                new URL("https://www.google.com")
        );

        BDDMockito.given(userRepository.existsByUserName(user.getUserName())).willReturn(true);
        // when
        // then
        Assertions.assertThatThrownBy(() -> userServiceUnderTest.addUser(user))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("UserName taken");

    }

    @Test
    void canDeleteUser() throws MalformedURLException {
        User user = new User(
                "Test User",
                "testUser",
                "customer",
                "test@gmail.com",
                "Password123@123",
                LocalDate.now(),
                "9424144219",
                "Address",
                new URL("https://www.google.com")
        );
        BDDMockito.given(userRepository.existsByUserName(user.getUserName())).willReturn(true);
        userServiceUnderTest.deleteUser(user.getUserName());
        Mockito.verify(userRepository).deleteByUserName(user.getUserName());
    }
}