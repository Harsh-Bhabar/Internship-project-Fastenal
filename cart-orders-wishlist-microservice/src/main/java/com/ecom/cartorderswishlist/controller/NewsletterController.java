package com.ecom.cartorderswishlist.controller;

import com.ecom.cartorderswishlist.dto.Newsletter;
import com.ecom.cartorderswishlist.exception.LogExceptionWithMessage;
import com.ecom.cartorderswishlist.response.ResponseHandler;
import com.ecom.cartorderswishlist.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Level;

@RestController
@RequestMapping(path = "/newsletter")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsletterController {
    public final NewsletterService newsletterService;

    @Autowired
    NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getAllSubscriptions()  {
        try {
            List<Newsletter> newsletters = newsletterService.getNewsletters();
            return ResponseHandler.generateResponse("Newsletters retrieved successfully!", HttpStatus.OK, newsletters);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting all newsletters", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
    @PostMapping
    public ResponseEntity<Object> addEmailToNewsletterList(@RequestBody Newsletter newsletter) {
        try {
            newsletterService.addEmailToNewsletterList(newsletter.getEmailId(), LocalDateTime.now());
            return ResponseHandler.generateResponse("Email added to newsletter successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception add email to newsletter list", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @DeleteMapping(path = "/{newsletterId}")
    public ResponseEntity<Object> deleteSubscription(@PathVariable("newsletterId") String newsletterId) {
        try {
            newsletterService.deleteSubscription(newsletterId);
            return ResponseHandler.generateResponse("Subscription deleted successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception deleting subscription", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
}
