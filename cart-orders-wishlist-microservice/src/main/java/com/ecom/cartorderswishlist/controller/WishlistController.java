package com.ecom.cartorderswishlist.controller;

import com.ecom.cartorderswishlist.dto.Wishlist;
import com.ecom.cartorderswishlist.exception.LogExceptionWithMessage;
import com.ecom.cartorderswishlist.response.ResponseHandler;
import com.ecom.cartorderswishlist.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;
import java.util.logging.Level;

@RestController
@RequestMapping(path = "/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {
    public final WishlistService wishlistService;

    @Autowired
    WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/{userName}")
    public ResponseEntity<Object> getWishlistForUser(@PathVariable("userName") String userName) {
        try {
            Optional<Wishlist> wishlist = wishlistService.getWishlistForUser(userName);
            if (wishlist.isPresent())
                return ResponseHandler.generateResponse("Wishlist for user retrieved successfully!", HttpStatus.OK, wishlist);
            else
                return ResponseHandler.generateResponse("Unable to retrieve wishlist!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting wishlist for userName: " + userName, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping("/is-product-wishlisted/{userName}/{productSku}")
    public ResponseEntity<Object> isProductWishlisted(@PathVariable("userName") String userName, @PathVariable("productSku") String productSku) {
        try {
            boolean isWishlisted = wishlistService.isProductWishlisted(userName, productSku);
            HashMap<String, Object> wishlistedMap = new HashMap<>();
            wishlistedMap.put("userName", userName);
            wishlistedMap.put("productSku", productSku);
            wishlistedMap.put("isWishlisted", isWishlisted);
            return ResponseHandler.generateResponse("Check for product in wishlist completed!", HttpStatus.OK, wishlistedMap);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception checking if product is wishlisted", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping("/add/{userName}/{productSku}")
    public ResponseEntity<Object> addProductToWishlist(@PathVariable("userName") String userName, @PathVariable("productSku") String productSku) {
        try {
            wishlistService.addProductToWishlist(userName, productSku);
            HashMap<String, Object> addToWishlistResponse = new HashMap<>();
            addToWishlistResponse.put("userName", userName);
            addToWishlistResponse.put("sku", productSku);
            return ResponseHandler.generateResponse("Product added to wishlist successfully", HttpStatus.OK, addToWishlistResponse);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception adding product to wishlist", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping("/add-all/{userName}")
    public ResponseEntity<Object> addAllProductsToWishlist(@PathVariable("userName") String userName, @RequestBody Wishlist wishlist) {
        try {
            wishlistService.addAllProductsToWishlist(userName, wishlist.getProductSkus());
            return ResponseHandler.generateResponse("Product added to wishlist successfully", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception adding product to wishlist", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping("/remove/{userName}/{productSku}")
    public ResponseEntity<Object> removeProductFromWishlist(@PathVariable("userName") String userName, @PathVariable("productSku") String productSku) {
        try {
            wishlistService.removeProductFromWishlist(userName, productSku);
            return ResponseHandler.generateResponse("Product removed from wishlist successfully", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception removing product from wishlist", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
}
