package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw.luna.FinalTest.dto.ShowRecipeCardDTO;
import tw.luna.FinalTest.service.RecipesService;
import tw.luna.FinalTest.service.ShowRecipeCardService;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class ShowRecipeCardController {

    @Autowired
    private ShowRecipeCardService showRecipeCardService;

    // 食譜頁面查詢所有食譜
    @GetMapping("/all")
    public ResponseEntity<List<ShowRecipeCardDTO>> getAllRecipes() {
        List<ShowRecipeCardDTO> recipes = showRecipeCardService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    // 根據類別查詢食譜
//    @GetMapping("/category/{categoryId}")
//    public ResponseEntity<List<ShowRecipeCardDTO>> getRecipesByCategory(@PathVariable int categoryId) {
//        List<ShowRecipeCardDTO> recipes = service.getRecipesByCategory(categoryId);
//        return ResponseEntity.ok(recipes);
//    }
}
