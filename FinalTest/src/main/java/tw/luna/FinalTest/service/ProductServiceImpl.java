package tw.luna.FinalTest.service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.dto.ProductCardDTO;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.ProductImage;
import tw.luna.FinalTest.model.UserFavoritesProducts;
import tw.luna.FinalTest.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepository;

	@Override
	public List<Product> findAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Optional<Product> findProductById(Integer id) {
		return productRepository.findById(id);
	}

	@Override
	public Product saveProduct(Product product) {
		return productRepository.save(product);
	}

	@Override
	public void deleteProduct(Integer id) {
		 productRepository.deleteById(id);
	}

	@Override
	public List<Product> findProductsByCategory(Integer categoryId) {
		return productRepository.findByCategoryCategoryId(categoryId);
	}

	@Override
	public List<Product> findProductsByPriceRange(Integer minPrice, Integer maxPrice) {
		return productRepository.findByPriceBetween(minPrice, maxPrice);
	}

	@Override
	public List<Product> findProductsByName(String keyword) {
		return productRepository.findByNameContaining(keyword);
	}

	@Override
	public List<Product> saveProductsInBatch(List<Product> products) {
		return productRepository.saveAll(products);
	}

	@Override
	public List<Product> finProductsByType(String type) {
		return productRepository.findByType(type);
	}

	@Override
	public List<Product> findProductsByTypeAndCategory(String type, Integer categoryId) {
		return productRepository.findByTypeAndCategory_CategoryId(type, categoryId);
	}
	
	// 根據 categoryId 獲取對應的商品卡片
	public List<ProductCardDTO> getProductsByCategoryId(Integer categoryId) {
	    List<Product> products = productRepository.findByCategoryCategoryId(categoryId);

	    return products.stream().map(product -> {
	        // 獲取商品的第一張圖片，將其轉換為 Base64
	        String imageBase64 = "";
	        if (product.getImages() != null && !product.getImages().isEmpty()) {
	            ProductImage image = product.getImages().get(0);
	            imageBase64 = Base64.getEncoder().encodeToString(image.getImage());
	        }

	        // 返回 DTO，包含商品的 id、名稱、價格、Base64 編碼的圖片
	        return new ProductCardDTO(product.getProductId(), product.getName(), product.getPrice(), imageBase64);
	    }).collect(Collectors.toList());
	}
}
