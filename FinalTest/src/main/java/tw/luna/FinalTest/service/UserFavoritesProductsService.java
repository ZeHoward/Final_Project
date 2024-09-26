package tw.luna.FinalTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.UserFavoritesProducts;
import tw.luna.FinalTest.repository.ProductRepository;
import tw.luna.FinalTest.repository.UserFavoritesProductsRepository;

import java.util.List;
import java.util.Optional;

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
}
