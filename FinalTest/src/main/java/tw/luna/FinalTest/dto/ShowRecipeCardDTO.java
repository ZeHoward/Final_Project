package tw.luna.FinalTest.dto;

public class ShowRecipeCardDTO {
    private Integer recipeId; // recipe
    private String title; //recipe
    private String level; //recipe
    private String categoryName; //category
    private Boolean isDel;

    public ShowRecipeCardDTO() {
    }

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }


    public Boolean getDel() {
        return isDel;
    }

    public void setDel(Boolean del) {
        isDel = del;
    }

    public ShowRecipeCardDTO(Integer recipeId, String title, String level, String categoryName, Boolean isDel) {
        this.recipeId = recipeId;
        this.title = title;
        this.level = level;
        this.categoryName = categoryName;
        this.isDel = isDel;
    }
}