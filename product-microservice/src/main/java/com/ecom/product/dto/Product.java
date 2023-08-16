package com.ecom.product.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.net.URL;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String brand;
    private String name;
    private String description;
    @Indexed(unique = true)
    private String sku;
    private Float price;
    private String gender;
    //    [mens, ladies, unisex]
    private String bandMaterial;
    private String movementType;
    //    [analogue, digital ...]
    private String color;
    private String bandColor;
    private URL imageUrl;

    public Product(String brand, String name, String description, String sku, Float price, String gender, String bandMaterial, String movementType, String color, String bandColor, URL imageUrl) {
        this.brand = brand;
        this.name = name;
        this.description = description;
        this.sku = sku;
        this.price = price;
        this.gender = gender;
        this.bandMaterial = bandMaterial;
        this.movementType = movementType;
        this.color = color;
        this.bandColor = bandColor;
        this.imageUrl = imageUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBandMaterial() {
        return bandMaterial;
    }

    public void setBandMaterial(String bandMaterial) {
        this.bandMaterial = bandMaterial;
    }

    public String getMovementType() {
        return movementType;
    }

    public void setMovementType(String movementType) {
        this.movementType = movementType;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBandColor() {
        return bandColor;
    }

    public void setBandColor(String bandColor) {
        this.bandColor = bandColor;
    }

    public URL getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(URL imageUrl) {
        this.imageUrl = imageUrl;
    }
}
