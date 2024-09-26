package tw.luna.FinalTest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.luna.FinalTest.model.ProductImage;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    // 查找與某個商品 ID 相關的所有圖片
    List<ProductImage> findByProductProductId(Integer productId);
}
