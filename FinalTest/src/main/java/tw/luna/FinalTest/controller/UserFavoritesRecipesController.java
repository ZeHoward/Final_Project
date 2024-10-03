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

//    @GetMapping("/getUserId")
//    public long getUserId() {
//        Users loggedInUser = null;
//        if(session != null) {
//            loggedInUser = (Users)session.getAttribute("loggedInUser");
//            if(loggedInUser != null) {
//                System.out.println("在products中獲取UserID:" + loggedInUser.getUserId());
//            }
//        }
//        return loggedInUser.getUserId();
//    }

    @GetMapping("/getUserId")
    public ResponseEntity<Long> getUserId() {
        UserAllInfo loggedInUser = (UserAllInfo) session.getAttribute("loggedInUser");

        // 檢查 loggedInUser 是否為 null
        if (loggedInUser == null) {
            return ResponseEntity.status(401).body(null);  // 401 未授權
        }

        Long userId = loggedInUser.getUserId();
        return ResponseEntity.ok(userId);  // 返回正確的 userId
    }



    @PostMapping("/add")
    public ResponseEntity<UserFavoritesRecipes> addFavorite(@RequestParam Long userId, @RequestParam int recipeId) {
        UserFavoritesRecipes favorite = service.addFavorite(userId, recipeId);
        return ResponseEntity.ok(favorite);
    }

//    @DeleteMapping("/remove")
//    public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam int recipeId) {
//
//        service.removeFavorite(userId, recipeId);
//        return ResponseEntity.noContent().build();
//    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam int productId) {
        // 根據 productId 刪除對應的收藏
        service.removeFavorite(userId, productId);
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
