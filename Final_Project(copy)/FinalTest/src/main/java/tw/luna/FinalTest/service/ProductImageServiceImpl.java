package tw.luna.FinalTest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.model.ProductImage;
import tw.luna.FinalTest.repository.ProductImageRepository;
@Service
public class ProductImageServiceImpl implements ProductImageService {
	@Autowired
	private ProductImageRepository productImageRepository;
	
	
	@Override
	public List<ProductImage> findAllImages() {
		return productImageRepository.findAll();
	}

	@Override
	public Optional<ProductImage> findProductImageById(Long id) {
		return productImageRepository.findById(id);
	}

	@Override
	public ProductImage saveProductImage(ProductImage productImage) {
		return productImageRepository.save(productImage);
	}

	@Override
	public void deleteProductImage(Long id) {
		productImageRepository.deleteById(id);
	}
	 
}
