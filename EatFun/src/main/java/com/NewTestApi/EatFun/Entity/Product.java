package com.NewTestApi.EatFun.Entity;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="products")
@EntityListeners(AuditingEntityListener.class)  // 啟用實體的審計功能，以自動賦值或更新時間
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId")
    private Integer productId;

    @OneToMany
    @JsonManagedReference("cartitems_product")
    private Set<CartItems> cartItems;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference("product_productImage")
    private List<ProductImage> productImages;

    @OneToOne(mappedBy = "product")
    @JsonManagedReference("product_recipes")
    private Recipes recipes;

    @Column(name = "type", columnDefinition = "enum('mealkit','preparedFood')")
    private String type;

    @Column(name = "sku", nullable = false, length = 50)
    private String sku;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "price", nullable = false)
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "categoryId", referencedColumnName = "categoryId" ,nullable = false)
    @JsonBackReference
    private Category category;

    @Column(name = "stockQuantity", nullable = false)
    private Integer stockQuantity;


    @CreatedDate // 自動設定建立時間
    @Column(name = "createdAt",nullable = false, updatable = false)
    private Timestamp createdAt;

    @LastModifiedDate // 自動設定更新時間
    @Column(name = "updatedAt",nullable = false)
    private Timestamp updatedAt;


    @Column(name = "isDel", columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isDel;

    public Set<CartItems> getCartItems() {
        return cartItems;
    }

    public void setCartItems(Set<CartItems> cartItems) {
        this.cartItems = cartItems;
    }

    public List<ProductImage> getProductImage() {
        return productImages;
    }

    public void setProductImage(List<ProductImage> productImage) {
        this.productImages = productImage;
    }

    public Boolean getDel() {
        return isDel;
    }

    public void setDel(Boolean del) {
        isDel = del;
    }

    public Integer getProductId() {
        return productId;
    }


    public void setProductId(Integer productId) {
        this.productId = productId;
    }


    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }


    public String getSku() {
        return sku;
    }


    public void setSku(String sku) {
        this.sku = sku;
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


    public Integer getPrice() {
        return price;
    }


    public void setPrice(Integer price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }


    public void setCategory(Category category) {
        this.category = category;
    }


    public Integer getStockQuantity() {
        return stockQuantity;
    }


    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }


    public Timestamp getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }


    public Timestamp getUpdatedAt() {
        return updatedAt;
    }


    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }


    public Boolean getIsDel() {
        return isDel;
    }


    public void setIsDel(Boolean isDel) {
        this.isDel = isDel;
    }


}