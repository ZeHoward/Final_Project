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

	@Autowired
	private ProductService productService;

	@PostMapping("/create")
	public ResponseEntity<Map<String, Object>> createRecipe(@RequestBody RecipeDTO recipeDTO) {
		Map<String, Object> response = new HashMap<>();

		Optional<Product> productOptional = productService.findProductById(recipeDTO.getProductId());
		if (!productOptional.isPresent()) {
			response.put("message", "產品未找到，無法創建食譜");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}

		Product product = productOptional.get();
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

		Recipes savedRecipe = recipeService.saveRecipe(recipe);
		response.put("message", "食譜創建成功");
		response.put("recipe", convertToRecipeDTO(savedRecipe));
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	// 查詢所有食譜
	@GetMapping("/list")
	public ResponseEntity<Map<String, Object>> getAllRecipes() {
		List<Recipes> recipes = recipeService.getAllRecipes();
		Map<String, Object> response = new HashMap<>();
		response.put("message", "查詢成功，共找到 " + recipes.size() + " 個食譜");
		response.put("recipes", recipes.stream().map(this::convertToRecipeDTO).collect(Collectors.toList()));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/view")
	public ResponseEntity<Map<String, Object>> getRecipeById(@RequestParam("id") Integer recipeId) {
	    Map<String, Object> response = new HashMap<>();
	    Recipes recipe = recipeService.getRecipeById(recipeId).getBody();

	    if (recipe == null) {
	        response.put("message", "未找到該食譜，請檢查 ID 是否正確");
	        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	    }

	    response.put("message", "食譜查詢成功");
	    response.put("recipe", convertToRecipeDTO(recipe));
	    return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 查詢單個食譜
//	@PostMapping("/view")
//	public ResponseEntity<Map<String, Object>> getRecipeById(@RequestParam("id") Integer recipeId) {
//		Map<String, Object> response = new HashMap<>();
//		Recipes recipe = recipeService.getRecipeById(recipeId).getBody();
//
//		if (recipe == null) {
//			response.put("message", "未找到該食譜，請檢查 ID 是否正確");
//			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
//		}
//
//		response.put("message", "食譜查詢成功");
//		response.put("recipe", convertToRecipeDTO(recipe));
//		return new ResponseEntity<>(response, HttpStatus.OK);
//	}

	// 更新食譜
	@PutMapping("/update")
	public ResponseEntity<Map<String, Object>> updateRecipe(
			@RequestParam("id") Integer recipeId,
			@RequestBody RecipeDTO recipeDTO) {
		Map<String, Object> response = new HashMap<>();
		Recipes existingRecipe = recipeService.getRecipeById(recipeId).getBody();

		if (existingRecipe == null) {
			response.put("message", "更新失敗，未找到該食譜");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}

		existingRecipe.setTitle(recipeDTO.getTitle());
		existingRecipe.setSteps(recipeDTO.getSteps());
		existingRecipe.setIngredients(recipeDTO.getIngredients());
		existingRecipe.setNotes(recipeDTO.getNotes());
		existingRecipe.setServings(recipeDTO.getServings());
		existingRecipe.setCookTime(recipeDTO.getCookTime());
		existingRecipe.setLevel(recipeDTO.getLevel());
		existingRecipe.setIsDel(recipeDTO.getIsDel());

		Recipes updatedRecipe = recipeService.saveRecipe(existingRecipe);
		response.put("message", "食譜更新成功");
		response.put("recipe", convertToRecipeDTO(updatedRecipe));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<Map<String, Object>> deleteRecipe(@RequestParam("id") Integer recipeId) {
		Map<String, Object> response = new HashMap<>();
		Recipes existingRecipe = recipeService.getRecipeById(recipeId).getBody();

		if (existingRecipe == null) {
			response.put("message", "刪除失敗，未找到該食譜");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}

		existingRecipe.setIsDel(true);  // 將 isDel 設置為 true 表示邏輯刪除
		Recipes deletedRecipe = recipeService.saveRecipe(existingRecipe);  // 保存更新後的實體

		// 調試輸出
		System.out.println("已成功設置 isDel 為 true，食譜 ID: " + recipeId);

		response.put("message", "食譜刪除成功");
		response.put("recipe", convertToRecipeDTO(deletedRecipe));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/by-product/{productId}")
	public ResponseEntity<?> getRecipesByProductId(@PathVariable Integer productId) {
		if (productId == null || productId <= 0) {
			return ResponseEntity.badRequest().body(Map.of("message", "無效的產品ID"));
		}

		try {
			Map<String, Object> result = recipeService.getRecipesByProductId(productId);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "獲取食譜列表時發生錯誤"));
		}
	}

	// 新增方法來轉換 Recipes 到 RecipeDTO
	public RecipeDTO convertToRecipeDTO(Recipes recipe) {
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
		if (recipe.getProduct() != null) {
			recipeDTO.setProductId(recipe.getProduct().getProductId());
		}
		return recipeDTO;
	}
}
