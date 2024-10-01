package tw.luna.FinalTest.dto.cart;

import java.util.Arrays;

//查詢購物車


public class CartSelectDto {

    private Integer cartitemsId;
    private Integer price;
    private Integer quantity;
    private String name;
    private byte[] image;

    public CartSelectDto() {
    }
// image還沒放!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    public CartSelectDto(Integer cartitemsId, Integer price, Integer quantity, String name) {
        this.cartitemsId = cartitemsId;
        this.price = price;
        this.quantity = quantity;
        this.name = name;
    }

    public Integer getCartitemsId() {
        return cartitemsId;
    }

    public void setCartitemsId(Integer cartitemsId) {
        this.cartitemsId = cartitemsId;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "CartSelectDto{" +
                "cartitemsId=" + cartitemsId +
                ", price=" + price +
                ", quantity=" + quantity +
                ", name='" + name + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
