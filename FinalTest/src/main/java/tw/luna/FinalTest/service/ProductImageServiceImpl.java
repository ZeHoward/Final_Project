package tw.luna.FinalTest.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.s3.model.S3Exception;
import tw.luna.FinalTest.model.ProductImage;
import tw.luna.FinalTest.repository.ProductImageRepository;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private AWSS3Service s3Service;

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

        // 返回圖片時，不需要轉換成 Base64，直接返回 S3 的 URL
        return images;
    }

    @Override
    public void deleteProductImage(Long id) {
        productImageRepository.deleteById(id);
    }

    @Override
    public String uploadImageToS3(byte[] imageBytes, String originalFileName) throws IOException {
        try {
            // 使用 S3 服務上傳圖片，並返回圖片的 S3 URL
            return s3Service.uploadFile(imageBytes, originalFileName);
        } catch (S3Exception e) {
            throw new IOException("Error uploading file to S3: " + e.awsErrorDetails().errorMessage(), e);
        }
    }

	@Override
	public void deleteImageFromS3(String imageUrl) {
	    s3Service.deleteFile(imageUrl);
	}
}