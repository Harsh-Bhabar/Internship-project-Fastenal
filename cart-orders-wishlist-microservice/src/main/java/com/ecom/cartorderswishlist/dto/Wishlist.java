package com.ecom.cartorderswishlist.dto;

import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "wishlist")
public class Wishlist {
    @Id
    private String id;
    @NonNull
    @Indexed(unique = true)
    private String userName;

    private ArrayList<String> productSkus;

    public Wishlist(@NonNull String userName, ArrayList<String> productSkus) {
        this.userName = userName;
        this.productSkus = productSkus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @NonNull
    public String getUserName() {
        return userName;
    }

    public void setUserName(@NonNull String userName) {
        this.userName = userName;
    }

    public ArrayList<String> getProductSkus() {
        return productSkus;
    }

    public void setProductSkus(ArrayList<String> productSkus) {
        this.productSkus = productSkus;
    }
}
