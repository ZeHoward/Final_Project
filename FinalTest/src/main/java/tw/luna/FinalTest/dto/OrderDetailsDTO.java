package tw.luna.FinalTest.dto;

import tw.luna.FinalTest.model.OrderDetails;

public class OrderDetailsDTO {
    private String productImageBase64;
    private String productName;
    private String sku;
    private Integer quantity;
    private Integer price;
    private Integer total;
    private Integer productId;
    
    public OrderDetailsDTO() {
    }

    public OrderDetailsDTO(String productName, String sku, Integer quantity, Integer price, Integer productId) {
        this.productName = productName;
        this.sku = sku;
        this.quantity = quantity;
        this.price = price;
        this.productId = productId;
        this.total = quantity * price;  
    }

    public static OrderDetailsDTO convertToOrderDetailsDTO(OrderDetails detail) {
        return new OrderDetailsDTO(
            detail.getProduct().getName(),
            detail.getProduct().getSku(),
            detail.getQuantity(),
            detail.getPrice(),
            detail.getProduct().getProductId()
        );
    }

    @Override
    public String toString() {
        return "OrderDetailsDTO{" +
                "productName='" + productName + '\'' +
                ", sku='" + sku + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", total=" + total +
                ", productId=" + productId +
                '}';
    }


	public String getProductImageBase64() {
        return productImageBase64;
    }

    public void setProductImageBase64(String productImageBase64) {
        this.productImageBase64 = productImageBase64;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
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

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getProductId() {  
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }
}