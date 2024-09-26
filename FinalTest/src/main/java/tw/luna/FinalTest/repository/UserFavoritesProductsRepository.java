package tw.luna.FinalTest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.luna.FinalTest.model.UserFavoritesProducts;
import tw.luna.FinalTest.model.UserFavoritesProductsId;

import java.util.List;

public interface UserFavoritesProductsRepository extends JpaRepository<UserFavoritesProducts, UserFavoritesProductsId> {

    // 使用嵌入式鍵 id 來查詢 userId
    List<UserFavoritesProducts> findByIdUserId(Long userId);

    List<UserFavoritesProducts> findByIdProductId(int productId);
    // 刪除操作也需要通過 id 屬性
    void deleteByIdUserIdAndIdProductId(Long userId, int productId);
}
