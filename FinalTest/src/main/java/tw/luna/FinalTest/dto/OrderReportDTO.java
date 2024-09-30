package tw.luna.FinalTest.dto;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public class OrderReportDTO {
	private int orderId;
	private String username;
	private String couponCode;
	private String orderDate;
	private int totalAmount;
	private int percentageDiscount;
	private int amountDiscount;
	private int finalAmount;
	private String status;
	private String address;
	private List<OrderDetailReportDTO> orderDetails;

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public int getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(int totalAmount) {
		this.totalAmount = totalAmount;
	}

	public int getPercentageDiscount() {
		return percentageDiscount;
	}

	public void setPercentageDiscount(int percentageDiscount) {
		this.percentageDiscount = percentageDiscount;
	}

	public int getAmountDiscount() {
		return amountDiscount;
	}

	public void setAmountDiscount(int amountDiscount) {
		this.amountDiscount = amountDiscount;
	}

	public int getFinalAmount() {
		return finalAmount;
	}

	public void setFinalAmount(int finalAmount) {
		this.finalAmount = finalAmount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<OrderDetailReportDTO> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetailReportDTO> orderDetails) {
		this.orderDetails = orderDetails;
	}

}
