package tw.luna.FinalTest.dto;

import java.time.LocalDateTime;

public class OrderWithUserDTO {
    private Integer orderId;
    private LocalDateTime orderDate;
    private Integer totalAmount;
    private Integer percentageDiscount;
    private Integer amountDiscount;
    private Integer finalAmount;
    private String status;
    private String username;
    private String email;
    private String phoneNumber;

    public OrderWithUserDTO() {
    	
    }      

	public String getPhoneNumber() {
		return phoneNumber;
	}


	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public Integer getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Integer totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Integer getPercentageDiscount() {
		return percentageDiscount;
	}

	public void setPercentageDiscount(Integer integer) {
		this.percentageDiscount = integer;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
    
}
