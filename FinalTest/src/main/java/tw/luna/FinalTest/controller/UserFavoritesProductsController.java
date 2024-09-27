package tw.luna.FinalTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tw.luna.FinalTest.dto.UserFavProductCardDTO;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.UserFavoritesProducts;
import tw.luna.FinalTest.service.UserFavoritesProductsService;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites")
public class UserFavoritesProductsController {

    @Autowired
    private UserFavoritesProductsService service;

    @PostMapping("/add")
    public ResponseEntity<UserFavoritesProducts> addFavorite(@RequestParam Long userId, @RequestParam int productId) {
        UserFavoritesProducts favorite = service.addFavorite(userId, productId);
        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam int productId) {
        service.removeFavorite(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<Product> getUserFavorites(@PathVariable Long userId) {
        List<UserFavoritesProducts> favorites = service.getFavoritesByUserId(userId);
        return favorites.stream()
                .map(favorite -> service.getProductDetails(favorite.getProductId()).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    // 根據 userId 獲取收藏的商品
    @GetMapping("/products")
    public List<UserFavProductCardDTO> getFavoriteProducts(@RequestParam Long userId) {
        return service.getFavoriteProductsByUserId(userId);
    }


}

