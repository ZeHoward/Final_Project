package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Optional;

import tw.luna.FinalTest.dto.ProductCardDTO;
import tw.luna.FinalTest.model.Product;

public interface ProductService {
	//查詢所有產品
	List<Product> findAllProducts();
	
	//根據ID查詢所有產品
	Optional<Product> findProductById(Integer id);
	
	// 新增或更新產品
	Product saveProduct(Product product);
	
	//刪除產品
	void deleteProduct(Integer id);
	
	// 根據類別查詢產品(家常料理、兒童友善、銀髮友善、多人料理、異國料理)
	List<Product> findProductsByCategory(Integer categoryId);
	
	//根據產品類型查詢商品(生鮮食材包、調理包)
	List<Product>finProductsByType(String type);
	
	//
	List<Product>findProductsByTypeAndCategory(String type, Integer categoryId);
	
	// 根據價格範圍查詢產品
    List<Product> findProductsByPriceRange(Integer minPrice, Integer maxPrice);
    
    //模糊查詢產品名稱
    List<Product> findProductsByName(String keyword);
    
    //批次新增產品
    List<Product> saveProductsInBatch(List<Product> products);

	List<ProductCardDTO> getProductsByCategoryId(Integer categoryId);
    
}
