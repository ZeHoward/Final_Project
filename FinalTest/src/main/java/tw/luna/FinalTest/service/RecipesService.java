package tw.luna.FinalTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tw.luna.FinalTest.dto.RecipeDTO;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.Recipes;
import tw.luna.FinalTest.repository.ProductRepository;
import tw.luna.FinalTest.repository.RecipesRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class RecipesService {

	@Autowired
	private RecipesRepository recipesRepository;

	@Autowired
	private ProductRepository productRepository;

	// 獲取所有未刪除的食譜
	public List<Recipes> getAllRecipes() {
		return recipesRepository.findByIsDelFalse();
	}

	// 根據 ID 獲取單個食譜
	public ResponseEntity<Recipes> getRecipeById(Integer id) {
		Optional<Recipes> recipe = recipesRepository.findById(id);
		return recipe.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// 新增食譜
	public Recipes createRecipe(RecipeDTO recipeDTO) {
		Product product = productRepository.findById(recipeDTO.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("產品未找到，無法創建食譜"));

		Recipes recipe = new Recipes();
		recipe.setTitle(recipeDTO.getTitle());
		recipe.setSteps(recipeDTO.getSteps());
		recipe.setIngredients(recipeDTO.getIngredients());
		recipe.setNotes(recipeDTO.getNotes());
		recipe.setServings(recipeDTO.getServings());
		recipe.setCookTime(recipeDTO.getCookTime());
		recipe.setLevel(recipeDTO.getLevel());
		recipe.setIsDel(false);
		recipe.setProduct(product);

		return recipesRepository.save(recipe);
	}

	// 更新食譜
	public Recipes updateRecipe(Integer id, RecipeDTO recipeDTO) {
		Recipes existingRecipe = recipesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("更新失敗，未找到該食譜"));

		existingRecipe.setTitle(recipeDTO.getTitle());
		existingRecipe.setSteps(recipeDTO.getSteps());
		existingRecipe.setIngredients(recipeDTO.getIngredients());
		existingRecipe.setNotes(recipeDTO.getNotes());
		existingRecipe.setServings(recipeDTO.getServings());
		existingRecipe.setCookTime(recipeDTO.getCookTime());
		existingRecipe.setLevel(recipeDTO.getLevel());
		existingRecipe.setIsDel(recipeDTO.getIsDel());

		return recipesRepository.save(existingRecipe);
	}

	// 邏輯刪除食譜
	public Recipes deleteRecipe(Integer id) {
		Recipes existingRecipe = recipesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("刪除失敗，未找到該食譜"));

		existingRecipe.setIsDel(true);
		return recipesRepository.save(existingRecipe);
	}

	// 根據產品 ID 查詢食譜
	public Map<String, Object> getRecipesByProductId(Integer productId) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("產品未找到，無法查詢食譜"));

		List<Recipes> recipes = recipesRepository.findByProduct_ProductIdAndIsDelFalse(productId);

		List<RecipeDTO> recipeDTOs = recipes.stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());

		return Map.of(
				"recipes", recipeDTOs,
				"message", "成功獲取食譜列表",
				"productName", product.getName()
		);
	}

	// 將 Recipes 實體轉換為 RecipeDTO
	private RecipeDTO convertToDTO(Recipes recipe) {
		RecipeDTO dto = new RecipeDTO();
		dto.setRecipeId(recipe.getRecipeId());
		dto.setTitle(recipe.getTitle());
		dto.setSteps(recipe.getSteps());
		dto.setIngredients(recipe.getIngredients());
		dto.setNotes(recipe.getNotes());
		dto.setServings(recipe.getServings());
		dto.setCookTime(recipe.getCookTime());
		dto.setLevel(recipe.getLevel());
		dto.setIsDel(recipe.getIsDel());
		dto.setProductId(recipe.getProduct() != null ? recipe.getProduct().getProductId() : null);
		return dto;
	}
}
