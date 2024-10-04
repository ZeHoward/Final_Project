package tw.luna.FinalTest.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
import org.springframework.http.MediaType;

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
    public List<ProductImage> getAllProductImages() {
        return productImageService.findAllImages();
    }

    // 根據照片 id 查詢照片
    @GetMapping("/{id}")
    public ProductImage getProductImageById(@PathVariable Long id) {
        return productImageService.findProductImageById(id).orElse(null);
    }

    // 上傳照片
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
                                         @RequestParam("productId") Integer productId) throws IOException {
        Product product = productService.findProductById(productId).orElse(null);
        if (product == null) {
            return ResponseEntity.badRequest().body("查無此商品id");
        }

        // 上傳圖片到 S3 並獲取圖片 URL
        String imageUrl = productImageService.uploadImageToS3(file.getBytes(), file.getOriginalFilename());

        ProductImage productImage = new ProductImage();
        productImage.setImage(imageUrl); // 存儲 S3 的 URL
        productImage.setProduct(product);

        productImage = productImageService.saveProductImage(productImage);

        Map<String, Object> response = new HashMap<>();
        response.put("imageId", productImage.getId());
        response.put("productName", product.getName());
        response.put("productId", product.getProductId());
        response.put("imageUrl", productImage.getImage()); // 返回圖片的 S3 URL

        return ResponseEntity.ok(response);
    }

    // 根據商品 id 查詢圖片
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<String>> getProductImagesByProductId(@PathVariable Integer productId) {
        List<ProductImage> productImages = productImageService.getImagesByProductId(productId);
        if (productImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // 返回 S3 URL 列表
        List<String> imageUrls = productImages.stream()
            .map(ProductImage::getImage) // 這裡 image 字段存儲的是 URL
            .collect(Collectors.toList());

        return ResponseEntity.ok(imageUrls);
    }

 // 刪除照片
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductImage(@PathVariable Long id) {
        Optional<ProductImage> productImageOptional = productImageService.findProductImageById(id);
        if (productImageOptional.isPresent()) {
            ProductImage productImage = productImageOptional.get();
            
            // 刪除 S3 上的文件
            productImageService.deleteImageFromS3(productImage.getImage());
            
            // 刪除資料庫中的記錄
            productImageService.deleteProductImage(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
