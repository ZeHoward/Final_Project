package tw.luna.FinalTest.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw.luna.FinalTest.dto.ProductCreateDTO;
import tw.luna.FinalTest.dto.ProductUpdateDTO;
import tw.luna.FinalTest.model.Product;
import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.service.ProductService;

import java.util.List;


@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@Autowired
	private HttpSession session;
	
	
	//查詢所有商品
	@GetMapping
	public List<Product> getAllProducts() {
		System.out.println("789789789798");
		if(session != null) {
			UserAllInfo loggedInUser = (UserAllInfo)session.getAttribute("loggedInUser");
			if(loggedInUser != null) {
				System.out.println("在products中獲取UserID:" + loggedInUser.getUserId());
			}
		}
		return productService.findAllProducts();
	}
	
	//根據id查詢產品
	@GetMapping("/{id}")
	public Product getProductById(@PathVariable Integer id) {
		return productService.findProductById(id).orElse(null);
	}

	//根據id查詢產品
//	@GetMapping("/{id}")
//	public Product getProductById(@PathVariable Integer id) {
//		Users loggedInUser = (Users)session.getAttribute("loggedInUser");
//		System.out.println(loggedInUser);
//		Integer userId = loggedInUser.getUserId().intValue();
//
//		return productService.findProductById(userId).orElse(null);
//	}
//
	//模糊查詢

	@GetMapping("/search")
	public List<Product> searchProductsByName(@RequestParam String keyword){
		return productService.findProductsByName(keyword);
	}
	
	//根據類型查詢商品
	@GetMapping("/type/{type}")
	public List<Product> searchProductsByType(@PathVariable("type") String type){
		return productService.finProductsByType(type);
	}

	//根據類別查詢產品
	@GetMapping("/category/{categoryId}")
	public List<Product> searchProductsByCategoryId(@PathVariable("categoryId") Integer CategoryId){
		return productService.findProductsByCategory(CategoryId);
	} 
	
	//
	@GetMapping("/filter")
	public List<Product>searchProductsByTypeAndCategoryId(@RequestParam("type") String type,
			@RequestParam("categoryId")Integer categoryId){
		return productService.findProductsByTypeAndCategory(type, categoryId);
	}

    // 使用構造方法注入 ProductService
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

	//新增產品
	@PostMapping
	public ResponseEntity<?> createProduct(@RequestBody ProductCreateDTO productDTO) {
		try {
			Product createdProduct = productService.createProduct(productDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
		} catch (Exception e) {
			e.printStackTrace(); // 為了調試，記錄完整的錯誤堆棧
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error creating product: " + e.getMessage());
		}
	}

	//修改產品
	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> updateProduct(@PathVariable Integer id, @RequestBody ProductUpdateDTO productDTO) {
		try {
			Product updatedProduct = productService.updateProduct(id, productDTO);
			return ResponseEntity.ok(updatedProduct);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error updating product: " + e.getMessage());
		}
	}
	
	//刪除產品	
	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable Integer id) {
		productService.deleteProduct(id);
	}
	
	//批次新增產品
	@PostMapping("/batch")
	public List<Product> createProductsInBatch(@RequestBody List<Product> products){
		return productService.saveProductsInBatch(products);
	};
	
	
}
