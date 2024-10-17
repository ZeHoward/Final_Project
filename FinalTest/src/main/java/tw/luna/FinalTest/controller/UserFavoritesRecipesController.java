package tw.luna.FinalTest.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tw.luna.FinalTest.dto.FavoritesRecipeDTO;
import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.UserFavoritesRecipes;
import tw.luna.FinalTest.service.UserFavoritesRecipesService;

import java.util.List;

@RestController
@RequestMapping("/api/favorites/recipes")
public class UserFavoritesRecipesController {

    @Autowired
    private UserFavoritesRecipesService service;

    @Autowired
    private HttpSession session;

    @GetMapping("/getUserId")
    public ResponseEntity<Long> getUserId() {
        UserAllInfo loggedInUser = (UserAllInfo) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return ResponseEntity.status(401).body(null);
        }

        Long userId = loggedInUser.getUserId();
        return ResponseEntity.ok(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<UserFavoritesRecipes> addFavorite(@RequestParam Long userId, @RequestParam int recipeId) {
        UserFavoritesRecipes favorite = service.addFavorite(userId, recipeId);
        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam int productId) {
        service.removeFavorite(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/removeByRecipeId")
    public ResponseEntity<Void> removeFavoriteByRecipeId(@RequestParam Long userId, @RequestParam int recipeId) {
        service.removeFavoriteByRecipeId(userId, recipeId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
    public ResponseEntity<List<FavoritesRecipeDTO>> getFavoritesRecipesByUserId(@RequestParam Long userId) {
        List<FavoritesRecipeDTO> favorites = service.getFavoritesRecipesByUserId(userId);
        return ResponseEntity.ok(favorites);
    }
}
