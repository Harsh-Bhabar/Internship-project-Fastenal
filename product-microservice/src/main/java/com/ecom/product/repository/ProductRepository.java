package com.ecom.product.repository;

import com.ecom.product.dto.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {
    @Query("{'sku' : ?0}")
    Optional<Product> findProductBySKU(String sku);

    @Query(value = "{'sku' : ?0}", exists = true)
    boolean existsBySku(String sku);

    @Query(value = "{'sku' : ?0}", delete = true)
    void deleteBySku(String sku);

    @Query(value = "{'brand': {'$regex' : ?0, '$options': 'i'}}")
    List<Product> findProductByBrand(String brand);

    @Query("{'price': {'$gte' : ?0, '$lte' : ?1}}")
    List<Product> getProductsInPriceRange(float min, float max);

//    @Query("{'brand': {'$regex' : ?0, '$options': 'i'}}")
    @Query("{'$or': [{'brand': {'$regex' : ?0, '$options': 'i'}}, {'name': {'$regex' : ?0, '$options': 'i'}}, {'description': {'$regex' : ?0, '$options': 'i'}}, {'gender': {'$regex' : ?0, '$options': 'i'}}]}")
    List<Product> getProductsForQuery(String searchQuery);
}