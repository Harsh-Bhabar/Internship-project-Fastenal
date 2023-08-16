package com.ecom.cartorderswishlist.dto;

import com.mongodb.lang.NonNull;

public class OrderItem {
    @NonNull
    private String productSku;
    private int quantity;
    private float unitPrice;

    public OrderItem(String productSku, int quantity, float unitPrice) {
        this.productSku = productSku;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public String getProductSku() {
        return productSku;
    }

    public void setProductSku(String productSku) {
        this.productSku = productSku;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }
}
