package tw.luna.FinalTest.model;


import java.io.Serializable;
import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "productimages")
public class ProductImage implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "productId", nullable = false)
	@JsonBackReference("product_productImage") 
    private Product product;
	
	@Column(name = "image")
    private String image; // 存放圖片在 S3 的 URL

	
	@Transient
	private String base64Image;
	
	//建構式
	public ProductImage() {
		
	}
	
	public ProductImage(String image, Product product) {
        this.image = image;
        this.product = product;
    }
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	public String getBase64Image() {
		return base64Image;
	}

	public void setBase64Image(String base64Image) {
		this.base64Image = base64Image;
	}

	@Override
	public String toString() {
	    return "ProductImage{" +
	            "id=" + id +
	            ", product=" + product +
	            ", image='" + image + '\'' + // 顯示 S3 的 URL
	            '}';
	}
	
}
