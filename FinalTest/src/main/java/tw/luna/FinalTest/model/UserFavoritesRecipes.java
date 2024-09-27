package tw.luna.FinalTest.model;

//import com.fasterxml.jackson.annotation.JsonBackReference;
//
//import jakarta.persistence.EmbeddedId;
//import jakarta.persistence.Entity;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.MapsId;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "userfavoritesrecipes")
//public class UserFavoritesRecipes {
//
//	@EmbeddedId
//	private UserFavoritesRecipesKeys id;
//	
//	@JsonBackReference
//	@ManyToOne
//	@JoinColumn(name = "userId")
//	@MapsId("userId")
//	private Users users;
//}

import jakarta.persistence.*;
import tw.luna.FinalTest.model.UserFavoritesRecipesId;

@Entity
@Table(name = "userfavoritesrecipes")
public class UserFavoritesRecipes {

    @EmbeddedId
    private UserFavoritesRecipesId id;

    // Constructors
    public UserFavoritesRecipes() {}

    public UserFavoritesRecipes(UserFavoritesRecipesId id) {
        this.id = id;
    }

    public UserFavoritesRecipes(Long userId, int recipeId) {
        this.id = new UserFavoritesRecipesId(userId, recipeId);
    }

    // Getters and Setters
    public UserFavoritesRecipesId getId() {
        return id;
    }

    public void setId(UserFavoritesRecipesId id) {
        this.id = id;
    }

    public Long getUserId() {
        return id.getUserId();
    }

    public int getRecipeId() {
        return id.getRecipeId();
    }
}

