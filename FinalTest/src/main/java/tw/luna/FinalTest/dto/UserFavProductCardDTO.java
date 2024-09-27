package tw.luna.FinalTest.dto;


public class UserFavProductCardDTO {
    private Integer productId;
    private String name;
    private Integer price;
    private String imageBase64;  // Base64 編碼的圖片

    public UserFavProductCardDTO(Integer productId, String name, Integer price, String imageBase64) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.imageBase64 = imageBase64;
    }

    // Getters and Setters
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }
}