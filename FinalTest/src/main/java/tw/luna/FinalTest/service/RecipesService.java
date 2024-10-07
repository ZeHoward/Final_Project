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
<<<<<<< HEAD
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
=======
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
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
			recipe.setSteps(recipeDetails.getSteps());
			recipe.setIngredients(recipeDetails.getIngredients());
			recipe.setNotes(recipeDetails.getNotes());
			recipe.setServings(recipeDetails.getServings());
			recipe.setCookTime(recipeDetails.getCookTime());
<<<<<<< HEAD

			// 保存更新後的食譜
			Recipes updatedRecipe = recipeRepository.save(recipe);

			// 返回更新後的食譜對象和 200 OK
			return ResponseEntity.ok(updatedRecipe);
		} else {
			// 如果未找到對應的食譜，返回 404 Not Found
=======
			recipe.setLevel(recipeDetails.getLevel());
			recipe.setIsDel(recipeDetails.getIsDel());

			Recipes updatedRecipe = recipesRepository.save(recipe);
			return ResponseEntity.ok(updatedRecipe);
		} else {
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
			return ResponseEntity.notFound().build();
		}
	}

<<<<<<< HEAD
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
=======
	// 邏輯刪除食譜
	public void deleteRecipe(Integer id) {
		Optional<Recipes> recipe = recipesRepository.findById(id);

		recipe.ifPresent(r -> {
			r.setIsDel(true);  // 設置邏輯刪除標記
			recipesRepository.save(r);
		});
	}
}
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
