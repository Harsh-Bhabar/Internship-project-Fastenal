package com.ecom.cartorderswishlist.dto;

import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;

@Document(collection = "order")
public class Order {
    @Id
    private String id;
    @NonNull
    private String userName;
    private ArrayList<OrderItem> orderItems;
    private float totalPrice;
    private LocalDate timeStamp;
    private Address address;

    public Order(@NonNull String userName, ArrayList<OrderItem> orderItems, float totalPrice, LocalDate timeStamp, Address address) {
        this.userName = userName;
        this.orderItems = orderItems;
        this.totalPrice = totalPrice;
        this.timeStamp = timeStamp;
        this.address = address;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDate getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDate timeStamp) {
        this.timeStamp = timeStamp;
    }

    public ArrayList<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(ArrayList<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
