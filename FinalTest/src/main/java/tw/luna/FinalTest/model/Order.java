package tw.luna.FinalTest.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "orderId")
	private Integer orderId;

	@Column(name = "userId")
	private Integer userId;

	@Column(name = "cartId")
	private Integer cartId;

	@Column(name = "couponId")
	private Integer couponId;

//	@Column(name = "orderDate")
//	private LocalDateTime orderDate;

	@Column(name = "totalAmount")
	private Integer totalAmount;

	@Column(name = "percentageDiscount")
	private Integer percentageDiscount;

	@Column(name = "amountDiscount")
	private Integer amountDiscount;

	@Column(name = "finalAmount")
	private Integer finalAmount;

	@Column(name = "status")
	private String status;

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCartId() {
		return cartId;
	}

	public void setCartId(Integer cartId) {
		this.cartId = cartId;
	}

	public Integer getCouponId() {
		return couponId;
	}

	public void setCouponId(Integer couponId) {
		this.couponId = couponId;
	}

//	public LocalDateTime getOrderDate() {
//		return orderDate;
//	}
//
//	public void setOrderDate(LocalDateTime orderDate) {
//		this.orderDate = orderDate;
//	}

	public Integer getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Integer totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Integer getPercentageDiscount() {
		return percentageDiscount;
	}

	public void setPercentageDiscount(Integer percentageDiscount) {
		this.percentageDiscount = percentageDiscount;
	}

	public Integer getAmountDiscount() {
		return amountDiscount;
	}

	public void setAmountDiscount(Integer amountDiscount) {
		this.amountDiscount = amountDiscount;
	}

	public Integer getFinalAmount() {
		return finalAmount;
	}

	public void setFinalAmount(Integer finalAmount) {
		this.finalAmount = finalAmount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
