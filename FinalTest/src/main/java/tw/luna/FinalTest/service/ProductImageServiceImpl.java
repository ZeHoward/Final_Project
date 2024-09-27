package tw.luna.FinalTest.service;

import java.util.Base64;
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
    public List<ProductImage> getImagesByProductId(Integer productId) {
        List<ProductImage> images = productImageRepository.findByProductProductId(productId);
        
        // 將每張圖片轉換成 Base64 編碼
        for (ProductImage image : images) {
            String base64Image = Base64.getEncoder().encodeToString(image.getImage());
            image.setBase64Image(base64Image);
        }
        
        return images;
    }
	
	@Override
	public void deleteProductImage(Long id) {
		productImageRepository.deleteById(id);
	}
	 
}