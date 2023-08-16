package com.ecom.cartorderswishlist.service;

import com.ecom.cartorderswishlist.dto.Wishlist;
import com.ecom.cartorderswishlist.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class WishlistService {
    private final WishlistRepository wishlistRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public Optional<Wishlist> getWishlistForUser(String userName) {
        Optional<Wishlist> wishlistOptional = wishlistRepository.findWishlistForUserName(userName);
        if (!wishlistOptional.isPresent()) {
            initializeWishlistForUser(userName);
        }
        return wishlistRepository.findWishlistForUserName(userName);
    }

    public void initializeWishlistForUser(String userName) {
        Optional<Wishlist> wishlistOptional = wishlistRepository.findWishlistForUserName(userName);
        if (wishlistOptional.isPresent())
            throw new IllegalStateException("Cart details for userName: " + userName + " already exists");
        wishlistRepository.save(new Wishlist(userName, new ArrayList<>()));
    }

    public void addProductToWishlist(String userName, String productSku) {
        Optional<Wishlist> wishlistOptional = wishlistRepository.findWishlistForUserName(userName);
        if (!wishlistOptional.isPresent()) {
            wishlistRepository.save(new Wishlist(userName, new ArrayList<>()));
        }
        wishlistOptional = wishlistRepository.findWishlistForUserName(userName);
        if (!wishlistOptional.get().getProductSkus().contains(productSku)) {
            ArrayList<String> productSkus = wishlistOptional.get().getProductSkus();
            productSkus.add(productSku);
            wishlistRepository.save(wishlistOptional.get());
        } else {
            throw new IllegalStateException("Product already present in wishlist");
        }
    }

    public void addAllProductsToWishlist(String userName, ArrayList<String> productSkus) {
        for (String sku : productSkus) {
            addProductToWishlist(userName, sku);
        }
    }

    public void removeProductFromWishlist(String userName, String productSku) {
        Optional<Wishlist> wishlistOptional = wishlistRepository.findWishlistForUserName(userName);
        if (!wishlistOptional.isPresent()) {
            throw new IllegalStateException("Wishlist for userName: " + userName + " does not exist.");
        }
        if (wishlistOptional.get().getProductSkus().contains(productSku)) {
            wishlistOptional.get().getProductSkus().remove(productSku);
            wishlistRepository.save(wishlistOptional.get());
        } else {
            throw new IllegalStateException("Product not present in wishlist");
        }
    }

    public boolean isProductWishlisted(String userName, String productSku) {
        Optional<Wishlist> wishlist = getWishlistForUser(userName);
        if (!wishlist.isPresent()) {
            initializeWishlistForUser(userName);
            return false;
        }

        if (wishlist.get().getProductSkus().contains(productSku))
            return true;
        else
            return false;
    }
}
