package tw.luna.FinalTest.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.ProductImage;
import tw.luna.FinalTest.service.ProductImageService;
import tw.luna.FinalTest.service.ProductService;

@RestController
@RequestMapping("/productImages")
public class ProductImagesController {
	@Autowired
	private ProductImageService productImageService;

	@Autowired
	private ProductService productService;

	// 查詢所有產品照片
	@GetMapping
	public List<ProductImage> getallProductImages() {
		return productImageService.findAllImages();
	}

	// 根據id查詢照片
	@GetMapping("/{id}")
	public ProductImage getProductImageById(@PathVariable Long id) {
		return productImageService.findProductImageById(id).orElse(null);
	}

	// 根據產品id查詢照片
	@GetMapping("/product/{productId}")
	public Optional<ProductImage> searchProductImagesByProductId(@PathVariable Long id) {
		return productImageService.findProductImageById(id);
	}

	// 上傳照片
	@PostMapping("/upload")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
			@RequestParam("productId") Integer productId) throws IOException {

		Product product = productService.findProductById(productId).orElse(null);
		if (product == null) {
			return ResponseEntity.badRequest().body("無此產品ID");
		}

		// 創建ProductImage物件並設置照片數據
		ProductImage productImage = new ProductImage();
		productImage.setImage(file.getBytes());
		productImage.setProduct(product);

		productImage = productImageService.saveProductImage(productImage);

		return ResponseEntity.ok(productImage);
	}

	// 刪除照片
	@DeleteMapping("/{id}")
	public void deleteProductImage(@PathVariable Long id) {
		productImageService.deleteProductImage(id);
	}
}
