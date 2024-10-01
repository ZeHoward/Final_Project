package tw.luna.FinalTest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tw.luna.FinalTest.model.UserFavoritesRecipes;
import tw.luna.FinalTest.model.UserFavoritesRecipesId;

import java.util.List;

@Repository
public interface UserFavoritesRecipesRepository extends JpaRepository<UserFavoritesRecipes, UserFavoritesRecipesId> {

    List<UserFavoritesRecipes> findByIdUserId(Long userId);

    void deleteByIdUserIdAndIdRecipeId(Long userId, int recipeId);

//    void deleteByUserIdAndProductId(Long userId, int productId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserFavoritesRecipes u WHERE u.id.userId = :userId AND u.id.recipeId = :recipeId")
    void deleteByUserIdAndRecipeId(Long userId, int recipeId);
}

