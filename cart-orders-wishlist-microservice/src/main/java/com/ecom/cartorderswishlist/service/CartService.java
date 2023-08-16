package com.ecom.cartorderswishlist.service;

import com.ecom.cartorderswishlist.dto.Cart;
import com.ecom.cartorderswishlist.dto.Order;
import com.ecom.cartorderswishlist.dto.OrderItem;
import com.ecom.cartorderswishlist.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Optional<Cart> getCartDetails(String userName) {
        Optional<Cart> cartUserNameOptional = cartRepository.findCartDetailsByUserName(userName);
        if (!cartUserNameOptional.isPresent())
            initializeCartForUser(userName);
        return cartRepository.findCartDetailsByUserName(userName);
    }

    public void initializeCartForUser(String userName) {
        Optional<Cart> cartUserNameOptional = cartRepository.findCartDetailsByUserName(userName);
        if (cartUserNameOptional.isPresent())
            throw new IllegalStateException("Cart details for userName: " + userName + " already exists");
        cartRepository.save(new Cart(userName, new ArrayList<>()));
    }

    public void addItemToCart(String userName, String sku, float unitPrice) throws IllegalStateException {
        Optional<Cart> cartUserNameOptional = cartRepository.findCartDetailsByUserName(userName);
        if (!cartUserNameOptional.isPresent())
            initializeCartForUser(userName);

        cartUserNameOptional = cartRepository.findCartDetailsByUserName(userName);
        ArrayList<OrderItem> products = cartUserNameOptional.get().getProducts();
        if (products.stream().anyMatch(orderItem -> sku.equals(orderItem.getProductSku()))) {
            for (OrderItem orderItem : products) {
                if (orderItem.getProductSku().equals(sku))
                    orderItem.setQuantity(orderItem.getQuantity() + 1);
            }
        } else {
            products.add(new OrderItem(sku, 1, unitPrice));
        }
        cartUserNameOptional.get().setProducts(products);
        cartRepository.save(cartUserNameOptional.get());
    }

    public void removeItemFromCart(String userName, String sku) throws IllegalStateException {
        Optional<Cart> cartUserNameOptional = cartRepository.findCartDetailsByUserName(userName);

        ArrayList<OrderItem> products = cartUserNameOptional.get().getProducts();
        if (products.stream().anyMatch(orderItem -> sku.equals(orderItem.getProductSku()))) {
            for (OrderItem orderItem : products) {
                if (orderItem.getProductSku().equals(sku)) {
                    if (orderItem.getQuantity() - 1 == 0) {
                        products.remove(orderItem);
                        break;
                    } else
                        orderItem.setQuantity(orderItem.getQuantity() - 1);
                }
            }
            cartUserNameOptional.get().setProducts(products);
            cartRepository.save(cartUserNameOptional.get());
        } else {
            throw new IllegalStateException("Product not present in cart");
        }
    }

    public void removeThisItemFromCart(String userName, String sku) {
        Optional<Cart> cartUserNameOptional = cartRepository.findCartDetailsByUserName(userName);

        ArrayList<OrderItem> products = cartUserNameOptional.get().getProducts();
        for (OrderItem orderItem : products) {
            if (orderItem.getProductSku().equals(sku)) {
                products.remove(orderItem);
                break;
            }
        }
        cartUserNameOptional.get().setProducts(products);
        cartRepository.save(cartUserNameOptional.get());
    }

    public Order emptyCartAndRetrieveOrdersForUser(String userName) {
        Optional<Cart> cartUserNameOptional = cartRepository.findCartDetailsByUserName(userName);

        if (!cartUserNameOptional.isPresent())
            throw new IllegalStateException("Cart for this userName doesn't exist");

        Order order = new Order(userName, cartUserNameOptional.get().getProducts(), cartUserNameOptional.get().getTotalPrice(), LocalDate.now(), null);
        cartUserNameOptional.get().setProducts(new ArrayList<>());
        cartRepository.save(cartUserNameOptional.get());
        return order;
    }

}
