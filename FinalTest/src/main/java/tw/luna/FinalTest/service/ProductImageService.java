package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Optional;

import tw.luna.FinalTest.model.ProductImage;

public interface ProductImageService {
	List<ProductImage> findAllImages();

	Optional<ProductImage> findProductImageById(Long id);

	ProductImage saveProductImage(ProductImage productImage);

	void deleteProductImage(Long id);
	
	List<ProductImage>getImagesByProductId(Integer productId);
}
