package tw.luna.FinalTest.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrdersDTO {
    private Integer orderId;
    private LocalDateTime orderDate;
    private String address;
    private Integer totalAmount;
    private String couponCode;
    private Integer percentageDiscount;
    private Integer amountDiscount;
    private Integer finalAmount;
    private String status;
    private List<OrderDetailsDTO> orderDetails;

    // 構造函數
    public OrdersDTO(Integer orderId, LocalDateTime orderDate, String address, Integer totalAmount, String couponCode, Integer percentageDiscount, Integer amountDiscount, Integer finalAmount, String status, List orderDetails) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.address = address;
        this.totalAmount = totalAmount;
        this.couponCode = couponCode;  // 接收 `couponCode`
        this.percentageDiscount = percentageDiscount;
        this.amountDiscount = amountDiscount;
        this.finalAmount = finalAmount;
        this.status = status;
        this.orderDetails = orderDetails;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public List<OrderDetailsDTO> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetailsDTO> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

	public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
