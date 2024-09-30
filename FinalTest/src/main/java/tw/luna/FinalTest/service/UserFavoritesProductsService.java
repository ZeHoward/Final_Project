package tw.luna.FinalTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import tw.luna.FinalTest.dto.UserFavProductCardDTO;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.ProductImage;
import tw.luna.FinalTest.model.UserFavoritesProducts;
import tw.luna.FinalTest.repository.ProductRepository;
import tw.luna.FinalTest.repository.UserFavoritesProductsRepository;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

                // 獲取商品的第一張圖片，將其轉換為 Base64
                String imageBase64 = "";
                if (product.getProductImages() != null && !product.getProductImages().isEmpty()) {
                    ProductImage image = product.getProductImages().get(0);
                    imageBase64 = Base64.getEncoder().encodeToString(image.getImage());
                }

                // 返回 DTO，包含商品的 id、名稱、價格、Base64 編碼的圖片
                return new UserFavProductCardDTO(product.getProductId(), product.getName(), product.getPrice(), imageBase64);
            }
            return null;
        }).filter(UserFavProductCardDTO -> UserFavProductCardDTO != null).collect(Collectors.toList());
    }
}
