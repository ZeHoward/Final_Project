package tw.luna.FinalTest.model;

import java.io.Serializable;
import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "productimages")
public class ProductImage implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "productId", nullable = false)
    private Product product;
	
	@Lob
	@Column(name = "image", columnDefinition="LONGBLOB")
	private byte[] image;// 用來存放圖片的二進制數據

	//建構式
	public ProductImage() {
		
	}
	
	public ProductImage(byte[] image, Product product) {
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

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
	
	@Override
    public String toString() {
        return "ProductImage{" +
                "id=" + id +
                ", product=" + product +
                ", image=" + Arrays.toString(image) +
                '}';
	}
	

}
