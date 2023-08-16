package com.ecom.cartorderswishlist.dto;

import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "cart")
public class Cart {
    @Id
    private String id;
    @NonNull
    private String userName;
    private ArrayList<OrderItem> products;

    @Transient
    private float totalPrice;

    public Cart(String userName, ArrayList<OrderItem> products) {
        this.userName = userName;
        this.products = products;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public ArrayList<OrderItem> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<OrderItem> products) {
        this.products = products;
    }

    public float getTotalPrice() {
        float total = 0.0f;
        for (OrderItem orderItem : products) {
            total += orderItem.getUnitPrice() * orderItem.getQuantity();
        }
        return total;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }
}
