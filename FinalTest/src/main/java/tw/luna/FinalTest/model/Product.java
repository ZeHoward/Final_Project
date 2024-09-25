package tw.luna.FinalTest.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="products")
@EntityListeners(AuditingEntityListener.class)  // 啟用實體的審計功能，以自動賦值或更新時間
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "productId")
	private Integer productId;
	
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
