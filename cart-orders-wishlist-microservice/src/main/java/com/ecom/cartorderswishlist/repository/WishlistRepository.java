package com.ecom.cartorderswishlist.repository;

import com.ecom.cartorderswishlist.dto.Wishlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface WishlistRepository extends MongoRepository<Wishlist, String> {
    @Query("{'userName' : ?0}")
    Optional<Wishlist> findWishlistForUserName(String userName);
}
