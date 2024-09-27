package tw.luna.FinalTest.dto;


//新增購物車內商品
public class CartInsertDto {

    private Integer productId;
    private Integer quantity = 1;

    public CartInsertDto() {
    }

    public CartInsertDto(Integer productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}
