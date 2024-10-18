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
    // 根據 userId 取得用戶收藏的食譜，並且返回食譜信息
    public List<FavoritesRecipeDTO> getFavoritesRecipesByUserId(Long userId) {
        List<UserFavoritesRecipes> favorites = repository.findByIdUserId(userId);

        return favorites.stream()
                .map(favorite -> {
                    Optional<Recipes> recipe = recipesRepository.findById(favorite.getRecipeId());
                    if (recipe.isPresent()) {
                        Product product = recipe.get().getProduct();
                        String imageUrl = product != null ? getProductImageUrl(product.getProductImages()) : null;

                        // 使用食譜的 title 作為名稱
                        return new FavoritesRecipeDTO(
                                product != null ? product.getProductId() : 0,
                                recipe.get().getRecipeId(),
                                recipe.get().getTitle(),  // 使用食譜名稱
                                product != null ? product.getPrice() : 0,
                                imageUrl
                        );
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeFavoriteByRecipeId(Long userId, int recipeId) {
        // 驗證 recipeId 是否存在
        if (!recipesRepository.existsById(recipeId)) {
            throw new RuntimeException("Recipe not found for the given recipeId");
        }

        // 刪除 UserFavoritesRecipes 中對應的記錄
        repository.deleteByUserIdAndRecipeId(userId, recipeId);
    }



    // 獲取產品的第一張圖片的 S3 URL
    private String getProductImageUrl(List<ProductImage> productImages) {
        if (productImages != null && !productImages.isEmpty()) {
            return productImages.get(0).getImage();  // 假設取第一張圖片，該字段存儲的是 S3 URL
        }
        return null;
    }
}


