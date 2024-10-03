package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tw.luna.FinalTest.dto.UserFavProductCardDTO;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.ProductImage;
import tw.luna.FinalTest.model.UserFavoritesProducts;
import tw.luna.FinalTest.repository.ProductRepository;
import tw.luna.FinalTest.repository.UserFavoritesProductsRepository;

@Service
public class UserFavoritesProductsService {

    @Autowired
    private UserFavoritesProductsRepository repository;

    @Autowired
    private ProductRepository productRepository;

    public List<UserFavoritesProducts> getFavoritesByUserId(Long userId) {
        return repository.findByIdUserId(userId);
    }

    public UserFavoritesProducts addFavorite(Long userId, int productId) {
        UserFavoritesProducts favorite = new UserFavoritesProducts(userId, productId);
        return repository.save(favorite);
    }

    @Transactional
    public void removeFavorite(Long userId, int productId) {
        repository.deleteByIdUserIdAndIdProductId(userId, productId);
    }

    public Optional<UserFavoritesProducts> getFavorite(Long userId, int productId) {
        return repository.findByIdUserId(userId)
                .stream()
                .filter(favorite -> favorite.getProductId() == productId)
                .findFirst();
    }

    public Optional<Product> getProductDetails(int productId) {
        return productRepository.findById(productId);
    }

    // 根據 userId 獲取收藏的商品卡片
    public List<UserFavProductCardDTO> getFavoriteProductsByUserId(Long userId) {
        List<UserFavoritesProducts> favorites = repository.findByIdUserId(userId);

        return favorites.stream().map(favorite -> {
            Optional<Product> productOpt = productRepository.findById(favorite.getProductId());

            if (productOpt.isPresent()) {
                Product product = productOpt.get();

                // 獲取商品的第一張圖片的 S3 URL
                String imageUrl = getProductImageUrl(product.getProductImages());

                // 返回 DTO，包含商品的 id、名稱、價格、S3 URL
                return new UserFavProductCardDTO(product.getProductId(), product.getName(), product.getPrice(), imageUrl);
            }
            return null;
        }).filter(Objects::nonNull).collect(Collectors.toList());
    }

    // 獲取產品的第一張圖片的 S3 URL
    private String getProductImageUrl(List<ProductImage> productImages) {
        if (productImages != null && !productImages.isEmpty()) {
            return productImages.get(0).getImage();  // 假設取第一張圖片，該字段存儲的是 S3 URL
        }
        return null;
    }
}

