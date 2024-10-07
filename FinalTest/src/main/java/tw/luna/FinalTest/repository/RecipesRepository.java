package tw.luna.FinalTest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tw.luna.FinalTest.dto.ShowRecipeCardDTO;
import tw.luna.FinalTest.model.Recipes;

@Repository
public interface RecipesRepository extends JpaRepository<Recipes, Integer> {
<<<<<<< HEAD
	
	List<Recipes> findByIsDelFalse();
=======

>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5

	// 根據 productId 查找對應的 Recipe
	Optional<Recipes> findByProductProductId(int productId);

	//連表查詢
	@Query("SELECT new tw.luna.FinalTest.dto.ShowRecipeCardDTO(" +
			"r.recipeId, r.title, r.level, c.categoryName, " +
			"r.isDel) " +
			"FROM Recipes r " +
			"JOIN r.product p " +
			"JOIN p.category c ")
	List<ShowRecipeCardDTO> getAllRecipes();
<<<<<<< HEAD
}
=======

	// 自定義查詢方法，僅返回未邏輯刪除的食譜
	List<Recipes> findByIsDelFalse();
}
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
