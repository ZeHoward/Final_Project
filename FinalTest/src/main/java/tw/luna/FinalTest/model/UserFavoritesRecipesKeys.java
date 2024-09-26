package tw.luna.FinalTest.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserFavoritesRecipesKeys {

	private Long userId;
	private Long recipeId;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getRecipeId() {
		return recipeId;
	}
	public void setRecipeId(Long recipeId) {
		this.recipeId = recipeId;
	}
}
