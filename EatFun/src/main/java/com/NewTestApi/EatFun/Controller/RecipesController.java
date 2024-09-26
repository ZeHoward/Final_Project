package com.NewTestApi.EatFun.Controller;


import java.util.List;

import com.NewTestApi.EatFun.Entity.Recipes;
import com.NewTestApi.EatFun.Service.RecipesService;
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

@RestController
@RequestMapping("/api/recipes")
public class RecipesController {

    @Autowired
    private RecipesService recipeService;

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
    }
}
