package tw.luna.FinalTest.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

//cart表結構:cartId、userId、total、totalQuantity、status
//建構式、getter setter

//@DynamicUpdate
@Entity
@Table(name = "cartitems")
public class CartItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartitemsId")
    private Integer cartitemsId;

    @ManyToOne
    @JoinColumn(name = "cartId", nullable = false)
    @JsonBackReference("Cart_CartItems")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    @JsonBackReference("cartitems_product")
    private Product product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "price", nullable = false)
    private Integer price;

    public CartItems() {
    }

    public CartItems(Integer cartitemsId, Cart cart, Product product, Integer quantity, Integer price) {
        this.cartitemsId = cartitemsId;
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }

    public Integer getCartitemsId() {
        return cartitemsId;
    }

    public void setCartitemsId(Integer cartitemsId) {
        this.cartitemsId = cartitemsId;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "CartItems{" +
                "cartitemsId=" + cartitemsId +
                ", cart=" + cart +
                ", product=" + product +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
