package tw.luna.FinalTest.dto.cart;


//更新購物車數量
public class CartUpdateDto {
    private Integer quantity;

    public CartUpdateDto() {
    }

    public CartUpdateDto(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
