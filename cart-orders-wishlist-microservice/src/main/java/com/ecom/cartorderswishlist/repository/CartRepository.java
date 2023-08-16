package com.ecom.cartorderswishlist.repository;

import com.ecom.cartorderswishlist.dto.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart, String> {
    @Query("{'userName':  ?0}")
    Optional<Cart> findCartDetailsByUserName(String userName);
}
