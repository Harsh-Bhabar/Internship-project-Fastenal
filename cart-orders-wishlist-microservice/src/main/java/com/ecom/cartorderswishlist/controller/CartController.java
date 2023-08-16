package com.ecom.cartorderswishlist.controller;

import com.ecom.cartorderswishlist.dto.Address;
import com.ecom.cartorderswishlist.dto.Cart;
import com.ecom.cartorderswishlist.dto.Order;
import com.ecom.cartorderswishlist.exception.LogExceptionWithMessage;
import com.ecom.cartorderswishlist.response.ResponseHandler;
import com.ecom.cartorderswishlist.service.CartService;
import com.ecom.cartorderswishlist.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;
import java.util.logging.Level;

@RestController
@RequestMapping(path = "/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    public final CartService cartService;
    public final OrdersService ordersService;

    @Autowired
    CartController(CartService cartService, OrdersService ordersService) {
        this.cartService = cartService;
        this.ordersService = ordersService;
    }

    @GetMapping("/{userName}")
    public ResponseEntity<Object> getCartDetails(@PathVariable("userName") String userName) {
        try {
            Optional<Cart> cart = cartService.getCartDetails(userName);
            if (cart.isPresent())
                return ResponseHandler.generateResponse("Cart details retrieved successfully!", HttpStatus.OK, cart);
            else
                return ResponseHandler.generateResponse("Unable to retrieve cart details!", HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception getting cart details with userName: " + userName, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping(path = "/initialize-cart/{userName}")
    public ResponseEntity<Object> initializeCartForUser(@PathVariable("userName") String userName) {
        try {
            cartService.initializeCartForUser(userName);
            HashMap<String, String> userNameMap = new HashMap<>();
            userNameMap.put("userName", userName);
            return ResponseHandler.generateResponse("Cart details for userName: " + userName + " initialized successfully", HttpStatus.OK, userNameMap);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception initializing cart details with userName: " + userName, e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping(path = "/add-one")
    public ResponseEntity<Object> addItemToCart(@RequestParam("userName") String userName, @RequestParam("sku") String sku, @RequestParam("unitPrice") float unitPrice) {
        try {
            cartService.addItemToCart(userName, sku, unitPrice);
            return ResponseHandler.generateResponse("Product added to cart successfully", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception adding product to cart", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping(path = "/remove-one")
    public ResponseEntity<Object> removeItemFromCart(@RequestParam("userName") String userName, @RequestParam("sku") String sku) {
        try {
            cartService.removeItemFromCart(userName, sku);
            return ResponseHandler.generateResponse("Product removed from cart successfully", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception removing product from cart", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @PostMapping(path = "/remove-this-item")
    public ResponseEntity<Object> removeThisItemFromCart(@RequestParam("userName") String userName, @RequestParam("sku") String sku) {
        try {
            cartService.removeThisItemFromCart(userName, sku);
            return ResponseHandler.generateResponse("Product removed from cart successfully", HttpStatus.OK, null);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception removing product from cart", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }


    // placeOrderAndEmptyCart
    // - returns orders list to the caller
    // - empties the cart
    // - calls ordersService to add order
    @DeleteMapping(path = "/place-order/{userName}")
    public ResponseEntity<Object> placeOrderAndEmptyCart(@PathVariable("userName") String userName, @RequestBody Address address) {
        try {
            Order order = cartService.emptyCartAndRetrieveOrdersForUser(userName);
            ordersService.addOrderForUserName(userName, order.getOrderItems(), order.getTotalPrice(), order.getTimeStamp(), address);
            if (order.getOrderItems().size() == 0)
                return ResponseHandler.generateResponse("Orders must have at least one item.", HttpStatus.BAD_REQUEST, null);
            return ResponseHandler.generateResponse("Order placed successfully!", HttpStatus.OK, order);
        } catch (Exception e) {
            LogExceptionWithMessage.throwExceptionWithMessage(Level.WARNING, "Exception placing order and emptying cart", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }
}
