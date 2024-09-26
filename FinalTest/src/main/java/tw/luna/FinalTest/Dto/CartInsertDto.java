package tw.luna.FinalTest.Dto;


//新增購物車內商品
public class CartInsertDto {

    private Integer productId;
    private Long usersId;
    private Integer quantity;
    private Integer price;

    public CartInsertDto() {
    }

    public CartInsertDto(Integer productId, Long usersId, Integer quantity, Integer price) {
        this.productId = productId;
        this.usersId = usersId;
        this.quantity = quantity;
        this.price = price;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Long getUsersId() {
        return usersId;
    }

    public void setUsersId(Long usersId) {
        this.usersId = usersId;
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
}
