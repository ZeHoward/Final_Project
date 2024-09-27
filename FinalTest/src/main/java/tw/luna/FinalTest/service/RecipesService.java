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
	private RecipesRepository recipeRepository;

	public List<Recipes> getAllRecipes() {
		// 查找所有未刪除的食譜
		return recipeRepository.findByIsDelFalse();
	}

	// 根據 ID 獲取單個食譜
	public ResponseEntity<Object> getRecipeById(Integer id) {
	    Recipes recipe = recipeRepository.findById(id).orElse(null);

	    if (recipe != null) {
	        System.out.println("找到的食譜: " + recipe.getTitle());
	        return ResponseEntity.ok(recipe);
	    } else {
	        // 只返回簡單的錯誤消息
	        String errorMessage = "未找到對應的食譜";

	        // 返回簡單的錯誤信息和 404 狀態碼
	        return ResponseEntity.status(404).body(errorMessage);
	    }
	}


	// 更新食譜
	public ResponseEntity<Recipes> updateRecipe(Integer id, Recipes recipeDetails) {
		Recipes recipe = recipeRepository.findById(id).orElse(null);

		if (recipe != null) {
			// 更新食譜的屬性
			recipe.setTitle(recipeDetails.getTitle());
			recipe.setProduct(recipeDetails.getProduct());
			recipe.setSteps(recipeDetails.getSteps());
			recipe.setIngredients(recipeDetails.getIngredients());
			recipe.setNotes(recipeDetails.getNotes());
			recipe.setServings(recipeDetails.getServings());
			recipe.setCookTime(recipeDetails.getCookTime());

			// 保存更新後的食譜
			Recipes updatedRecipe = recipeRepository.save(recipe);

			// 返回更新後的食譜對象和 200 OK
			return ResponseEntity.ok(updatedRecipe);
		} else {
			// 如果未找到對應的食譜，返回 404 Not Found
			return ResponseEntity.notFound().build();
		}
	}

	public Recipes saveRecipe(Recipes recipe) {
		return recipeRepository.save(recipe);
	}

	public void deleteRecipe(Integer id) {
		// 使用邏輯刪除標記來標記食譜已刪除
		Optional<Recipes> recipe = recipeRepository.findById(id);
		if (recipe.isPresent()) {
			Recipes r = recipe.get();
			r.setIsDel(true); // 設置為已刪除
			recipeRepository.save(r);
		}
	}
}
