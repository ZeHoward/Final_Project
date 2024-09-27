package tw.luna.FinalTest.model;

import java.util.List;
import java.util.Set;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="products")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "productId")
	private Integer productId;

	@OneToOne(mappedBy = "product")
	@JsonManagedReference("product_recipes")
	private Recipes recipes;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	@JsonManagedReference("product_productImage")
	private List<ProductImage> productImages;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	@JsonManagedReference("cartitems_product")
	private Set<CartItems> cartItems;

	@Column(name = "type", columnDefinition = "enum('mealkit','preparedFood')")
	private String type;
	
	@Column(name = "sku", nullable = false, length = 50)
	private String sku;
	
	@Column(name = "name", nullable = false, length = 255)
	private String name;
	
	@Column(name = "description", columnDefinition = "TEXT")
	private String description;
	
	@Column(name = "price", nullable = false)
	private Integer price;
	
	@ManyToOne
	@JoinColumn(name = "categoryId", referencedColumnName = "categoryId" ,nullable = false)
    @JsonBackReference
	private Category category;
	
	@Column(name = "stockQuantity", nullable = false)
	private Integer stockQuantity;
	
	@Column(name = "isDel", columnDefinition = "TINYINT(1) DEFAULT 0")
	private Boolean isDel;

	// 新增一對多關係，商品可以有多張圖片
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	private List<ProductImage> images;

	public List<ProductImage> getImages() {
		return images;
	}

	public void setImages(List<ProductImage> images) {
		this.images = images;
	}

	public Product() {
	}

	public Product(Integer productId, Recipes recipes, List<ProductImage> productImages, Set<CartItems> cartItems, String type, String sku, String name, String description, Integer price, Category category, Integer stockQuantity, Boolean isDel) {
		this.productId = productId;
		this.recipes = recipes;
		this.productImages = productImages;
		this.cartItems = cartItems;
		this.type = type;
		this.sku = sku;
		this.name = name;
		this.description = description;
		this.price = price;
		this.category = category;
		this.stockQuantity = stockQuantity;
		this.isDel = isDel;
	}

	public Recipes getRecipes() {
		return recipes;
	}

	public void setRecipes(Recipes recipes) {
		this.recipes = recipes;
	}

	public List<ProductImage> getProductImages() {
		return productImages;
	}

	public void setProductImages(List<ProductImage> productImages) {
		this.productImages = productImages;
	}

	public Set<CartItems> getCartItems() {
		return cartItems;
	}

	public void setCartItems(Set<CartItems> cartItems) {
		this.cartItems = cartItems;
	}

	public Integer getProductId() {
		return productId;
	}


	public void setProductId(Integer productId) {
		this.productId = productId;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getSku() {
		return sku;
	}


	public void setSku(String sku) {
		this.sku = sku;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Integer getPrice() {
		return price;
	}


	public void setPrice(Integer price) {
		this.price = price;
	}

	public Category getCategory() {
		return category;
	}


	public void setCategory(Category category) {
		this.category = category;
	}


	public Integer getStockQuantity() {
		return stockQuantity;
	}


	public void setStockQuantity(Integer stockQuantity) {
		this.stockQuantity = stockQuantity;
	}

	public Boolean getIsDel() {
		return isDel;
	}


	public void setIsDel(Boolean isDel) {
		this.isDel = isDel;
	}
	
	
}
