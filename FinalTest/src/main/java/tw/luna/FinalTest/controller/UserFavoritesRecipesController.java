package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw.luna.FinalTest.model.UserFavoritesRecipes;
import tw.luna.FinalTest.service.UserFavoritesRecipesService;
import tw.luna.FinalTest.Dto.FavoritesRecipeDTO;


import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites/recipes")
public class UserFavoritesRecipesController {

    @Autowired
    private UserFavoritesRecipesService service;

    @PostMapping("/add")
    public ResponseEntity<UserFavoritesRecipes> addFavorite(@RequestParam Long userId, @RequestParam int recipeId) {
        UserFavoritesRecipes favorite = service.addFavorite(userId, recipeId);
        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam int recipeId) {
        service.removeFavorite(userId, recipeId);
        return ResponseEntity.noContent().build();
    }


    // 根據 userId 返回收藏的食譜
    @GetMapping("/user")
    public ResponseEntity<List<FavoritesRecipeDTO>> getFavoritesRecipesByUserId(@RequestParam
                                                                                    Long userId) {
        List<FavoritesRecipeDTO> favorites = service.getFavoritesRecipesByUserId(userId);
        return ResponseEntity.ok(favorites);
    }

}
