package tw.luna.FinalTest.dto;

public class ProductImageDTO {
	private Long id;
	private Integer productId;
	private String image;

	public ProductImageDTO() {
	}

	public ProductImageDTO(Long id, Integer productId, String image) {
		this.id = id;
		this.productId = productId;
		this.image = image;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "ProductImageDTO{" + "id=" + id + ", productId=" + productId + ", image='" + image + '\'' + '}';
	}
}
