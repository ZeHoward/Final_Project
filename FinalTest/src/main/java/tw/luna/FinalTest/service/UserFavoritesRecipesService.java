package tw.luna.FinalTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tw.luna.FinalTest.dto.FavoritesRecipeDTO;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.ProductImage;
import tw.luna.FinalTest.model.Recipes;
import tw.luna.FinalTest.model.UserFavoritesRecipes;
import tw.luna.FinalTest.repository.ProductRepository;
import tw.luna.FinalTest.repository.RecipesRepository;
import tw.luna.FinalTest.repository.UserFavoritesRecipesRepository;

import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserFavoritesRecipesService {

    @Autowired
    private UserFavoritesRecipesRepository repository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RecipesRepository recipesRepository;

    public List<UserFavoritesRecipes> getFavoritesByUserId(Long userId) {
        return repository.findByIdUserId(userId);
    }

    public UserFavoritesRecipes addFavorite(Long userId, int recipeId) {
        UserFavoritesRecipes favorite = new UserFavoritesRecipes(userId, recipeId);
        return repository.save(favorite);
    }
//
//    @Transactional
//    public void removeFavorite(Long userId, int recipeId) {
//        repository.deleteByIdUserIdAndIdRecipeId(userId, recipeId);
//    }

    @Transactional
    public void removeFavorite(Long userId, int productId) {
        // 根據 productId 查找對應的 recipeId
        Recipes recipe = recipesRepository.findByProductProductId(productId)
                .orElseThrow(() -> new RuntimeException("Recipe not found for the given productId"));

        int recipeId = recipe.getRecipeId();  // 獲取 recipeId

        // 刪除 UserFavoritesRecipes 中對應的記錄
        repository.deleteByUserIdAndRecipeId(userId, recipeId);
    }

    public Optional<UserFavoritesRecipes> getFavorite(Long userId, int recipeId) {
        return repository.findByIdUserId(userId)
                .stream()
                .filter(favorite -> favorite.getRecipeId() == recipeId)
                .findFirst();
    }

    // 根據 userId 取得用戶收藏的食譜，並且返回產品信息
    public List<FavoritesRecipeDTO> getFavoritesRecipesByUserId(Long userId) {
        List<UserFavoritesRecipes> favorites = repository.findByIdUserId(userId);

        return favorites.stream()
                .map(favorite -> {
                    Optional<Recipes> recipe = recipesRepository.findById(favorite.getRecipeId());
                    if (recipe.isPresent()) {
                        Product product = recipe.get().getProduct();  // 確保 Recipes 對應的 Product 存在
                        if (product != null) {
                            String imageBase64 = encodeImageToBase64(product.getProductImages());
                            return new FavoritesRecipeDTO(product.getProductId(), product.getName(), product.getPrice(), imageBase64);
                        }
                    }
                    return null;
                })
                .filter(Objects::nonNull)  // 過濾掉可能的空值
                .collect(Collectors.toList());
    }


    // 編碼圖片為 Base64
    private String encodeImageToBase64(List<ProductImage> productImages) {
        if (productImages != null && !productImages.isEmpty()) {
            byte[] imageBytes = productImages.get(0).getImage();  // 假設取第一張圖片
            return Base64.getEncoder().encodeToString(imageBytes);
        }
        return null;
    }


    }

