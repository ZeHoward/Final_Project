package tw.luna.FinalTest.dto;

public class FavoritesRecipeDTO {
    private int productId;
    private String name;
    private int price;
    private String imageBase64;

    // Constructors, getters and setters
    public FavoritesRecipeDTO(int productId, String name, int price, String imageBase64) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.imageBase64 = imageBase64;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }
}
