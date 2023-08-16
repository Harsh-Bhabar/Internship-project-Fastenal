package com.ecom.cartorderswishlist.service;

import com.ecom.cartorderswishlist.dto.Newsletter;
import com.ecom.cartorderswishlist.repository.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NewsletterService {
    private final NewsletterRepository newsletterRepository;

    @Autowired
    public NewsletterService(NewsletterRepository newsletterRepository) {
        this.newsletterRepository = newsletterRepository;
    }


    public void addEmailToNewsletterList(String emailId, LocalDateTime timeStamp) {
        newsletterRepository.save(new Newsletter(emailId, timeStamp));
    }

    public List<Newsletter> getNewsletters() {
        return newsletterRepository.findAll();
    }

    public void deleteSubscription(String newsletterId) {
        newsletterRepository.deleteById(newsletterId);
    }
}
