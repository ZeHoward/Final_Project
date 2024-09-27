package tw.luna.FinalTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.luna.FinalTest.model.UserFavoritesRecipes;
import tw.luna.FinalTest.repository.UserFavoritesRecipesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserFavoritesRecipesService {

    @Autowired
    private UserFavoritesRecipesRepository repository;

    public List<UserFavoritesRecipes> getFavoritesByUserId(Long userId) {
        return repository.findByIdUserId(userId);
    }

    public UserFavoritesRecipes addFavorite(Long userId, int recipeId) {
        UserFavoritesRecipes favorite = new UserFavoritesRecipes(userId, recipeId);
        return repository.save(favorite);
    }

    public void removeFavorite(Long userId, int recipeId) {
        repository.deleteByIdUserIdAndIdRecipeId(userId, recipeId);
    }

    public Optional<UserFavoritesRecipes> getFavorite(Long userId, int recipeId) {
        return repository.findByIdUserId(userId)
                .stream()
                .filter(favorite -> favorite.getRecipeId() == recipeId)
                .findFirst();
    }
}
