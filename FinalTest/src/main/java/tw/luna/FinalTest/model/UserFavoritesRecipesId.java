package tw.luna.FinalTest.model;

import jakarta.persistence.Embeddable;

import jakarta.persistence.*;
import java.io.Serializable;

@Embeddable
public class UserFavoritesRecipesId  implements Serializable {

    @Column(name = "userId")
    private Long userId;

    @Column(name = "recipeId")
    private int recipeId;

    // Constructors
    public UserFavoritesRecipesId() {}

    public UserFavoritesRecipesId(Long userId, int recipeId) {
        this.userId = userId;
        this.recipeId = recipeId;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    // hashCode and equals methods (required for @Embeddable)
    @Override
    public int hashCode() {
        return (int)(userId + recipeId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        UserFavoritesRecipesId that = (UserFavoritesRecipesId) obj;
        return userId.equals(that.userId) && recipeId == that.recipeId;
    }
}