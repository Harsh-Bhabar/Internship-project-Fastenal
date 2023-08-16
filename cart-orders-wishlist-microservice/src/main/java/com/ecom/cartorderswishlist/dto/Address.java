package com.ecom.cartorderswishlist.dto;

public class Address {
    private String locality;
    private String city;
    private String state;
    private String country;

    public Address(String locality, String city, String state, String country) {
        this.locality = locality;
        this.city = city;
        this.state = state;
        this.country = country;
    }

    public String getLocality() {
        return locality;
    }

    public void setLocality(String locality) {
        this.locality = locality;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
