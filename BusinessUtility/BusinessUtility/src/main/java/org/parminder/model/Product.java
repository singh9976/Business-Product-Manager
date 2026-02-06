package org.parminder.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Product {
    private String id;

    @JsonProperty("productName")
    private String productName;

    @JsonProperty("mrp")
    private Double mrp;

    @JsonProperty("sellingPrice")
    private Double sellingPrice;

    @JsonProperty("quantity")
    private Integer quantity;

    // Constructors
    public Product() {
    }

    public Product(String id, String productName, Double mrp, Double sellingPrice, Integer quantity) {
        this.id = id;
        this.productName = productName;
        this.mrp = mrp;
        this.sellingPrice = sellingPrice;
        this.quantity = quantity;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getMrp() {
        return mrp;
    }

    public void setMrp(Double mrp) {
        this.mrp = mrp;
    }

    public Double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", productName='" + productName + '\'' +
                ", mrp=" + mrp +
                ", sellingPrice=" + sellingPrice +
                ", quantity=" + quantity +
                '}';
    }
}


