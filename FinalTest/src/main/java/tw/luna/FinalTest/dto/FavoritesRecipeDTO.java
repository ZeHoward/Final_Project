package tw.luna.FinalTest.dto;

public class FavoritesRecipeDTO {
    private int productId;
    private int recipeId;
    private String name;
    private int price;
    private String imageUrl;

    // 更新构造函数，包含 recipeId
    public FavoritesRecipeDTO(int productId, int recipeId, String name, int price, String imageUrl) {
        this.productId = productId;
        this.recipeId = recipeId;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    // Getter 和 Setter 方法
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
