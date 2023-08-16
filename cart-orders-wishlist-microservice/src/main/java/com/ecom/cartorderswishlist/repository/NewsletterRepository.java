package com.ecom.cartorderswishlist.repository;

import com.ecom.cartorderswishlist.dto.Newsletter;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NewsletterRepository extends MongoRepository<Newsletter, String> {

}
