package com.NewTestApi.EatFun.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Set;

//cart表結構:cartId、userId、total、totalQuantity、status
//建構式、getter setter

@DynamicUpdate
@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartId",nullable = false)
    private Integer cartId;

    @OneToOne
    @JoinColumn(name = "userId",nullable = false)
    @JsonBackReference("Users_Cart")
    private Users users;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("Cart_CartItems")
    private Set<CartItems> cartItems;

//    @Column(name = "total",nullable = false)
//    private Integer total;
//
//    @Column(name = "totalQuantity",nullable = false)
//    private Integer totalQuantity;

    @Column(name = "status")
    private String status;

    public Cart() {
    }

    public Cart(Integer cartId, Users users, Set<CartItems> cartItems, String status) {
        this.cartId = cartId;
        this.users = users;
        this.cartItems = cartItems;
//        this.total = total;
//        this.totalQuantity = totalQuantity;
        this.status = status;
    }

    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Set<CartItems> getCartItems() {
        return cartItems;
    }

    public void setCartItems(Set<CartItems> cartItems) {
        this.cartItems = cartItems;
    }

//    public Integer getTotal() {
//        return total;
//    }
//
//    public void setTotal(Integer total) {
//        this.total = total;
//    }
//
//    public Integer getTotalQuantity() {
//        return totalQuantity;
//    }
//
//    public void setTotalQuantity(Integer totalQuantity) {
//        this.totalQuantity = totalQuantity;
//    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "cartId=" + cartId +
                ", status='" + status + '\'' +
                '}';
    }
}

