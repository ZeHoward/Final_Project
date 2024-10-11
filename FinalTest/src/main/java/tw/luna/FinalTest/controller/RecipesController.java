package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw.luna.FinalTest.dto.RecipeDTO;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.Recipes;
import tw.luna.FinalTest.service.ProductService;
import tw.luna.FinalTest.service.RecipesService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/recipes")
public class RecipesController {

	@Autowired
	private RecipesService recipeService;

	@PostMapping("/create")
	public ResponseEntity<Map<String, Object>> createRecipe(@RequestBody RecipeDTO recipeDTO) {
		Recipes savedRecipe = recipeService.createRecipe(recipeDTO);
		return new ResponseEntity<>(Map.of(
				"message", "食譜創建成功",
				"recipe", convertToRecipeDTO(savedRecipe)
		), HttpStatus.CREATED);
	}

	@GetMapping("/list")
	public ResponseEntity<Map<String, Object>> getAllRecipes() {
		List<Recipes> recipes = recipeService.getAllRecipes();
		return new ResponseEntity<>(Map.of(
				"message", "查詢成功，共找到 " + recipes.size() + " 個食譜",
				"recipes", recipes.stream().map(this::convertToRecipeDTO).collect(Collectors.toList())
		), HttpStatus.OK);
	}

	@GetMapping("/view")
	public ResponseEntity<Map<String, Object>> getRecipeById(@RequestParam("id") Integer recipeId) {
		Recipes recipe = recipeService.getRecipeById(recipeId).getBody();
		if (recipe == null) {
			return new ResponseEntity<>(Map.of(
					"message", "未找到該食譜，請檢查 ID 是否正確"
			), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(Map.of(
				"message", "食譜查詢成功",
				"recipe", convertToRecipeDTO(recipe)
		), HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<Map<String, Object>> updateRecipe(
			@RequestParam("id") Integer recipeId, @RequestBody RecipeDTO recipeDTO) {
		Recipes updatedRecipe = recipeService.updateRecipe(recipeId, recipeDTO);
		return new ResponseEntity<>(Map.of(
				"message", "食譜更新成功",
				"recipe", convertToRecipeDTO(updatedRecipe)
		), HttpStatus.OK);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<Map<String, Object>> deleteRecipe(@RequestParam("id") Integer recipeId) {
		Recipes deletedRecipe = recipeService.deleteRecipe(recipeId);
		return new ResponseEntity<>(Map.of(
				"message", "食譜刪除成功",
				"recipe", convertToRecipeDTO(deletedRecipe)
		), HttpStatus.OK);
	}

	@GetMapping("/by-product/{productId}")
	public ResponseEntity<?> getRecipesByProductId(@PathVariable Integer productId) {
		Map<String, Object> result = recipeService.getRecipesByProductId(productId);
		return ResponseEntity.ok(result);
	}

	private RecipeDTO convertToRecipeDTO(Recipes recipe) {
		RecipeDTO recipeDTO = new RecipeDTO();
		recipeDTO.setRecipeId(recipe.getRecipeId());
		recipeDTO.setTitle(recipe.getTitle());
		recipeDTO.setSteps(recipe.getSteps());
		recipeDTO.setIngredients(recipe.getIngredients());
		recipeDTO.setNotes(recipe.getNotes());
		recipeDTO.setServings(recipe.getServings());
		recipeDTO.setCookTime(recipe.getCookTime());
		recipeDTO.setLevel(recipe.getLevel());
		recipeDTO.setIsDel(recipe.getIsDel());
		recipeDTO.setProductId(recipe.getProduct() != null ? recipe.getProduct().getProductId() : null);
		return recipeDTO;
	}
}
