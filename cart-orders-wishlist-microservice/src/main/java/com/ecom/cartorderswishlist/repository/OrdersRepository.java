package com.ecom.cartorderswishlist.repository;

import com.ecom.cartorderswishlist.dto.Order;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrdersRepository extends MongoRepository<Order, String> {
    @Query("{'userName' : ?0}")
    Optional<List<Order>> findOrdersForUserName(String userName);

    @Aggregation(pipeline = {"{'$match' : {'userName': ?0}}", "{'$sort' : {'timeStamp' : ?1}}"})
    Optional<List<Order>> findOrdersForUserNameSortedByTime(String userName, int asc);

    @Query("{'id' : ?0}")
    Optional<Order> findOrderByOrderId(String orderId);
}
