package tw.luna.FinalTest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import tw.luna.FinalTest.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	List<Product> findByCategoryCategoryId(Integer categoryId);

	List<Product> findByPriceBetween(Integer minPrice, Integer maxPrice);
	
	// 查詢根據產品類型和分類
    List<Product> findByTypeAndCategory_CategoryId(String type, Integer categoryId);
	
	//模糊查詢
    List<Product> findByNameContaining(String keyword);
    
    List<Product> findByType(String type);
}
