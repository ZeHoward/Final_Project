package tw.luna.FinalTest.controller;

import java.util.List;
<<<<<<< HEAD

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tw.luna.FinalTest.dto.ShowRecipeCardDTO;
import tw.luna.FinalTest.model.Recipes;
import tw.luna.FinalTest.service.RecipesService;
import tw.luna.FinalTest.service.ShowRecipeCardService;
=======
import java.util.Optional;
import java.util.stream.Collectors;

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
import java.util.Map;
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5

@RestController
@RequestMapping("/api/recipes")
public class RecipesController {

	@Autowired
	private RecipesService recipeService;

	@Autowired
<<<<<<< HEAD
	ShowRecipeCardService showRecipeCardService;

	@GetMapping("/recipe")
	public List<ShowRecipeCardDTO> showRecipeCardDTOList () {
		List<ShowRecipeCardDTO> recipeCardDTOList = showRecipeCardService.getAllRecipes();
		return recipeCardDTOList;
	}


	// 獲取所有未刪除的食譜
	@GetMapping
	public List<Recipes> getAllRecipes() {
		return recipeService.getAllRecipes();
	}

	// 根據 ID 獲取單個食譜
	@GetMapping("/{id}")
	public ResponseEntity<Object> getRecipeById(@PathVariable("id") Integer id) {
	    return recipeService.getRecipeById(id);  // 傳入從 @PathVariable 捕獲的 id
	}


	// 新增食譜
	@PostMapping
	public Recipes createRecipe(@RequestBody Recipes recipe) {
		return recipeService.saveRecipe(recipe);
	}

	// 更新食譜
	@PutMapping("/{id}")
	public ResponseEntity<Recipes> updateRecipe(@PathVariable Integer id, @RequestBody Recipes recipeDetails) {
		return recipeService.updateRecipe(id, recipeDetails);
	}

	// 邏輯刪除食譜
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRecipe(@PathVariable Integer id) {
		recipeService.deleteRecipe(id);
		return ResponseEntity.noContent().build();
=======
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

	// 查詢單個食譜
	@PostMapping("/view")
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
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
	}
}
