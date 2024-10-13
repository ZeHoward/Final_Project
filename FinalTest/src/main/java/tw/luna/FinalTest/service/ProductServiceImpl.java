package tw.luna.FinalTest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.luna.FinalTest.dto.ProductCreateDTO;
import tw.luna.FinalTest.dto.ProductUpdateDTO;
import tw.luna.FinalTest.model.Category;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.repository.CategoryRepository;
import tw.luna.FinalTest.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<Product> findAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Optional<Product> findProductById(Integer id) {
		return productRepository.findById(id);
	}

	@Override
	public Product createProduct(ProductCreateDTO productDTO) {
		Product newProduct = new Product();
		newProduct.setName(productDTO.getName());
		newProduct.setType(productDTO.getType());
		newProduct.setSku(productDTO.getSku());
		newProduct.setDescription(productDTO.getDescription());
		newProduct.setPrice(productDTO.getPrice());
		newProduct.setStockQuantity(productDTO.getStockQuantity());
		newProduct.setIsDel(false); // 設置默認值

		Category category = categoryRepository.findById(productDTO.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));
		newProduct.setCategory(category);

		return productRepository.save(newProduct);
	}

	@Override
	public Product updateProduct(Integer id, ProductUpdateDTO productDTO) {
		Product existingProduct = productRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Product not found"));

		existingProduct.setName(productDTO.getName());
		existingProduct.setType(productDTO.getType());
		existingProduct.setDescription(productDTO.getDescription());
		existingProduct.setPrice(productDTO.getPrice());
		existingProduct.setStockQuantity(productDTO.getStockQuantity());

		Category category = categoryRepository.findById(productDTO.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));
		existingProduct.setCategory(category);

		return productRepository.save(existingProduct);
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
}
