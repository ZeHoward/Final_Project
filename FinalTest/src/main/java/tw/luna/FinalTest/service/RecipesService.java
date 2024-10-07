package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.model.Recipes;
import tw.luna.FinalTest.repository.RecipesRepository;

@Service
public class RecipesService {

	@Autowired
	private RecipesRepository recipesRepository;

	// 獲取所有未刪除的食譜
	public List<Recipes> getAllRecipes() {
		return recipesRepository.findByIsDelFalse();  // 假設有個自定義方法，只查詢未被刪除的食譜
	}

	// 根據 ID 獲取單個食譜
	public ResponseEntity<Recipes> getRecipeById(Integer id) {
		Optional<Recipes> recipe = recipesRepository.findById(id);
		return recipe.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// 新增食譜
//	@Transactional
	public Recipes saveRecipe(Recipes recipe) {
		// 確保新添加的食譜默認為未刪除
		return recipesRepository.save(recipe);
	}

	// 更新食譜
	public ResponseEntity<Recipes> updateRecipe(Integer id, Recipes recipeDetails) {
		Optional<Recipes> recipeData = recipesRepository.findById(id);

		if (recipeData.isPresent()) {
			Recipes recipe = recipeData.get();
			recipe.setTitle(recipeDetails.getTitle());
			recipe.setSteps(recipeDetails.getSteps());
			recipe.setIngredients(recipeDetails.getIngredients());
			recipe.setNotes(recipeDetails.getNotes());
			recipe.setServings(recipeDetails.getServings());
			recipe.setCookTime(recipeDetails.getCookTime());
			recipe.setLevel(recipeDetails.getLevel());
			recipe.setIsDel(recipeDetails.getIsDel());

			Recipes updatedRecipe = recipesRepository.save(recipe);
			return ResponseEntity.ok(updatedRecipe);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 邏輯刪除食譜
	public void deleteRecipe(Integer id) {
		Optional<Recipes> recipe = recipesRepository.findById(id);

		recipe.ifPresent(r -> {
			r.setIsDel(true);  // 設置邏輯刪除標記
			recipesRepository.save(r);
		});
	}
}