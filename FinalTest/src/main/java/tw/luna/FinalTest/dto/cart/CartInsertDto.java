package tw.luna.FinalTest.dto.cart;


//新增購物車內商品
public class CartInsertDto {

    private String productName;
    private Integer quantity = 1; //預設值為1

    public CartInsertDto() {
    }


    public CartInsertDto(String productName, Integer quantity) {
        this.productName = productName;
        this.quantity = quantity;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}
