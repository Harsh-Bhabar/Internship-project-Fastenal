package com.ecom.user.repository;

import com.ecom.user.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.emailId = ?1")
    Optional<User> findUserByEmailId(String email);

    @Query("SELECT u FROM User u WHERE u.userName = ?1")
    Optional<User> findUserByUserName(String userName);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.userName LIKE ?1")
    boolean existsByUserName(String userName);

    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.userName = ?1")
    void deleteByUserName(String userName);
}
